import styled from 'styled-components'

const NavigationButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  outline: none;

  svg {
    width: 100%;
    fill: #666;
  }

  &:hover {
    background: #f2f2f2;
  }

  &:focus {
    background: #efefef;
  }

  &:first-of-type {
    transform: rotate(90deg);
  }

  &:last-of-type {
    transform: rotate(-90deg);
  }
`

export default NavigationButton
