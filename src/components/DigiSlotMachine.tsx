import { useState } from "react";
import { Digimon, DigimonName, Level } from "../models/Digimon";
import { digimonList, getDigimon, getSpecialDigimonInfo } from "../models/DigimonList";
import { Table, Alert, Button, Form, Card }  from 'react-bootstrap';
import styled from "styled-components";

const StyledPanes = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledPane = styled.div`
    flex: 50%;
    padding: 10px;
`;

const StyledSelect = styled(Form.Select)`
    width: auto;
    display: inline-block;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    margin-top: -5px;
    margin-left: 10px;
`;

const FormCheck = styled(Form.Check)`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 

    :last-child {
        padding: 30px;
    }
`;

const StyledIcon = styled.img`
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    width: 32px;
`;

const InfoCard = styled(Card)`
    margin-top: 30px;
`;
const StyledInput = styled(Form.Control)`
    margin-top: 10px;
`;

export default function DigiSlotMachine() {
    const [careLabel, setCareLabel] = useState('');
    const [battlesLabel, setBattlesLabel] = useState('');

    const [currentDigimon, setCurrentDigimon] = useState<Digimon>(getDigimon(DigimonName.Agumon)!);
    const [rolledDigimon, setRolledDigimon] = useState<Digimon>();

    const [omitErrors, setOmitErrors] = useState<Array<string>>([]);
    const [omittedDigimon, setOmittedDigimon] = useState<Array<DigimonName>>([]);
    const [showOmitTags, setShowOmitTags] = useState(false);

    const [showBonusDigimonText, setShowBonusDigimonText] = useState(false);
    const [bonusText, setBonusText] = useState('');
    const [showSpecialDigivolutions, setShowSpecialDigivolutions] = useState(false);
    const [showSpoilers, setShowSpoilers] = useState(false);

    function rollDigimon(currentDigimon: Digimon) {
        // Clear the bonus text
        setBonusText('');

        // Filter out only the allowed evolustions
        // Also, ignore special evos (numemon, sukamon) if it's toggled off
        const potentialEvolutions = digimonList
            .filter(dn => {
                // Return false if specials are disabled and it's a special digi
                if (!showSpecialDigivolutions && getSpecialDigimonInfo(dn.name)) {
                    return false;
                }
                // Return false if digimon is specifically omitted
                if (omittedDigimon.includes(dn.name)) {
                    return false;
                }
                // Otherwise return true only if it's a valid evolution
                return currentDigimon.evolutionPath.includes(dn.name);
            });

        // Get a random digimon from the list of valid evolutions
        const randomDigi = potentialEvolutions[Math.floor(Math.random()*potentialEvolutions.length)];
        
        // If the rolled digimon has special bonus conditions, let the user know
        if (randomDigi.digimonBonus === currentDigimon.name) {
            setShowBonusDigimonText(true);
        }
        
        // If the rolled digimon is a "special" digimon, let them know how to evolve into it
        const specialDigiInfo = getSpecialDigimonInfo(randomDigi.name);
        if (specialDigiInfo) {
            setBonusText(`This is a special digimon. ${specialDigiInfo}`);
        }

        // Set the information for the FE
        setRolledDigimon(randomDigi);

        console.log(randomDigi);
        console.log("Allowed evolutions:", potentialEvolutions)

        setBattlesLabel(randomDigi.evolutionRequirements.minBattles ? 'MIN' : 'MAX');
        setCareLabel(randomDigi.evolutionRequirements.minCare ? 'MIN' : 'MAX');
    }

    function handleOmit(value: string) {
        const values = value.split(',');
        const badValues = [];
        const goodValues = [];
        console.log('hello');

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
            setOmitErrors(badValues);
        }
        setOmittedDigimon(goodValues);
    }

    // TODO: Sort the rows and push empty values to the bottom
    // TODO: Hover over stats for details
    return <StyledPanes>
        <StyledPane>
            {showBonusDigimonText && (
                <Alert variant="info">
                    <p>Since you're trying to evolve a {currentDigimon.name}, your digimon gets a free bonus point towards this secret digivolution!</p>
                </Alert>
            )}
            {bonusText.length > 0 && <Alert variant="info">{bonusText}</Alert>}
            {rolledDigimon ? <>
                <h2>Target Digivolution Criteria</h2>
                <Table striped bordered hover>
                    <tbody>
                        <tr><th>Name</th><td>{showSpoilers ? <>{rolledDigimon?.name} <StyledIcon src={`./imgs/${rolledDigimon.name}.png`}/></> : '???'}</td></tr>
                        <tr><th style={{ width: '30%' }}>Level</th><td style={{ width: '70%' }}>{Level[rolledDigimon.level] || '-'}</td></tr>
                        <tr><th>HP</th><td>{rolledDigimon.evolutionRequirements.hp || '-'}</td></tr>
                        <tr><th>MP</th><td>{rolledDigimon.evolutionRequirements.mp || '-'}</td></tr>
                        <tr><th>OFFENSE</th><td>{rolledDigimon.evolutionRequirements.offense || '-'}</td></tr>
                        <tr><th>DEFENSE</th><td>{rolledDigimon.evolutionRequirements.defense || '-'}</td></tr>
                        <tr><th>SPEED</th><td>{rolledDigimon.evolutionRequirements.speed || '-'}</td></tr>
                        <tr><th>BRAINS</th><td>{rolledDigimon.evolutionRequirements.brains || '-'}</td></tr>
                        <tr><th>{careLabel} CARE MISTAKES</th><td>{rolledDigimon.evolutionRequirements.care || '-'}</td></tr>
                        <tr><th>WEIGHT</th><td>{rolledDigimon.evolutionRequirements.weight || '-'}</td></tr>
                        <tr><th>DISCIPLINE*</th><td>{rolledDigimon.evolutionRequirements.discipline || '-'}</td></tr>
                        <tr><th>HAPPINESS*</th><td>{rolledDigimon.evolutionRequirements.happiness || '-'}</td></tr>
                        <tr><th>{battlesLabel} BATTLES*</th><td>{rolledDigimon.evolutionRequirements.battles || '-'}</td></tr>
                        <tr><th>TECHS*</th><td>{rolledDigimon.evolutionRequirements.techs || '-'}</td></tr>
                        {rolledDigimon.digimonBonus && <tr><th>DIGIMON BONUS</th><td>{rolledDigimon.digimonBonus || "N/A"}</td></tr>}
                    </tbody>
                </Table>
            </> : <p className={'text-info'}>Click the Roll button to receive a random digimon's evolution targets</p>}
        </StyledPane>
        <StyledPane>
            <p>Your current Digimon: {currentDigimon && <StyledIcon src={`./imgs/${currentDigimon.name}.png`}/>}</p>
            <StyledSelect name="evolutions" value={currentDigimon.name} onChange={(e: any) => setCurrentDigimon(getDigimon(e.target.value as unknown as DigimonName))}>
                {digimonList.map(digi => (
                    <option key={digi.name} value={digi.name}>{Level[digi.level]} - {digi.name}</option>
                ))}
            </StyledSelect>
            <StyledButton variant="primary" onClick={() => rollDigimon(currentDigimon)}>Roll!</StyledButton> 
            <FormCheck 
                type="switch"
                id="specials-switch"
                label="Show special digimon evolutions"
                value={showSpecialDigivolutions}
                onClick={() => setShowSpecialDigivolutions(prev => !prev)}
            />
            <FormCheck 
                type="switch"
                id="spoilers-switch"
                label="Show target digimon name details (spoilers!)"
                value={showSpoilers}
                onClick={() => setShowSpoilers(prev => !prev)}
            />
            <FormCheck 
                type="switch"
                id="omit-switch"
                label="Ignore one or more digimon from the results"
                value={showSpoilers}
                onClick={() => setShowOmitTags(prev => !prev)}
            />
            {showOmitTags && <>
                <StyledInput
                    type="input"
                    placeholder="e.g. Greymon, HKabuterimon, Agumon"
                    onBlur={(e: any) => handleOmit(e.target.value)} />
                {omitErrors.length > 0 && <p className='text-danger'>Unable to ignore the following digimon. Are they spelled correctly?: {omitErrors.join(', ')}</p>}
                {omittedDigimon.length > 0 && <p className='text-success'>Omitting the following digimon from results: {omittedDigimon.join(', ')}</p>}
            </>}
            <InfoCard body>
                <h2>Why?</h2>
                <p>I wanted to play through Digimon World 1, but it's an infamously challenging game which doesn't hold your hand. In a lot of ways, this is what makes the game so special, but in the case of digivolution, it can be exhausting and time-consuming getting the same awful digimon.</p>
                <h2>Digivolution Criteria</h2>
                <ul>
                    <li>Digivolution outcomes are affected by four different criteria: Stats, Weight, Care Mistakes, and Bonus Criteria.</li>
                    <ul><li>Bonus conditions can substitute one of three other criteria to Digivolve.</li></ul>
                    <li>Stats, Care Mistakes, and Weight are worth 1 point.</li>
                    <li>Bonus criteria are worth one point, but only the first bonus criteria counts.</li>
                </ul>
                <p>In-depth information about evolution <a href="https://gamefaqs.gamespot.com/ps/913684-digimon-world/faqs/73845"> here</a>! Huge credit to <a href="https://twitter.com/sydmontague">SydMontague</a></p>
            </InfoCard>
        </StyledPane>
        
    </StyledPanes>;
}
