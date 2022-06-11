export const ON_LOGIN = 'threads/ON_LOGIN'
export const ON_REG = 'threads/ON_REG'
export const ON_SUBMIT_THREAD = 'threads/ON_SUBMIT_EVENT'
export const ON_LOGOUT = 'threads/ON_LOGOUT'
export const ON_DELETE_THREAD = 'threads/ON_DELETE_THREAD'
export const ON_SEND_MESSAGE = 'threads/ON_SEND_MESSAGE'
export const ON_EDIT_THREAD = 'threads/ON_EDIT_THREAD'
export const ON_SUBMIT_POST = 'threads/ON_ADD_POST'
export const ON_EDIT_POST = 'threads/ON_EDIT_POST'
export const ON_DELETE_POST = 'threads/ON_DELETE_POST'
export const ON_SET_SELECTED_USER = 'threads/ON_SET_SELECTED_USER'
export const ON_SET_ID = 'threads/ON_SET_ID'
export const ON_SET_USERNAME_IN = 'threads/ON_SET_USERNAME_IN'
export const ON_SET_PASSWORD_IN = 'threads/ON_SET_PASSWORD_IN'
export const ON_SET_PRIV_MESSAGE = 'threads/ON_SET_PRIV_MESSAGE'
export const ON_SET_THREAD_TITLE = 'threads/ON_SET_THREAD_TITLE'
export const ON_SET_THREAD_CONTENT = 'threads/ON_SET_THREAD_CONTENT'
export const ON_SET_POST_CONTENT = 'threads/ON_SET_POST_CONTENT'
export const ON_SET_ADD_POST = 'threads/ON_SET_ADD_POST'


const initState = {
  currentUser: null,
  selectedUser: null,
  selectedThread: null,
  addPost: false,
  postToId: null,
  loginError: null,
  usernameIn: '',
  passwordIn: '',
  id: null,
  userList: [],
  threads: [],
  threadTitle: '',
  threadContent: '',
  postList: [],
  postContent: '',
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
          loginError: 'User already exists. Please login.',
          id: null
        }
      return {
        ...state,
        userList: [
          ...state.userList,
          {
            username: state.usernameIn,
            password: state.passwordIn,
          }
        ],
        currentUser: {username: state.usernameIn},
        usernameIn: '',
        passwordIn: '',
        id: null
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
      if (!matchedUser)
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
    case ON_SET_THREAD_TITLE:
      return {
        ...state,
        threadTitle: action.value
      }
    case ON_SET_THREAD_CONTENT:
      return {
        ...state,
        threadContent: action.value
      }
    case ON_SET_ADD_POST:
      return {
        ...state,
        addPost: true,
        postToId: action.value
      }
    case ON_SET_POST_CONTENT:
      return {
        ...state,
        postContent: action.value
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

    case ON_SUBMIT_THREAD:
      const updateThread = state.threads.find(thread => thread.id === state.id)
      if (!updateThread)
        return {
          ...state,
          threads: [
            ...state.threads,
            {
              id: action.value.id,
              owner: state.currentUser.username,
              date: action.value.date,
              title: state.threadTitle,
              content: state.threadContent,
            }
          ],
          threadTitle: '',
          threadContent: '',
          id: null
        }
      return {
        ...state,
        threads: state.threads.map((thread) => {{
          if(thread.id === state.id){
            return {
              id: state.id,
              owner: state.currentUser.username,
              date: action.value.date,
              title: state.threadTitle,
              content: state.threadContent
            }
          }
          return thread
        }}),
        threadContent: '',
        threadTitle: '',
        id: null

      }
    case ON_EDIT_THREAD:
      const toEdit = state.threads.find(thread => thread.id === action.value)
      return {
        ...state,
        selectedThread: true,
        threadTitle: toEdit.title,
        threadContent: toEdit.content,
        id: toEdit.id
      }

    case ON_DELETE_THREAD:
      return {
        ...state,
        threads:
          state.threads.filter(obj => obj.id !== action.value)

      }
    case ON_SUBMIT_POST:
      const updatePost = state.postList.find(post => post.id === state.id)
      if(!updatePost)
      return {
        ...state,
        postList: [
          ...state.postList,
          {
            id: action.value.id,
            threadId: state.postToId,
            owner: state.currentUser.username,
            date: action.value.date,
            content: state.postContent
          }
        ],
        postContent: '',
        addPost: false,
        id: null,
        postToId: null

      }
      return {
        ...state,
        postList:
          state.postList.map((post) => {
            if(post.id === state.id){
              return {
                id: state.id,
                threadId: post.threadId,
                owner: state.currentUser.username,
                date: action.value.date,
                content: state.postContent
              }
            }
            return post
          }),
        postContent: '',
        addPost: false,
        id: null,
        postToId: null
      }
    case ON_EDIT_POST:
      const postEdit = state.postList.find(post => post.id === action.value)
      return {
        ...state,
        addPost: true,
        postContent: postEdit.content,
        id: postEdit.id,
        postToId: postEdit.threadId

      }
    case ON_DELETE_POST:
      return {
        ...state,
        postList:
        state.postList.filter(post => post.id !== action.value)
      }
    default:
      return {
        ...state
      }
  }

}