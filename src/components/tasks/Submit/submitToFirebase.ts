import firebaseApp from 'lib/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { User } from 'firebase/auth'

const functions = getFunctions(firebaseApp, 'asia-east2')

export const submitCode = async (
  id: string,
  code: string[],
  lang: string,
  user: User,
  setStatus: React.Dispatch<
    React.SetStateAction<'WAIT' | 'LOADING' | 'OK' | 'ERROR'>
  >,
  setSubmissionID: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!user) return

  const params = {
    id,
    code,
    lang,
  }

  setStatus('LOADING')

  const makeSubmission = httpsCallable(functions, 'makeSubmission')

  const response = await makeSubmission(params)

  if (response) {
    setSubmissionID(response.data as string)
    setStatus('OK')
  }
}
