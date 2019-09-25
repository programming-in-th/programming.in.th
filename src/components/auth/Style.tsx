import styled from 'styled-components'
import { Card, Form, Icon } from 'antd'

export const responsive = '(max-width: 436px)'

export const Container = styled.div`
  padding: 10px;
  width: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledCard = styled(Card)`
  width: 416px;
  @media ${responsive} {
    width: 90vw;
    padding: 0px 0px 0px;
  }
`

export const StyledForm = styled(Form)`
  width: 368px;
  margin: 0 auto;
  @media ${responsive} {
    width: 100%;
  }
`
export const StyledIcon = styled(Icon)`
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #188fff;
  }
`

export const Others = styled.div`
  margin-top: 24px;
  text-align: left;
`
