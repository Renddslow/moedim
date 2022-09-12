import styled from 'styled-components'

const DateCell = styled.button`
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 10px;
  display: table-cell;
  font-weight: 500;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 0;
  border: 1px solid #fff;
  border-radius: 50%;
  background: transparent;
  box-sizing: border-box;
  font-family: inherit;

  &:hover {
    background: #f2f2f2;
  }

  &:focus {
    border: 1px solid var(--moedim-primary);
  }

  &[aria-pressed='true'] {
    background: var(--moedim-primary);
    color: #fff;
  }
`

export default DateCell
