import { useEffect, useState } from 'react'
import { RealtimeClient } from '@supabase/realtime-js'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetcher from '@/lib/fetcher'
import { Submission } from '@prisma/client'

const socket = new RealtimeClient(process.env.NEXT_PUBLIC_REALTIME_URL)
let publicSchema = null

const Submission = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR<Submission>(`/api/submissions/${id}`, fetcher)

  let [submissionData, setSubmissionData] = useState()
  let [socketStatus, setSocketStatus] = useState('CLOSED')
  let [channelStatus, setChannelStatus] = useState('')

  console.log(data)

  const connect = () => {
    socket.onOpen(() => setSocketStatus('OPEN'))
    socket.onClose(() => setSocketStatus('CLOSED'))
    socket.onError(e => {
      setSocketStatus('ERROR')
      console.log('Socket error', e.message)
    })
    createSubscription()

    socket.connect()
  }

  useEffect(() => {
    if (
      data &&
      data.status !== 'Completed' &&
      data.status !== 'Compilation Error' &&
      data.status !== 'Judge Error' &&
      socketStatus === 'CLOSED'
    ) {
      connect()
    }
  }, [data])

  const createSubscription = () => {
    publicSchema = socket.channel(`realtime:public:Submission:id=eq.${id}`)
    publicSchema.on('UPDATE', msg => setSubmissionData(msg))

    publicSchema.onError(() => setChannelStatus('ERROR'))
    publicSchema.onClose(() => setChannelStatus('Closed gracefully.'))
    publicSchema
      .subscribe()
      .receive('ok', () => setChannelStatus('SUBSCRIBED'))
      .receive('error', () => setChannelStatus('FAILED'))
      .receive('timeout', () => setChannelStatus('Timed out, retrying.'))
  }

  return (
    <div>
      <h1>SOCKET STATUS: {socketStatus}</h1>
      <h1>CHANNEL STATUS: {channelStatus}</h1>
      <h1>hello</h1>
    </div>
  )
}

export default Submission
