import { useState } from "react";
import { Digimon, DigimonName, Level } from "../models/Digimon";
import { digimonList, getDigimon, getSpecialDigimonInfo } from "../models/DigimonList";
import { Alert }  from 'react-bootstrap';
import { FormCheck, StyledButton, StyledIcon, StyledInput, StyledPane, StyledPanes, StyledSelect, StyledSettingsButton } from './DigiSlotMachine.styled';
import RequirementsTable from "./RequirementsTable";
import InfoCard from "./InfoCard";

export interface Options {
    showSpecialDigimon: boolean;
    showOmitTags: boolean;
    showInfoText: boolean;
    hideIrrelevant: boolean;
    showSpoilers: boolean;
}

export interface Labels {
    care: string;
    battle: string;
}

export default function DigiSlotMachine() {
    const [currentDigimon, setCurrentDigimon] = useState<Digimon>(getDigimon(DigimonName.Agumon)!);
    const [rolledDigimon, setRolledDigimon] = useState<Digimon>();

    // TODO: Rename. These are the errors that show up after omitting digimon incorrectly
    const [omitErrors, setOmitErrors] = useState<Array<string>>([]);
    const [omittedDigimon, setOmittedDigimon] = useState<Array<DigimonName>>([]);

    const [bonusText, setBonusText] = useState<string>('');
    const [showNaturalBonusText, setShowNaturalBonusText] = useState(false);
    const [showSettings, setShowSettings] = useState(true);
    const [errorText, setErrorText] = useState<string>('');

    const [options, setOptions] = useState<Options>({
        showSpecialDigimon: false,
        showOmitTags: false,
        showInfoText: true,
        hideIrrelevant: true,
        showSpoilers: false
    });
    
    const [labels, setLabels] = useState<Labels>({
        care: '',
        battle: '',
    });

    function setDefaults() {
        setBonusText('');
        setErrorText('');
        setShowNaturalBonusText(false);
    }

    function toggleOption(optionFlag: keyof Options) {
        setOptions(prevOptions => ({
            ...prevOptions,
            [optionFlag]: !prevOptions[optionFlag]
        }))
    }

    function rollDigimon(currentDigimon: Digimon) {
        // Clear all transient labels
        setDefaults();

        // Filter out only the allowed evolustions
        // Also, ignore special evos (numemon, sukamon) if it's toggled off
        const potentialEvolutions = digimonList
            .filter(dn => {
                // Return false if specials are disabled and it's a special digi
                if (!options.showSpecialDigimon && getSpecialDigimonInfo(dn.name)) {
                    return false;
                }
                // Return false if digimon is specifically omitted
                if (omittedDigimon.includes(dn.name)) {
                    return false;
                }
                // Otherwise return true if it's a valid evolution
                return currentDigimon.evolutionPath.includes(dn.name);
            });

        // Get a random digimon from the list of valid evolutions
        const randomDigi = potentialEvolutions[Math.floor(Math.random()*potentialEvolutions.length)];
        if (!randomDigi) { 
            return setErrorText('There are no possible evolutions for that digimon! You may need to refine your settings.');
        }
        setRolledDigimon(randomDigi);
        
        // If the rolled digimon has special bonus conditions, let the user know
        if (randomDigi.digimonBonus === currentDigimon.name) {
            setShowNaturalBonusText(true);
        }
        
        // If the rolled digimon is a "special" digimon, let them know how to evolve into it
        const specialDigiInfo = getSpecialDigimonInfo(randomDigi.name);
        if (specialDigiInfo) {
            setBonusText(`This is a special digimon. ${specialDigiInfo}`);
        }

        // TODO: Re-visit labels for battles and care
        if (randomDigi.req.battles > 0) {
            setLabels(prevLabels => ({ ...prevLabels, battle: randomDigi.req.minBattles ? '≤' : '≥' }));
        }

        if (randomDigi.req.care > 0) {
            setLabels(prevLabels => ({ ...prevLabels, care: randomDigi.req.minCare ? '≤' : '≥' }));
        }

        const tableElem = document.getElementById('table-heading');
        tableElem?.scrollIntoView();
    }

    function handleOmit(value: string) {
        const values = value.split(',');
        const badValues = [];
        const goodValues = [];

        for (const digi of values) {
            const trimmed = digi.trim() as DigimonName;
            if (!trimmed) continue;
            if (!Object.values(DigimonName).includes(trimmed)) {
                badValues.push(trimmed);
            } else {
                goodValues.push(trimmed);
            }
        }
        if (badValues) {
            // There was a problem parsing the string of omissions from the user
            setOmitErrors(badValues);
        }
        // Acknowledge the good ones regardless
        localStorage.setItem('omittedDigimon', JSON.stringify(goodValues));
        setOmittedDigimon(goodValues);
    }

    // TODO: Hover over stats for details
    return <StyledPanes>
        <StyledPane>
            <h2>Your current Digimon: {currentDigimon && <StyledIcon src={`./imgs/${currentDigimon.name}.png`}/>}</h2>
            <StyledSelect name="evolutions" value={currentDigimon.name} onChange={(e: any) => setCurrentDigimon(getDigimon(e.target.value as unknown as DigimonName))}>
                {digimonList.map(d => <option key={d.name} value={d.name}>{Level[d.level]} - {d.name}</option>)}
            </StyledSelect>
            <StyledButton variant="primary" onClick={() => rollDigimon(currentDigimon)}>Roll!</StyledButton> 
            {errorText && <p className='text-danger'>{errorText}</p>}
            {bonusText.length > 0 && <Alert variant="info">{bonusText}</Alert>}
            {showNaturalBonusText && (
                <Alert variant="warning">
                    {currentDigimon.name} gets a free natural bonus point towards this digivolution!
                </Alert>
            )}
            {!showSettings && <StyledSettingsButton variant="secondary" onClick={() => setShowSettings(true)}>⚙ Show settings</StyledSettingsButton>}
            {showSettings && <Alert variant="secondary" onClose={() => setShowSettings(false)} dismissible>
                <Alert.Heading>Settings</Alert.Heading>

                <FormCheck 
                    type="switch"
                    defaultChecked={options.showSpecialDigimon}
                    id="specials-switch"
                    label="Show special digimon evolutions (eg. Numemon)"
                    value={options.showSpecialDigimon}
                    onClick={() => toggleOption('showSpecialDigimon')}
                />
                <FormCheck 
                    type="switch"
                    defaultChecked={options.showOmitTags}
                    id="omit-switch"
                    label="Exclude one or more digimon from the results"
                    value={options.showOmitTags}
                    onClick={() => toggleOption('showOmitTags')}
                />
                {options.showOmitTags && <>
                    <StyledInput
                        type="input"
                        placeholder="eg. Palmon, HKabuterimon (comma-separated)"
                        onBlur={(e: any) => handleOmit(e.target.value)} />
                    {omitErrors.length > 0 && <p className='text-danger'>Unable to exclude the following digimon. Are they spelled correctly?: {omitErrors.join(', ')}</p>}
                    {omittedDigimon.length > 0 && <p className='text-success'>Excluding the following digimon from results: {omittedDigimon.join(', ')}</p>}
                </>}
                <FormCheck 
                    type="switch"
                    defaultChecked={options.showInfoText}
                    id="help-switch"
                    label="Show info text"
                    value={options.showInfoText}
                    onClick={() => toggleOption('showInfoText')}
                />
                <FormCheck 
                    type="switch"
                    defaultChecked={options.showInfoText}
                    id="irrel-switch"
                    label="Hide stats that aren't needed for evolution"
                    value={options.hideIrrelevant}
                    onClick={() => toggleOption('hideIrrelevant')}
                />
                <hr/>
                <FormCheck 
                    type="switch"
                    defaultChecked={options.showSpoilers}
                    id="spoilers-switch"
                    label="Show target digimon name and type (spoilers!)"
                    value={options.showSpoilers}
                    onClick={() => toggleOption('showSpoilers')}
                />
            </Alert>}
            {options.showInfoText && <InfoCard />}
        </StyledPane>
        <StyledPane>
            <h2 id="table-heading">Target Digivolution Criteria</h2>
            <p>The following table shows the required attributes that your digimon needs to meet in order to digivolve into the selected digimon.</p>
            {rolledDigimon
                ? <RequirementsTable
                    rolledDigimon={rolledDigimon}
                    currentDigimon={currentDigimon}
                    labels={labels}
                    options={options} />
                : <p className={'text-info'}>Click the "Roll" button to receive a random digimon's evolution requirements</p>}
            
        </StyledPane>
    </StyledPanes>;

}
