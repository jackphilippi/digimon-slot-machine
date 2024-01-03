import styled from "styled-components";
import { Button, Form, Card }  from 'react-bootstrap';

export const StyledPanes = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledPane = styled.div`
    flex: 50%;
    padding: 10px;
`;

export const StyledSelect = styled(Form.Select)`
    width: auto;
    display: inline-block;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
        width: 70%;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: -5px;
    margin-left: 10px;
`;

export const StyledSettingsButton = styled(Button)`
    display: block;
`;

export const FormCheck = styled(Form.Check)`
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
    & input {
        cursor: pointer;
    }
`;

export const StyledIcon = styled.img`
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    width: 32px;
`;

export const StyledCard = styled(Card)`
    margin-top: 30px;
`;

export const StyledInput = styled(Form.Control)`
    margin: 10px auto;
`;