import styled from 'styled-components'

export const Table = styled.table`
  font-family: var(--font-body);
  border-collapse: collapse;
  text-align: center;
  margin-bottom: var(--gap-bottom);

  th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    font-weight: 600;
  }

  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  tr {
    border-top: 1px solid #c6cbd1;

    :nth-child(2n) {
      background-color: #f6f8fa;
    }
  }
`
