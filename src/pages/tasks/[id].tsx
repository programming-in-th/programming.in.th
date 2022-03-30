import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Tasks = () => {
  const router = useRouter()
  const { id } = router.query
  return <p>{id}</p>
}

export default Tasks
