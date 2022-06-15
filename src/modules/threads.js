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
export const ON_CANCEL = 'threads/ON_CANCEL'
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
      if(state.usernameIn.trim().length < 1 || state.passwordIn.trim().length < 1)
        // inputs can't be blank
        return {
        ...state,
          loginError: "Please fill in all fields"
        }
      // userList to see if username already exists
      const foundUser = state.userList.find(user => user.username === state.usernameIn)
      // return if username exists
      if (foundUser)
        return {
          ...state,
          loginError: 'User already exists. Please login.',
          id: null
        }
      // register new account action
      return {
        ...state,
        userList: [
          ...state.userList,
          {
            id: state.id,
            username: state.usernameIn,
            password: state.passwordIn,
          }
        ],
        currentUser: {id: state.id, username: state.usernameIn},
        usernameIn: '',
        passwordIn: '',
        id: null
      }

    case ON_LOGIN:
      if(state.usernameIn.trim().length < 1 || state.passwordIn.trim().length < 1)
        // inputs can't be blank
        return {
          ...state,
          loginError: "Please fill in all fields"
        }
      // checks to validate username and password exist and match
      const registeredUser = state.userList.find(
        user => user.username === state.usernameIn &&
          user.password === state.passwordIn)
      const matchedUser = state.userList.find(user => user.username === state.usernameIn)
      // if name and password match set currentUser
      if (registeredUser)
        return {
          ...state,
          currentUser: matchedUser,
          usernameIn: '',
          passwordIn: ''
        }
      // if username not found
      if (!matchedUser)
        return {
          ...state,
          loginError: 'Username not found. Create account?'
        }
      // if username exists but password doesn't match
      return {
        ...state,
        loginError: 'Username and password do not match'
      }
      // global cancel button
    case ON_CANCEL:
      return {
        ...state,
        postContent: '',
        postToId: null,
        id: null,
        addPost: false,
        selectedUser: null,
        privMessage: ''
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
      if(state.privMessage.trim().length < 1)
        return {
        ...state,
          selectedUser: null,
          privMessage: '',
        }
      return {
        ...state,
        messageList: [
          ...state.messageList,
          {
            date: action.value,
            recipient: state.selectedUser.id,
            message: state.privMessage,
            owner: state.currentUser.username
          }
        ],
        selectedUser: null,
        privMessage: ''
      }

    case ON_SUBMIT_THREAD:
      // checks thread.id against id in state, which is either new or ON_EDIT_THREAD value
      const updateThread = state.threads.find(thread => thread.id === state.id)
      if(state.threadContent.trim().length < 1 || state.threadTitle.trim().length < 1)
        return {
        ...state,
          id: null
        }
      //action for new thread
      if (!updateThread)
        return {
          ...state,
          threads: [
            ...state.threads,
            {
              id: state.id,
              owner: state.currentUser.username,
              date: action.value,
              title: state.threadTitle,
              content: state.threadContent,
            }
          ],
          threadTitle: '',
          threadContent: '',
          id: null
        }
      // action for update thread
      return {
        ...state,
        threads: state.threads.map((thread) => {{
          if(thread.id === state.id){
            return {
              id: state.id,
              owner: state.currentUser.username,
              date: action.value,
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
      //finds the thread in threads to populate its data for updating
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
          state.threads.filter(obj => obj.id !== action.value),
        postList:
          state.postList.filter(obj => obj.threadId !== action.value)

      }
    case ON_SUBMIT_POST:
      // checks post.id against the id in state which is either new or ON_EDIT_POST value
      const updatePost = state.postList.find(post => post.id === state.id)
      if(state.postContent.trim().length < 1)
        return {
        ...state,
          postContent: '',
          addPost: false,
          id: null,
          postToId: null,
        }
      // new post action
      if(!updatePost)
      return {
        ...state,
        postList: [
          ...state.postList,
          {
            id: action.value.id,
            threadId: state.postToId,
            owner: state.currentUser.id,
            ownerName: state.currentUser.username,
            date: action.value.date,
            content: state.postContent
          }
        ],
        postContent: '',
        addPost: false,
        id: null,
        postToId: null

      }
      //update post action
      return {
        ...state,
        postList:
          state.postList.map((post) => {
            if(post.id === state.id){
              return {
                id: state.id,
                threadId: post.threadId,
                owner: state.currentUser.id,
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
      // finds the post in postList and populates its data in post input
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