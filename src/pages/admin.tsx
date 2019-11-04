import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageLayout } from '../components/Layout'
import styled, { keyframes } from 'styled-components'
import { IAppState } from '../redux'
import { NotAdmin } from '../components/admin/Already'

export default () => {
  const isAdmin = useSelector((state: IAppState) => state.user.admin)
  return (
    <PageLayout>
      {isAdmin ? <div> You are admin! </div> : <NotAdmin />}
    </PageLayout>
  )
}
