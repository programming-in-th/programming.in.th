import { IGroup } from '../@types/group'

export const calculate = (groups: IGroup[]) => {
  let score = 0
  let fullScore = 0
  let time = 0
  let memory = 0

  if (groups) {
    for (let i = 0; i < groups.length; ++i) {
      score = score + groups[i].score
      fullScore = fullScore + groups[i].fullScore
      for (let j = 0; j < groups[i].status.length; ++j) {
        time = Math.max(time, groups[i].status[j].time)
        memory = Math.max(memory, groups[i].status[j].memory)
      }
    }
  }

  return { score, fullScore, time, memory }
}
