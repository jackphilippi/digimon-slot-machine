import { useState } from "react";
import { Digimon, DigimonName, Level } from "../models/Digimon";
import { digimonList, getDigimon, getSpecialDigimonInfo } from "../models/DigimonList";
import Table from 'react-bootstrap/Table';
import styled from "styled-components";

const StyledTable = styled(Table)`
    max-width: 50%;
`;
// TODO: Allow user to input a list that they've already digivolved

export default function DigiSlotMachine() {
    const [rolledDigimon, setRolledDigimon] = useState<Digimon>();
    const [currentDigimon, setCurrentDigimon] = useState<Digimon>(getDigimon(DigimonName.Agumon)!);
    const [bonusText, setBonusText] = useState<Array<string>>([]);

    function rollDigimon(currentDigimon: Digimon) {
        // Clear the bonus text
        setBonusText([]);

        // Digimon are potentials if they have NO digimonBonus
        // OR their digimonBonus matches the currentRookie
        const potentialEvolutions = digimonList
            .filter(dn => currentDigimon.evolutionPath.includes(dn.name));

        // Get a random digimon from the list of valid evolutions
        const randomDigi = potentialEvolutions[Math.floor(Math.random()*potentialEvolutions.length)];
        
        let bonusTxt = [];
        // If the rolled digimon has special bonus conditions, let the user know
        if (randomDigi.digimonBonus === currentDigimon.name) {
            bonusTxt.push("There's a cheeky way to get this digivolution. Meet the bonus stat requirements. Check the stats.");
        }
        
        // If the rolled digimon is a "special" digimon, let them know how to evolve into it
        const specialDigiInfo = getSpecialDigimonInfo(randomDigi.name);
        if (specialDigiInfo) {
            bonusTxt.push(`This is a special digimon. ${specialDigiInfo}`);
        }

        // Set the information for the FE
        setBonusText(bonusTxt);
        setRolledDigimon(randomDigi);
    }

    return <>
        <p>Your current Digimon: </p>
        <select name="evolutions" value={currentDigimon.name} onChange={e => setCurrentDigimon(getDigimon(e.target.value as unknown as DigimonName))}>
            {digimonList.map(digi => (
                <option key={digi.name} value={digi.name}>{Level[digi.level]} - {digi.name}</option>
            ))}
        </select>
        <button onClick={() => rollDigimon(currentDigimon)}>Roll!</button>
        <p>Here's the targets for your secret evolution!:</p>
        <p>{bonusText}</p>
        <StyledTable striped bordered hover>
            <tbody>
                <tr><th style={{ width: '30%' }}>Name</th><td style={{ width: '70%' }}>{rolledDigimon?.name || '-'}</td></tr>
                <tr><th>Level</th><td>{Level[rolledDigimon?.level!] || '-'}</td></tr>
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
                <tr><th>BONUS DIGIMON</th><td>{rolledDigimon?.digimonBonus || "N/A"}</td></tr>
            </tbody>
        </StyledTable>
        <p>Note: Bonus condition can substitute one of three main required conditions (Care Mistake, Weight, Parameters) to Digivolve. requirements (HP MP OFF DEF SPEED BRAINS) is worth 1 point. CARE ERR is worth 1 point. WEIGHT is worth 1 point. Fulfilling any *bonus* condition is worth 1 point, but fulfilling multiple bonuses is still only worth 1 point, so just worry about filling any one bonus condition.</p>
        <a href="https://pastebin.com/uWKMF3ck">More here...</a>
    </>;
}
