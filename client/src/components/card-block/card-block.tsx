import { useState } from 'react'

import styled from "styled-components";
import { Link } from 'react-router-dom';
import { GridCardType } from "../../types/types"
import { CardContainer } from "../card-container/card-container";
import { GridCard } from "../grid-card/grid-card";
import { LongButton } from '../common/common-style';

const CountElement = {
  min: 3,
  max: 9,
}

const CardBlockSection = styled.section`
  width: 100%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.525);
  padding: 1rem 0;
`;

const Header = styled.h2`
  text-align: center;
`;

const LinkToAll = styled(Link)`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  background-color: goldenrod;
  color: rgb(48, 6, 6);
  padding: 2px;
  font-weight: 700;
  border: 2px solid rgb(48, 6, 6);;
  transition:
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &:hover{
    color: #FFF;
    background-color: #c59315;
  }
`

type CardBlockProps = {
  cards: GridCardType[];
  cardData: {title: string, text: string, to: string}
}

export function CardBlock({cards, cardData} : CardBlockProps) {
  const [all, setAll] = useState(false);


  const { text, title, to } = cardData;
  const cardElements = cards
    .slice(0, all ? CountElement.max : CountElement.min)
    .map((item) => <GridCard card={item} key={item.id}/>);


  const handleShowMoreClick = () => setAll((prev) => !prev);
  const showMoreText = all ? 'Скрыть' : 'Показать еще';

  return (
    <CardBlockSection>
      <Header>{title}</Header>
      <CardContainer> {cardElements} </CardContainer>
      <LongButton onClick={handleShowMoreClick}>{showMoreText}</LongButton>
      <LinkToAll to={to}> {text}</LinkToAll>
    </CardBlockSection>
  )
}
