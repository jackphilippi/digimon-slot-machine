import { useState } from "react";
import { Digimon, DigimonName, Level, Type } from "../models/Digimon";
import { digimonList, getDigimon, getSpecialDigimonInfo } from "../models/DigimonList";
import { Table, Alert, Badge }  from 'react-bootstrap';
import { FormCheck, InfoCard, StyledButton, StyledIcon, StyledInput, StyledPane, StyledPanes, StyledSelect, StyledSettingsButton } from './DigiSlotMachine.styled';

export default function DigiSlotMachine() {const [currentDigimon, setCurrentDigimon] = useState<Digimon>(getDigimon(DigimonName.Agumon)!);
    const [rolledDigimon, setRolledDigimon] = useState<Digimon>();

    const [omitErrors, setOmitErrors] = useState<Array<string>>([]);
    const [omittedDigimon, setOmittedDigimon] = useState<Array<DigimonName>>([]);
    const [optShowOmitTags, setOptShowOmitTags] = useState(false);

    const [bonusText, setBonusText] = useState<string>('');
    const [optShowSpoilers, setOptShowSpoilers] = useState(false);
    const [showNaturalBonusText, setShowNaturalBonusText] = useState(false);
    const [optShowSpecialDigimon, setOptShowSpecialDigimon] = useState(false);
    const [optShowInfoText, setOptShowInfoText] = useState(true);
    
    const [showSettings, setShowSettings] = useState(true);

    const [careLabel, setCareLabel] = useState<string>('');
    const [battlesLabel, setBattlesLabel] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');

    function setDefaults() {
        setBonusText('');
        setBattlesLabel('');
        setCareLabel('');
        setErrorText('');
        setShowNaturalBonusText(false);
    }

    function getTypeIcon(type: Type) {
        return {
            [Type.Data]: '💾',
            [Type.Virus]: '🦠',
            [Type.Vaccine]: '💊'
        }[type];
    }

    function rollDigimon(currentDigimon: Digimon) {
        // Clear all transient labels
        setDefaults();

        // Filter out only the allowed evolustions
        // Also, ignore special evos (numemon, sukamon) if it's toggled off
        const potentialEvolutions = digimonList
            .filter(dn => {
                // Return false if specials are disabled and it's a special digi
                if (!optShowSpecialDigimon && getSpecialDigimonInfo(dn.name)) {
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

        if (randomDigi.req.battles > 0) {
            setBattlesLabel(randomDigi.req.minBattles ? '≤' : '≥');
        }

        if (randomDigi.req.care > 0) {
            // Set labels for the FE
            setCareLabel(randomDigi.req.minCare ? '≤' : '≥');
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

    // TODO: Sort the rows and push empty values to the bottom
    // TODO: Hover over stats for details
    return <StyledPanes>
        <StyledPane>
            {rolledDigimon ? <>
                <h2 id="table-heading">Target Digivolution Criteria</h2>
                {bonusText.length > 0 && <Alert variant="info">{bonusText}</Alert>}
                {showNaturalBonusText && (
                    <Alert variant="warning">
                        {currentDigimon.name} gets a free natural bonus point towards this digivolution!
                    </Alert>
                )}
                <p>The following table shows the required attributes that your digimon needs to meet in order to digivolve into the selected digimon.</p>
                <Table striped bordered hover>
                    <tbody>
                        <tr className='table-secondary'><th style={{ width: '30%' }}>Name</th><td style={{ width: '70%' }}>{optShowSpoilers ? <>{rolledDigimon?.name} <StyledIcon src={`./imgs/${rolledDigimon.name}.png`}/></> : '???'}</td></tr>
                        <tr className='table-secondary'><th>Type</th><td>{optShowSpoilers ? <>{Type[rolledDigimon?.type]} {getTypeIcon(rolledDigimon.type)}</> : '???'}</td></tr>
                        <tr className='table-secondary'><th>Level</th><td>{Level[rolledDigimon.level] || '-'}</td></tr>
                        <tr className='table-info'><th>HP</th><td>{rolledDigimon.req.hp || '-'}</td></tr>
                        <tr className='table-info'><th>MP</th><td>{rolledDigimon.req.mp || '-'}</td></tr>
                        <tr className='table-info'><th>OFFENSE</th><td>{rolledDigimon.req.offense || '-'}</td></tr>
                        <tr className='table-info'><th>DEFENSE</th><td>{rolledDigimon.req.defense || '-'}</td></tr>
                        <tr className='table-info'><th>SPEED</th><td>{rolledDigimon.req.speed || '-'}</td></tr>
                        <tr className='table-info'><th>BRAINS</th><td>{rolledDigimon.req.brains || '-'}</td></tr>
                        <tr className='table-primary'><th>CARE MISTAKES</th><td>{careLabel}{rolledDigimon.req.care || '-'}</td></tr>
                        <tr className='table-danger'><th>WEIGHT</th><td>{rolledDigimon.req.weight || '-'}</td></tr>
                        <tr className='table-warning'><th>DISCIPLINE</th><td>{rolledDigimon.req.discipline || '-'}</td></tr>
                        <tr className='table-warning'><th>HAPPINESS</th><td>{rolledDigimon.req.happiness || '-'}</td></tr>
                        <tr className='table-warning'><th>BATTLES</th><td>{battlesLabel}{rolledDigimon.req.battles || '-'}</td></tr>
                        <tr className='table-warning'><th>TECHS</th><td>{rolledDigimon.req.techs || '-'}</td></tr>
                        {rolledDigimon.digimonBonus === currentDigimon.name && <tr className='table-warning'><th>DIGIMON BONUS</th><td>{rolledDigimon.digimonBonus}</td></tr>}
                    </tbody>
                </Table>
            </> : <p className={'text-info'}>Click the Roll button to receive a random digimon's evolution targets</p>}
        </StyledPane>
        <StyledPane>
            <h2>Your current Digimon: {currentDigimon && <StyledIcon src={`./imgs/${currentDigimon.name}.png`}/>}</h2>
            <StyledSelect name="evolutions" value={currentDigimon.name} onChange={(e: any) => setCurrentDigimon(getDigimon(e.target.value as unknown as DigimonName))}>
                {digimonList.map(d => <option key={d.name} value={d.name}>{Level[d.level]} - {d.name}</option>)}
            </StyledSelect>
            <StyledButton variant="primary" onClick={() => rollDigimon(currentDigimon)}>Roll!</StyledButton> 
            {errorText && <p className='text-danger'>{errorText}</p>}
            {!showSettings && <StyledSettingsButton variant="secondary" onClick={() => setShowSettings(true)}>⚙ Show settings</StyledSettingsButton>}
            {showSettings && <Alert variant="secondary" onClose={() => setShowSettings(false)} dismissible>
                <Alert.Heading>Settings</Alert.Heading>

                <FormCheck 
                    type="switch"
                    defaultChecked={optShowSpecialDigimon}
                    id="specials-switch"
                    label="Show special digimon evolutions (eg. Numemon)"
                    value={optShowSpecialDigimon}
                    onClick={() => setOptShowSpecialDigimon(prev => !prev)}
                />
                <FormCheck 
                    type="switch"
                    defaultChecked={optShowOmitTags}
                    id="omit-switch"
                    label="Exclude one or more digimon from the results"
                    value={optShowOmitTags}
                    onClick={() => setOptShowOmitTags(prev => !prev)}
                />
                {optShowOmitTags && <>
                    <StyledInput
                        type="input"
                        placeholder="eg. Palmon, HKabuterimon (comma-separated)"
                        onBlur={(e: any) => handleOmit(e.target.value)} />
                    {omitErrors.length > 0 && <p className='text-danger'>Unable to exclude the following digimon. Are they spelled correctly?: {omitErrors.join(', ')}</p>}
                    {omittedDigimon.length > 0 && <p className='text-success'>Excluding the following digimon from results: {omittedDigimon.join(', ')}</p>}
                </>}
                <FormCheck 
                    type="switch"
                    defaultChecked={optShowInfoText}
                    id="help-switch"
                    label="Show info text"
                    value={optShowInfoText}
                    onClick={() => setOptShowInfoText(prev => !prev)}
                />
                <hr/>
                <FormCheck 
                    type="switch"
                    defaultChecked={optShowSpoilers}
                    id="spoilers-switch"
                    label="Show target digimon name and type (spoilers!)"
                    value={optShowSpoilers}
                    onClick={() => setOptShowSpoilers(prev => !prev)}
                />
            </Alert>}
            {optShowInfoText && <InfoCard variant="secondary" body>
                <h2>What?</h2>
                <p>This tool randomly selects a valid digimon evolution for you to digivolve your digimon into, but doesn't tell you what that digimon will be.</p>
                <h2>Why?</h2>
                <p>Digimon World 1 is an infamously challenging game which doesn't share much about its inner workings. In the case of digivolution, it can be exhausting and time-consuming getting the same awful digimon over and over again.</p>
                <p>This tool was created to help make the experience of playing the game a little bit more enjoyable, whilst retaining the fun and excitement of getting a new, unknown digimon.</p>
                <h2>How?</h2>
                <ul>
                    <li>
                        Digivolution outcomes are affected by four different criteria:
                        <ul>
                            <li><Badge bg="info">Stats</Badge></li>
                            <li><Badge bg="primary">Care Mistakes</Badge></li>
                            <li><Badge bg="danger">Weight</Badge></li>
                            <li><Badge bg="warning">Bonus Criteria</Badge></li>
                        </ul>
                    </li>
                    <li>3 must be met to be eligible for the evolution</li>
                    <li>Some Digimon have a natural advantage to evolve into a certain Digimon by always fulfilling the bonus requirement for free</li>
                </ul>
                <p>In-depth information about evolution within Digimon World can be found <a href="https://gamefaqs.gamespot.com/ps/913684-digimon-world/faqs/73845"> here</a>, with thanks to <a href="https://twitter.com/sydmontague">SydMontague</a> for the research that made this tool possible</p>
            </InfoCard>}
        </StyledPane>
        
    </StyledPanes>;
}
