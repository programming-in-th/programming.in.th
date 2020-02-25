import styled, { keyframes } from 'styled-components'
import { media } from './Responsive'

const fade = keyframes`
    from {
        opacity: 0;
        transform: translate(0px, 20px);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }

    to {
        opacity: 1;
        transform: translate(0px,0px);
    }
`

export const WhiteContainerWrapper = styled.div`
  animation: ${fade} 0.5s ease;
  width: 75%;
  margin: 20px auto;

  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow-main);

  ${media('TABLET')} {
    width: calc(100% - 10px * 2);
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;

  ${media('TABLET')} {
    flex-direction: column;
  }
`

export const SubFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  justify-content: center;
`
