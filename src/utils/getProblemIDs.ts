import api from '../lib/api'
import { readFile, writeFile } from './fs'

export const getProblemIDs = async () => {
  let problems: any = null
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = 'PROBLEM_ID_CACHE'

  if (useCache) {
    try {
      problems = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {}
  }

  if (!problems) {
    const res = await api.get('/getAllProblemIDs')
    problems = res.data

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(problems), 'utf8').catch(() => {})
    }
  }

  const paths = problems.map((slug: string) => {
    return { params: { slug } }
  })

  return paths
}
