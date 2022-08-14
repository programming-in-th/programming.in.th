// Map ['Extension', 'Display Name', 'Grader and Prism Format']
const languageData = [
  ['cpp', 'C++', 'cpp'],
  ['c', 'C', 'c'],
  ['py', 'Python 3', 'python'],
  ['java', 'Java', 'java'],
  ['rs', 'Rust', 'rust']
]

export const getDisplayNameFromGrader = (name: string) => {
  const lang = languageData.find(l => l[2] === name)
  return lang ? lang[1] : name
}

export const getLanguageFromExtension = (ext: string) => {
  const lang = languageData.find(l => l[0] === ext)
  return lang ? lang[2] : ext
}
