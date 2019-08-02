export default (state: any, action: any) => {
  switch (action.type) {
    case 'toggleFloatingAction':
      return {
        ...state,
        floatingAction: action.floatingAction
      }
    case 'log':
      return {
        ...state,
        user: {
          log: action.user.log
        }
      }
    case 'userInfo':
      return {
        ...state,
        user: {
          log: action.user.log,
          displayName: action.user.displayName,
          image: action.user.image,
          uid: action.user.uid
        }
      }
    case 'postOverlay':
      return {
        ...state,
        postOverlay: action.postOverlay
      }
    default:
      return state
  }
}
