import { useState } from "react";
import { Digimon, DigimonName, Level } from "../models/Digimon";
import { digimonList, getDigimon, getSpecialDigimonInfo } from "../models/DigimonList";
import { Table, Alert, Button, Form }  from 'react-bootstrap';
import styled from "styled-components";

const StyledTable = styled(Table)`
    max-width: 50%;
`;
// TODO: Allow user to input a list that they've already digivolved

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
`;

const bonusDigimonEnabled = true; // TODO: make this togglable

export default function DigiSlotMachine() {
    const [rolledDigimon, setRolledDigimon] = useState<Digimon>();
    const [currentDigimon, setCurrentDigimon] = useState<Digimon>(getDigimon(DigimonName.Agumon)!);
    const [bonusText, setBonusText] = useState<Array<string>>([]);
    const [showBonusDigimonText, setShowBonusDigimonText] = useState(false);
    const [showSpoilers, setShowSpoilers] = useState(false);

    function rollDigimon(currentDigimon: Digimon) {
        // Clear the bonus text
        setBonusText([]);
        setShowBonusDigimonText(false);

        // Digimon are potentials if they have NO digimonBonus
        // OR their digimonBonus matches the currentRookie
        const potentialEvolutions = digimonList
            .filter(dn => currentDigimon.evolutionPath.includes(dn.name));

        // Get a random digimon from the list of valid evolutions
        const randomDigi = potentialEvolutions[Math.floor(Math.random()*potentialEvolutions.length)];
        
        let bonusTxt = [];
        // If the rolled digimon has special bonus conditions, let the user know
        if (randomDigi.digimonBonus === currentDigimon.name) {
            bonusTxt.push();
            setShowBonusDigimonText(true);
        }
        
        // If the rolled digimon is a "special" digimon, let them know how to evolve into it
        const specialDigiInfo = getSpecialDigimonInfo(randomDigi.name);
        if (specialDigiInfo) {
            bonusTxt.push(`This is a special digimon. ${specialDigiInfo}`);
        }

        // Set the information for the FE
        setBonusText(bonusTxt);
        setRolledDigimon(randomDigi);

        console.log(`The rolled digimon was ${randomDigi.name}`);
    }

    // TODO: Sort the rows and push empty values to the bottom
    return <>
        <p>Your current Digimon: </p>
        <StyledSelect name="evolutions" value={currentDigimon.name} onChange={(e: any) => setCurrentDigimon(getDigimon(e.target.value as unknown as DigimonName))}>
            {digimonList.map(digi => (
                <option key={digi.name} value={digi.name}>{Level[digi.level]} - {digi.name}</option>
            ))}
        </StyledSelect>
        <StyledButton variant="primary" onClick={() => rollDigimon(currentDigimon)}>Roll!</StyledButton> 
        {bonusDigimonEnabled && showBonusDigimonText && (
            <Alert variant="info">
                <p>Since you're trying to evolve a {currentDigimon.name}, your digimon gets a free bonus point towards this secret digivolution!</p>
            </Alert>
        )}
        {rolledDigimon ? (<StyledTable striped bordered hover>
            <tbody>
                {showSpoilers && <tr><th>Name</th><td>{rolledDigimon?.name}</td></tr>}
                <tr><th style={{ width: '30%' }}>Level</th><td style={{ width: '70%' }}>{Level[rolledDigimon?.level!] || '-'}</td></tr>
                <tr><th>HP</th><td>{rolledDigimon?.evolutionRequirements.hp || '-'}</td></tr>
                <tr><th>MP</th><td>{rolledDigimon?.evolutionRequirements.mp || '-'}</td></tr>
                <tr><th>OFFENSE</th><td>{rolledDigimon?.evolutionRequirements.offense || '-'}</td></tr>
                <tr><th>DEFENSE</th><td>{rolledDigimon?.evolutionRequirements.defense || '-'}</td></tr>
                <tr><th>SPEED</th><td>{rolledDigimon?.evolutionRequirements.speed || '-'}</td></tr>
                <tr><th>BRAINS</th><td>{rolledDigimon?.evolutionRequirements.brains || '-'}</td></tr>
                <tr><th>REQ. CARE MISTAKES</th><td>{rolledDigimon?.evolutionRequirements.care || '-'}</td></tr>
                <tr><th>WEIGHT</th><td>{rolledDigimon?.evolutionRequirements.weight || '-'}</td></tr>
                <tr><th>DISCIPLINE*</th><td>{rolledDigimon?.evolutionRequirements.discipline || '-'}</td></tr>
                <tr><th>HAPPINESS*</th><td>{rolledDigimon?.evolutionRequirements.happiness || '-'}</td></tr>
                <tr><th>BATTLES*</th><td>{rolledDigimon?.evolutionRequirements.battles || '-'}</td></tr>
                <tr><th>TECHS*</th><td>{rolledDigimon?.evolutionRequirements.techs || '-'}</td></tr>
                <tr><th>MINIMUM CARE MISTAKES(?)</th><td>{(rolledDigimon?.evolutionRequirements.minCare && 'Y') || "N"}</td></tr>
                <tr><th>MINIMUM BATTLES</th><td>{(rolledDigimon?.evolutionRequirements.minBattles && 'Y') || "N"}</td></tr>
                <tr><th>DIGIMON BONUS</th><td>{rolledDigimon?.digimonBonus || "N/A"}</td></tr>
            </tbody>
        </StyledTable>) : <p className={'text-info'}>Click the Roll button above to receive a random digimon's evolution targets</p>}
        {bonusText.length > 0 && <><p>Here's the targets for your secret evolution!:</p><Alert variant="info">{bonusText}</Alert></>}
        <FormCheck 
            type="switch"
            id="spoilers-switch"
            label="Show full digimon details (spoilers!)"
            value={showSpoilers}
            onClick={() => setShowSpoilers(prev => !prev)}
        />
        <ul>
            <li>Digimon need a total of 3 evo points met in order to digivolve (?)</li>
            <li>*Bonus conditions can substitute one of three main required conditions (Care Mistake, Weight, Stats) to Digivolve.</li>
            <li>Requirements (HP, MP, OFF, DEF, SPEED, BRAINS) are worth 1 point.</li>
            <li>Care mistakes are worth 1 point.</li>
            <li>Weight is worth 1 point.</li>
            <li>Fulfilling any *bonus* condition is worth 1 point, but fulfilling multiple bonuses is still only worth 1 point, but only one bonus condition will count towards your digimon's evolution requirements (meeting two bonus criteria will still only mean 1 point).</li>
        </ul>
        <a href="https://pastebin.com/uWKMF3ck">More here...</a>
    </>;
}
