import firebase from '../../../lib/firebase'

export const submitCode = async (
  id: string,
  code: string[],
  lang: string,
  user: firebase.User,
  setResponse: React.Dispatch<
    React.SetStateAction<{
      status: number
    }>
  >
) => {
  if (!user) return

  const params = {
    id,
    code,
    lang
  }

  setResponse({
    status: -1
  })

  const response = await firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('makeSubmission')(params)

  if (response) {
    setResponse({
      status: 200
    })
  }
}
