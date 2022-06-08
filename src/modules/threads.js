export const ON_LOGIN = 'threads/ON_LOGIN'
export const ON_REG = 'threads/ON_REG'
export const ON_SET_USERNAME_IN = 'threads/ON_SET_USERNAME_IN'
export const ON_SET_PASSWORD_IN = 'threads/ON_SET_PASSWORD_IN'
export const ON_CREATE_THREAD = 'threads/ON_CREATE_EVENT'
export const ON_LOGOUT = 'threads/ON_LOGOUT'
export const ON_DELETE_THREAD = 'threads/ON_DELETE_THREAD'
export const ON_SET_SELECTED_USER = 'threads/ON_SET_SELECTED_USER'
export const ON_SET_ID = 'threads/ON_SET_ID'
export const ON_SEND_MESSAGE = 'threads/ON_SEND_MESSAGE'
export const ON_SET_PRIV_MESSAGE = 'threads/ON_SET_PRIV_MESSAGE'

const initState = {
  currentUser: null,
  selectedUser: null,
  loginError: null,
  usernameIn: '',
  passwordIn: '',
  id: '',
  userList: [],
  threads: [],
  messageList: [],
  privMessage: '',
}

export function reducer(state = initState, action) {
  switch (action?.type) {
    case ON_REG:
      const foundUser = state.userList.find(user => user.username === state.usernameIn)
      if (foundUser)
        return {
          ...state,
          loginError: 'User already exists. Please login.'
        }
      return {
        ...state,
        userList: [
          ...state.userList,
          {username: state.usernameIn,
           password: state.passwordIn,}
        ],
        currentUser: {username: state.usernameIn},
        usernameIn: '',
        passwordIn: ''
      }

    case ON_LOGIN:
      const registeredUser = state.userList.find(
        user => user.username === state.usernameIn &&
          user.password === state.passwordIn)
      const matchedUser = state.userList.find(user => user.username === state.usernameIn)
      if (registeredUser)
        return {
          ...state,
          currentUser: {username: state.usernameIn},
          usernameIn: '',
          passwordIn: ''
        }
      if(!matchedUser)
        return {
        ...state,
          loginError: 'Username not found'
        }
      return {
        ...state,
        loginError: 'Username and password do not match'
      }
    case ON_SET_PASSWORD_IN:
      return {
        ...state,
        passwordIn: action.value
      }
    case ON_SET_USERNAME_IN:
      return {
        ...state,
        usernameIn: action.value
      }
    case ON_SET_ID:
      return {
        ...state,
        id: action.value
      }
    case ON_SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.value
      }
    case ON_SET_PRIV_MESSAGE:
      return {
        ...state,
        privMessage: action.value
      }
    case ON_LOGOUT:
      return {
        ...state,
        currentUser: null,
        loginError: null,
      }
    case ON_SEND_MESSAGE:
      return {
        ...state,
        messageList: [
          ...state.messageList,
          {
            date: action.value,
            recipient: state.selectedUser,
            message: state.privMessage,
            owner: state.currentUser
          }
        ],
        selectedUser: null,
        privMessage: ''
      }

    case ON_CREATE_THREAD:

      return{
        ...state,
        userThreads: [
          ...state.userThreads,
          {
            id: action.value.id,
            createdBy: state.currentUser.username,
            date: action.value.date,
            title: action.value.title,
            content: action.value.content,
          }

        ]
      }
    case ON_DELETE_THREAD:
      return{
        ...state,
        userThreads:
          state.userThreads.filter(obj => obj.id !== action.value)

      }
    default:
      return {
        ...state
      }
  }

}