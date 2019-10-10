import styled from 'styled-components'
import { animated } from 'react-spring'

export const ContainerWrapper = styled.div`
  width: calc(100% - 50px * 2);
  margin: 20px auto;

  @media screen and (max-width: 768px) {
    width: calc(100% - 10px * 2);
  }
`

export const WhiteContainerWrapper = styled(ContainerWrapper)`
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`

export const Padding = styled.div`
  padding: 15px 0;
`

export const AnimatedTitle = styled(animated.h1)<{ color?: string }>`
  font-size: 42px;
  font-family: Montserrat;
  font-weight: 800;
  display: inline;
  color: ${props => props.color || 'black'};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 1020px) {
    display: block;
  }
`

export const SubFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  min-width: 250px;
`
