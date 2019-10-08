import styled from 'styled-components'

export const ContainerWrapper = styled.div`
  width: calc(100% - 50px * 2);
  margin: 20px auto;

  @media screen and (max-width: 768px) {
    width: calc(100% - 10px * 2);
  }
`

export const WhiteContainerWrapper = styled(ContainerWrapper)`
  padding: 10px;
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`

export const Padding = styled.div`
  padding: 15px 0;
`
