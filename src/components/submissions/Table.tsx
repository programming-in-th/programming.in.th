import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
`

export const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  padding: 4px;
`

export const Tr = styled.tr<{ correct: boolean }>`
  background-color: ${props => (props.correct ? '#F0FFF4' : '#FFF5F5')};
`

export const Td = styled.td`
  text-align: left;
  padding: 4px;
`
