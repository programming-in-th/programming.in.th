import styled from 'styled-components'
import { Card, Form, Icon } from 'antd'
import { media } from '../../design/Responsive'

export const Container = styled.div`
  padding: 10px;
  width: auto;
  min-height: calc(100vh - 128px);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledCard = styled(Card)`
  h1 {
    font-size: 32px;
    font-weight: 600;
  }

  width: 416px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  border-radius: 8px;

  ${media('TABLET')} {
    margin-top: 32px;
    width: 60vw;
  }

  ${media('PHONE')} {
    width: 80vw;
    padding: 0;
  }
`

export const AuthContainer = styled.div`
  h1 {
    font-size: 32px;
    font-weight: 600;
  }

  ${media('PHONE')} {
    width: 90vw;
    padding: 0px 0px 0px;
    height: unset;
  }
`

export const StyledForm = styled(Form)`
  width: 368px;
  margin-top: 15px;

  ${media('TABLET')} {
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
