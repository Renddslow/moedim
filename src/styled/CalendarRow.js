import styled from 'styled-components'

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, max-content));
  grid-gap: 4px;
`

export default CalendarRow
