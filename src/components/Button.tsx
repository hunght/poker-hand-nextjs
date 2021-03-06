import styled from 'styled-components';

export const Button = styled.button<{ primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) =>
    props.disabled ? 'lightgray' : props.primary ? 'palevioletred' : 'white'};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    background: ${(props) => (props.disabled ? 'lightgray' : 'lightpink')};
  }
  max-width: 200px;
  cursor: pointer;
`;
