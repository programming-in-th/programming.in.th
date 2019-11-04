import React from 'react'

import Link from 'next/link'
import { Result, Button } from 'antd'

export const NotAdmin = () => {
  return (
    <Result
      title="You are not admin"
      subTitle="Sorry, you are not admin. Please return to main page"
      extra={
        <Link href="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}
