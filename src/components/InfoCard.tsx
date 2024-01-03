import { Badge } from "react-bootstrap";
import { StyledCard } from "./DigiSlotMachine.styled";

export default function InfoCard() {
    return <StyledCard variant="secondary" body>
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
            <li>3 criteria must be met to be eligible for the evolution</li>
            <li>Some Digimon have a natural advantage to evolve into a certain Digimon by always fulfilling the bonus requirement for free</li>
        </ul>
        <p>In-depth information about evolution within Digimon World can be found <a href="https://gamefaqs.gamespot.com/ps/913684-digimon-world/faqs/73845"> here</a>, with thanks to <a href="https://twitter.com/sydmontague">SydMontague</a> for the research that made this tool possible</p>

    </StyledCard>
}