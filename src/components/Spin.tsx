import styled from 'styled-components'
import { Spin } from 'antd'

export const SpinWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CustomSpin = () => (
  <SpinWrapper>
    <Spin tip="Loading..." size="large" />
  </SpinWrapper>
)
