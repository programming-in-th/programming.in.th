import Router from 'next/router'

export const insertQueryString = (key: string, value: string) => {
  if (window !== undefined) {
    const queryString = new URLSearchParams(window.location.search)

    Router.replace({
      pathname: window.location.pathname,
      query: { ...Object.fromEntries(queryString), [key]: value },
    })
  }
}
