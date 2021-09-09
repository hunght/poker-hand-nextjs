import styled from 'styled-components';
import Image from 'next/image';

import { Button } from '../src/components/Button';
import { useAppDispatch, useAppSelector } from '../src/redux/store';
import { selectCardsForDeck } from '../src/redux/pokerHand/selector';
import { pokerHandAction } from '../src/redux/pokerHand';
import { isEmpty } from 'ramda';
import { createGlobalStyle } from 'styled-components';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f7fbfd;
  }
`;

const Home: React.FC = () => {
  const cards = useAppSelector(selectCardsForDeck);
  const currentRankHand = useAppSelector((state) => state.pokerHand.currentRankHand);
  const showPokerHand = useAppSelector((state) => state.pokerHand.showPokerHand);
  const history = useAppSelector((state) => state.pokerHand.history);
  const dispatch = useAppDispatch();

  const onClickShuffle = (): void => {
    dispatch(pokerHandAction.shuffleCards());
  };
  const onClickReset = (): void => {
    dispatch(pokerHandAction.resetCards());
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper>
        <Buttons>
          <Button primary onClick={onClickShuffle}>
            Shuffle cards
          </Button>
          <Button disabled={!showPokerHand} onClick={onClickReset}>
            Reset cards
          </Button>
        </Buttons>
        {cards.map((cardRow, index) => (
          <RowContainer key={index}>
            {cardRow.map((card) => (
              <Card key={card.image}>
                <Image src={card.image} alt="me" width="122" height="171" />
              </Card>
            ))}
          </RowContainer>
        ))}
        {currentRankHand && (
          <RowContainer>Rank name: {currentRankHand.rankDescription}</RowContainer>
        )}
        {!isEmpty(history) && (
          <ColumnContainer>
            History:
            {history.map((item) => (
              <RowContainer key={item.handDisplayString}>
                {item.handDisplayString}
                ===
                {item.rankDescription}
              </RowContainer>
            ))}
          </ColumnContainer>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  margin: 5px;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 122px;
  height: 171px;
  img {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-left: 5px;
  margin-bottom: 20px;
  button {
    margin-right: 10px;
  }
`;
export default Home;
