import { Table } from "react-bootstrap";
import { Digimon, Level, Type } from "../models/Digimon";
import { Labels, Options } from "./DigiSlotMachine";
import { StyledIcon } from "./DigiSlotMachine.styled";

function getTypeIcon(type: Type) {
    return {
        [Type.Data]: '💾',
        [Type.Virus]: '🦠',
        [Type.Vaccine]: '💊'
    }[type];
}

interface ReqTableProps {
    currentDigimon: Digimon,
    rolledDigimon?: Digimon,
    options: Options,
    showNaturalBonusText?: boolean,
    labels: Labels
}

interface RowProps {
    class: "table-primary" | "table-secondary" | "table-info" | "table-warning" | "table-danger",
    title: string,
    value: any,
    tooltipText: string,
    label?: string
}


function StatRow(props: RowProps) {
    if (!props.value) {
        return <></>
    }
    return <tr className={props.class}>
        <th>{props.title}</th>
        <td>{props.label}{props.value}</td>
    </tr>
}

export default function RequirementsTable(props: ReqTableProps) {
    const { options, rolledDigimon, currentDigimon, labels } = props;

    if (!rolledDigimon) return <></>

    return rolledDigimon && <Table striped bordered hover>
        <tbody>
            <tr className='table-secondary'>
                <th style={{ width: '30%' }}>Name</th>
                <td style={{ width: '70%' }}>{options.showSpoilers ? <><StyledIcon src={`./imgs/${rolledDigimon.name}.png`}/> {rolledDigimon?.name}</> : '???'}</td>
            </tr>
            <tr className='table-secondary'>
                <th>Type</th>
                <td>{options.showSpoilers ? <>{getTypeIcon(rolledDigimon.type)} {Type[rolledDigimon?.type]}</> : '???'}</td>
            </tr>
            <StatRow title="Level" class='table-secondary' value={Level[rolledDigimon.level]} tooltipText="The evolutionary stage that the digimon is."/>
            <StatRow title="HP" class='table-info' value={rolledDigimon.req.hp} tooltipText="Your digimon's health. Increased by HP training at the Gym."/>
            <StatRow title="MP" class='table-info' value={rolledDigimon.req.mp} tooltipText="Your digimon's magic points. Increased by MP training at the Gym."/>
            <StatRow title="OFFENSE" class='table-info' value={rolledDigimon.req.offense} tooltipText="Improves damage from your attacks. Increased by offense training at the Gym."/>
            <StatRow title="DEFENSE" class='table-info' value={rolledDigimon.req.defense} tooltipText="Reduces damage taken from attacks. Increased by defense training at the Gym."/>
            <StatRow title="SPEED" class='table-info' value={rolledDigimon.req.speed} tooltipText="Affects how often your digimon attacks. Increased by speed training at the Gym."/>
            <StatRow title="BRAINS" class='table-info' value={rolledDigimon.req.brains} tooltipText="Unlocks more options for shouting at your digimon during battle. Increased by brain training at the Gym."/>
            <StatRow title="CARE MISTAKES" class='table-primary' label={labels.battle} value={rolledDigimon.req.care} tooltipText="Ignoring your food, poop or sleep bubbles will cause a care mistake." />
            <StatRow title="WEIGHT" class='table-danger' value={rolledDigimon.req.weight} tooltipText="Weight is gained when digimon is fed food. Weight is lost over time and when exercising."/>
            <StatRow title="DISCIPLINE" class='table-warning' value={rolledDigimon.req.discipline} tooltipText="The digimon's discipline value. The higher the better."/>
            <StatRow title="HAPPINESS" class='table-warning' value={rolledDigimon.req.happiness} tooltipText="The digimon's happiness value. The higher the better."/>
            <StatRow title="BATTLES" class='table-warning' label={labels.battle} value={rolledDigimon.req.battles} tooltipText="The total number of battles that the digimon has fought."/>
            <StatRow title="TECHNIQUES" class='table-warning' value={rolledDigimon.req.techs} tooltipText="The total number of techniques that the digimon has learned."/>
            {rolledDigimon.digimonBonus === currentDigimon.name && <tr className='table-warning'><th>DIGIMON BONUS</th><td>{rolledDigimon.digimonBonus}</td>
        </tr>}
        </tbody>
    </Table>
}