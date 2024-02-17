type SignInType = 'signIn' | 'linked' | 'link'

export type LoginProps = {
  type?: SignInType
}

export function getProps(providerName: string, type: SignInType = 'signIn') {
  const message =
    type === 'signIn'
      ? `Sign in with ${providerName}`
      : type === 'linked'
        ? 'Account Linked'
        : `Link ${providerName} account`

  const disabled = type === 'linked'

  return { message, disabled }
}
