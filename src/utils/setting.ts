import { User } from 'firebase/auth'

export const extractProviderList = (user: User): string[] => {
  const result = []

  if (user?.providerData) {
    for (let i = 0; i < user.providerData.length; i++) {
      result.push(user.providerData[i]!.providerId)
    }
  }

  return result
}

export const checkProvider = (
  providerList: string[],
  providerName: string
): boolean => {
  return providerList.includes(providerName)
}

export const getDescriptionText = (user: User, providerId: string) => {
  if (checkProvider(extractProviderList(user), providerId)) {
    return `Currently bound to ${providerId} account`
  } else {
    return `Currently unbound to ${providerId} account`
  }
}
