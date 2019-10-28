import React from 'react'

import Link from 'next/link'
import { Result, Button } from 'antd'

export const AlreadyLoggedIn = () => {
  return (
    <Result
      title="Already logged in"
      subTitle="Sorry, you already logged in. Please return to main page"
      extra={
        <Link href="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}
