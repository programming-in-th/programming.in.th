import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Icon, Select, Skeleton } from 'antd'

import { transformStatus } from '../../utils/transform'
import { CodeDisplay } from '../../components/CodeEditor'
import { ContainerWrapper } from '../../design/Atomics'

import { NextPage } from 'next'
import { PageLayout } from '../../components/Layout'
import useSWR from 'swr'
import { fetchFromFirebase } from '../../utils/fetcher'

const { Option } = Select

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 3%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin-top: 24px;
  box-sizing: border-box;
  background-color: white;
`
const themeData = [
  ['material', 'Material'],
  ['monokai', 'Monokai'],
  ['solarized', 'Solarized Light']
]

type TPlot = {
  [key: string]: string
}

const SubmissionDetail: NextPage = () => {
  const id =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : ''
  const param = useMemo(() => ({ submission_id: id }), [id])
  const [theme, setTheme] = useState<string>('material')

  return (
    <PageLayout>
      <ContainerWrapper>
        <Link href={`/tasks/${id}`}>
          <Button size="large">
            <Icon type="left" />
            Go back
          </Button>
        </Link>
        <Wrapper>
          <br />
          this is {id} page solution.
        </Wrapper>
      </ContainerWrapper>
    </PageLayout>
  )
}

export default SubmissionDetail
