const charCodesToRemove = [8199, 8200, 8201, 8202, 8203, 10240, 12644, 65279]

export function filterName(input: string) {
  return input
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(
      new RegExp(
        `[${charCodesToRemove.map(c => String.fromCharCode(c)).join('')}]`,
        'g'
      ),
      ''
    )
    .replace(/\s+/g, ' ')
    .trim()
}
