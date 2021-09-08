import styled from 'styled-components'
import Image from 'next/image'

import { Button } from '../src/components/Button'
import { useAppSelector } from '../src/redux/store'
import { selectCardsForDeck } from '../src/redux/cards/selector'

const Home: React.FC = () => {
  const cards = useAppSelector(selectCardsForDeck)
  return (
    <Wrapper>
      <Button primary>Shuffle cards</Button>
      {cards.map((cardRow, index) => (
        <RowContainer key={index}>
          {cardRow.map((card) => (
            <Card key={card}>
              <Image src={card} alt="me" width="122" height="171" />
            </Card>
          ))}
        </RowContainer>
      ))}
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

const Card = styled.div`
  padding: 1rem;
`
export default Home
