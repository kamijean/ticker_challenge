import React from "react";
import styled from "styled-components";
import {
  ButtonColorLookup,
  buttonColorMap,
  lightenColor,
} from "../../helpers/colorHelper";

type ButtonProps = {
  label: string;
  onClick: () => void;
  buttonColor?: ButtonColorLookup;
};

const StyledButton = styled.button<{ buttonColor?: ButtonColorLookup }>`
  background-color: ${(props) => props.buttonColor || buttonColorMap.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      lightenColor({
        color:
          props.buttonColor || (buttonColorMap.primary as ButtonColorLookup),
      })};
  }
`;

const Button = ({ label, onClick, buttonColor }: ButtonProps) => {
  return (
    <StyledButton buttonColor={buttonColor} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;
