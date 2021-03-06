import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
`

export const Th = styled.th`
  text-align: left;
  letter-spacing: 0.05em;
  font-size: 0.75em;
  font-weight: 500;
  background-color: #f7fafc;
  color: #718096;
  border-bottom: 1px solid #e2e8f0;
  padding: 8px 16px;
`

export const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.25s;

  :hover {
    background-color: #f7fafc;
    border-left: 4px inset #e2e8f0;
  }
`

export const TrP = styled.tr`
  cursor: pointer;
  transition: background-color 0.25s;
  background-color: #f0fff4;
  :hover {
    background-color: #c6f6d5;
    border-left: 4px inset #276749;
  }
`

export const TrF = styled.tr`
  cursor: pointer;
  transition: background-color 0.25s;
  background-color: #fff5f5;
  :hover {
    background-color: #fed7d7;
    border-left: 4px inset #9b2c2c;
  }
`

export const Td = styled.td`
  text-align: left;
`

export const TdHide = styled.td`
  height: 40px;
`
