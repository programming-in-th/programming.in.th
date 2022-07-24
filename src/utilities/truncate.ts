export const truncate = (input: string, index = 5) =>
  input.length > index ? `${input.substring(0, index)}...` : input
