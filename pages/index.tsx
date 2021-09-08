import styled from 'styled-components'
import Image from 'next/image'

import { Button } from '../src/components/Button'
import { useAppDispatch, useAppSelector } from '../src/redux/store'
import { selectCardsForDeck } from '../src/redux/pokerHand/selector'
import { pokerHandAction } from '../src/redux/pokerHand'
import { isEmpty } from 'ramda'

const Home: React.FC = () => {
  const cards = useAppSelector(selectCardsForDeck)
  const currentRankHand = useAppSelector((state) => state.pokerHand.currentRankHand)
  const history = useAppSelector((state) => state.pokerHand.history)
  const dispatch = useAppDispatch()

  const onClickShuffle = (): void => {
    dispatch(pokerHandAction.shuffleCards())
  }
  const onClickReset = (): void => {
    dispatch(pokerHandAction.resetCards())
  }

  return (
    <Wrapper>
      <Button primary onClick={onClickShuffle}>
        Shuffle cards
      </Button>
      <Button onClick={onClickReset}>Reset cards</Button>
      {cards.map((cardRow, index) => (
        <RowContainer key={index}>
          {cardRow.map((card) => (
            <Card key={card.image}>
              <Image src={card.image} alt="me" width="122" height="171" />
            </Card>
          ))}
        </RowContainer>
      ))}
      {currentRankHand && <RowContainer>Rank name: {currentRankHand.rankDescription}</RowContainer>}
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
  )
}

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
  display: flex;
  flex-direction: column;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Card = styled.div`
  padding: 1rem;
`
export default Home
