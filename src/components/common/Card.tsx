import React, { ReactNode } from "react";

import styled from "styled-components";

const CardStyled = styled.div`
  background-color: black;
  border-radius: 4px;
  padding: 10px 20px 20px 20px;
  min-width: 400px;
  height: fit-content;
`;

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <CardStyled>{children}</CardStyled>;
};

export default Card;
