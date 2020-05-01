import firebase from '../../../lib/firebase'

export const submitCode = async (
  id: string,
  code: string[],
  lang: string,
  user: firebase.User,
  setStatus: React.Dispatch<
    React.SetStateAction<'WAIT' | 'LOADING' | 'OK' | 'ERROR'>
  >,
  setSubmissionID: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!user) return

  const params = {
    id,
    code,
    lang
  }

  setStatus('LOADING')

  const response = await firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('makeSubmission')(params)

  if (response) {
    setSubmissionID(response.data)
    setStatus('OK')
  }
}
