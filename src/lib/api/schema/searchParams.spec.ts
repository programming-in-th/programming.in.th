import { describe, it, expect } from 'vitest'

import { paramsToObject } from './searchParams'

const prefix = 'http://localhost:3000'

function getParams(path: string) {
  return paramsToObject(new URL(`${prefix}${path}`).searchParams)
}

describe('searchParams', () => {
  it('Case Normal', () => {
    expect(getParams('/endpoint?gean=true')).toStrictEqual({
      gean: 'true'
    })

    expect(
      getParams('/endpoint/gean/mak/mak/blackslex?gean=very&black=slex&icy=3')
    ).toStrictEqual({
      gean: 'very',
      black: 'slex',
      icy: '3'
    })
  })

  it('Case Array', () => {
    expect(
      getParams('/api/submissions?filter=own&filter=task&taskId=0009')
    ).toStrictEqual({
      filter: ['own', 'task'],
      taskId: '0009'
    })
  })
})
