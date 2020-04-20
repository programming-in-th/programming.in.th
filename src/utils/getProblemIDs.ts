import fetch from 'isomorphic-unfetch'

export const getProblemIDs = async () => {
  const data = await fetch(
    'https://asia-east2-proginth.cloudfunctions.net/getAllProblemIDs'
  ).then(o => o.json())

  const paths = data.map((id: string) => {
    return { params: { id } }
  })

  return paths
}
