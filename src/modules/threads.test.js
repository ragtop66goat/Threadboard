import {
  ON_SET_USERNAME_IN,
  ON_SET_PASSWORD_IN,
  ON_SUBMIT_THREAD,
  ON_DELETE_THREAD,
  ON_LOGIN,
  ON_LOGOUT,
  ON_REG,
  reducer,
  ON_SET_ID,
  ON_SEND_MESSAGE,
  ON_SET_SELECTED_USER,
  ON_SET_PRIV_MESSAGE,
  ON_SET_THREAD_TITLE,
  ON_SET_THREAD_CONTENT,
  ON_EDIT_THREAD, ON_SUBMIT_POST, ON_SET_ADD_POST, ON_DELETE_POST, ON_CANCEL
} from "./threads";


test('should init to correct state', () => {
  const state = reducer()
  expect(state).toStrictEqual({
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
    postList: [],
    postContent: '',
    threadTitle: '',
    threadContent: '',
    messageList: [],
    privMessage: '',
  })
})

// ---------ON_SET type tests ------------------

test('ON_SET_USERNAME_IN should set the usernameIn to "user"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_USERNAME_IN, value: "user"})
  expect(state).toStrictEqual({
    ...initState,
    usernameIn: "user"
  })
})

test('ON_SET_PASSWORD_IN should set passwordIn to "pass"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_PASSWORD_IN, value: "pass"})
  expect(state).toStrictEqual({
    ...initState,
    passwordIn: "pass"
  })
})

test('ON_SET_ID should set id to "3"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_ID, value: "3"})
  expect(state).toStrictEqual({
    ...initState,
    id: "3"
  })
})

test('ON_SET_SELECTED_USER should set selected user and privMessage to empty', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_SELECTED_USER, value: "Crocodile"})

  expect(state).toStrictEqual({
    ...initState,
    selectedUser: "Crocodile",
    privMessage: ''
  })
})

test('ON_SET_PRIV_MESSAGE should set privMessage to "test"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_PRIV_MESSAGE, value: "test"})

  expect(state).toStrictEqual({
    ...initState,
    privMessage: "test"
  })
})

test('ON_SET_THREAD_TITLE should set threadTitle to "Title"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_TITLE, value: "Title"})

  expect(state).toStrictEqual({
    ...initState,
    threadTitle: 'Title'
  })
})

test('ON_SET_THREAD_CONTENT should set threadContent to "Content"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_CONTENT, value: "Content"})

  expect(state).toStrictEqual({
    ...initState,
    threadContent: 'Content'
  })
})

test('ON_SET_POST_CONTENT should set the postContent to "P"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_CONTENT, value: "P"})

  expect(state).toStrictEqual({
    ...initState,
    threadContent: "P"
  })
})

test('ON_SET_ADD_POST should set post to true and postToId to "23"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_ADD_POST, value: "23"})

  expect(state).toStrictEqual({
    ...initState,
    addPost: true,
    postToId: "23"
  })
})

//--------- ON_REG tests --------------------

test('ON_REG should set loginError to "Please fill in all fields" when username empty/only white spaces', () => {
  const initState = reducer({
    usernameIn: ' ',
    passwordIn: 'pass',
  })

  const state = reducer(initState, {type: ON_REG})

  expect(state).toStrictEqual({
    ...initState,
    loginError: "Please fill in all fields",
    passwordIn: 'pass',
    usernameIn: ' '
  })
})
test('ON_REG should set loginError to "Please fill in all fields" when password is blank/all white spaces', () => {
  const initState = reducer({
    usernameIn: 'user',
    passwordIn: ' ',
  })

  const state = reducer(initState, {type: ON_REG})

  expect(state).toStrictEqual({
    ...initState,
    loginError: "Please fill in all fields",
    passwordIn: ' ',
    usernameIn: 'user'
  })
})

test('ON_REG should set loginError to "User already exists" when registering an existing user; set id to null', () => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: [{username: 'user', password: 'pass'}],
  })
  const state = reducer(initState, {type: ON_REG})
  expect(state).toStrictEqual({
    ...initState,
    loginError: 'User already exists. Please login.',
    id: null
  })

})

test('should register a new user', () => {
  const initState = reducer({
      usernameIn: "user",
      passwordIn: "pass",
      id: "4",
      userList: []
    }
  )
  const state = reducer(initState, {type: ON_REG})
  expect(state).toStrictEqual({
    ...initState,
    currentUser: {id: "4", username: 'user'},
    userList: [{id: "4", username: 'user', password: 'pass'}],
    usernameIn: '',
    passwordIn: '',
    id: null
  })
})

//  ----- ON_LOGIN tests -------------

test('ON_LOGIN should set loginError to "Please fill in all fields" when usernameIn blank/only white spaces', () => {
  const initState = reducer({
    usernameIn: ' ',
    passwordIn: 'this'
  })

  const state = reducer(initState, {type: ON_LOGIN})

  expect(state).toStrictEqual({
    ...initState,
    loginError: "Please fill in all fields",
    passwordIn: 'this',
    usernameIn: ' '
  })
})

test('ON_LOGIN should set loginError to "Please fill in all fields" when passwordIn blank/only white spaces', () => {
  const initState = reducer({
    usernameIn: 'this',
    passwordIn: ' '
  })

  const state = reducer(initState, {type: ON_LOGIN})

  expect(state).toStrictEqual({
    ...initState,
    loginError: "Please fill in all fields",
    passwordIn: ' ',
    usernameIn: 'this'
  })
})

test('ON_LOGIN should login user and set currentUser state to that user', () => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: [{id: "7", username: 'user', password: 'pass'}],
  })

  const state = reducer(initState, {type: ON_LOGIN})

  expect(state).toStrictEqual({
    ...initState,
    currentUser: {id: "7", username: 'user', password: 'pass'},
    usernameIn: '',
    passwordIn: ''
  })

})

test('ON_LOGIN should set login error to "Username not found. Create account?"', () => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: []
  })
  const state = reducer(initState, {type: ON_LOGIN})
  expect(state).toStrictEqual({
    ...initState,
    loginError: 'Username not found. Create account?'
  })
})

test('ON_LOGIN should set login error to "Username and password do not match', () => {
  const initState = reducer({
    usernameIn: 'user',
    passwordIn: 'oass',
    userList: [{username: 'user', password: 'pass'}]
  })

  const state = reducer(initState, {type: ON_LOGIN})
  expect(state).toStrictEqual({
    ...initState,
    loginError: 'Username and password do not match'
  })
})

test('ON_LOGOUT should logout current user', () => {
  const initState = reducer({
    currentUser: 'user',
    loginError: null
  })

  const state = reducer(initState, {type: ON_LOGOUT})
  expect(state).toStrictEqual({
    ...initState,
    currentUser: null
  })
})


//---------- EVENT tests --------------

test('ON_CANCEL should reset post and message state variables', () => {
  const initState = reducer({
    postContent: 'This',
    postToId: '45',
    id: '45',
    addPost: true,
    selectedUser: '234',
    privMessage: 'that'

  })

  const state = reducer(initState, {type: ON_CANCEL})

  expect(state).toStrictEqual({
    postContent: '',
    postToId: null,
    id: null,
    addPost: false,
    selectedUser: null,
    privMessage: ''
  })
})

test('ON_SUBMIT_THREAD should create a thread then threadTitle and threadContent turned to empty strings', () => {
  const initState = reducer({
    id: '001',
    currentUser: {username: 'user'},
    threads: [],
    threadTitle: 'title',
    threadContent: 'content'
  })

  const state = reducer(initState, {
    type: ON_SUBMIT_THREAD,
    value: '2020-02-02'
  })
  expect(state).toStrictEqual({
    ...initState,
    threads: [{
      id: '001',
      owner: 'user',
      date: '2020-02-02',
      title: 'title',
      content: 'content',
    }],
    threadTitle: '',
    threadContent: '',
    id: null,

  })


})

test('ON_SUBMIT_THREAD should not submit when threadTitle empty/only whitespaces', () => {
  const initState = reducer({
    id: '001',
    currentUser: {username: 'user'},
    threads: [],
    threadTitle: ' ',
    threadContent: 'content'
  })

  const state = reducer(initState, {
    type: ON_SUBMIT_THREAD,
    value: '2020-02-02'
  })
  expect(state).toStrictEqual({
    ...state,
    threadTitle: ' ',
    threadContent: 'content'
  })
})

test('ON_SUBMIT_THREAD should not submit when threadContent empty/only whitespaces', () => {
  const initState = reducer({
    id: '001',
    currentUser: {username: 'user'},
    threads: [],
    threadTitle: 'Title',
    threadContent: ' '
  })

  const state = reducer(initState, {
    type: ON_SUBMIT_THREAD,
    value: '2020-02-02'
  })
  expect(state).toStrictEqual({
    ...state,
    threadTitle: 'Title',
    threadContent: ' ',
    id: null
  })
})

test('ON_SUBMIT_THREAD should update the selected thread and then set id to null, threadTitle and threadContent to empty strings', () => {
  const initState = reducer({
    id: "213",
    currentUser: {username: 'user1'},
    threads: [
      {
        id: '213',
        owner: 'user1',
        date: '2020-02-02',
        title: 'old title',
        content: 'old content'
      },
      {
        id: '432',
        owner: 'user1',
        date: '2020-02-02',
        title: "shouldn't update",
        content: "shouldn't update"
      },

    ],
    threadTitle: 'New title',
    threadContent: 'New content'
  })

  const state = reducer(initState, {type: ON_SUBMIT_THREAD, value: "2022-02-02"})

  expect(state).toStrictEqual({
    ...state,
    id: null,
    currentUser: {username: 'user1'},
    threads: [
      {
        id: '213',
        owner: 'user1',
        date: '2022-02-02',
        title: 'New title',
        content: 'New content'
      },
      {
        id: '432',
        owner: 'user1',
        date: '2020-02-02',
        title: "shouldn't update",
        content: "shouldn't update"
      },

    ],
    threadTitle: '',
    threadContent: ''
  })
})

test('ON_EDIT_THREAD should update selectedThread, threadTitle, threadContent, and id values in state', () => {
  const initState = reducer({
    threads: [
      {
        id: '32',
        title: 'title',
        content: 'content'
      }
    ]
  })

  const state = reducer(initState, {type: ON_EDIT_THREAD, value: "32"})

  expect(state).toStrictEqual({
    ...state,
    selectedThread: true,
    threadTitle: 'title',
    threadContent: 'content',
    id: '32'
  })
})

test('ON_SEND_MESSAGE should create a message with date, owner, recipient, and message', () => {
  const initState = reducer({
    selectedUser: {username: "user2", id: "2"},
    currentUser: {username: "user1", id: "7"},
    privMessage: 'test',
    messageList: []
  })

  const state = reducer(initState, {type: ON_SEND_MESSAGE, value: "2022-02-02"})

  expect(state).toStrictEqual({
    ...state,
    messageList: [
      {
        date: "2022-02-02",
        recipient: "2",
        owner: "user1",
        message: "test"
      }
    ],
    selectedUser: null,
    privMessage: ""
  })
})

test('ON_SEND_MESSAGE should not create a message when privMessage blank/only whitespaces', () => {
  const initState = reducer({
    selectedUser: {username: "user2", id: "2"},
    currentUser: {username: "user1", id: "7"},
    privMessage: ' ',
    messageList: []
  })

  const state = reducer(initState, {type: ON_SEND_MESSAGE, value: "2022-02-02"})

  expect(state).toStrictEqual({
    ...state,
    selectedUser: null,
    privMessage: ""
  })
})

test('ON_DELETE_THREAD should delete a thread', () => {
  const initState = reducer({
    currentUser: {username: 'user'},
    threads: [{
      id: '001',
      owner: 'user',
      date: '2020-02-02',
      title: 'title',
      content: 'content',
    },
      {
        id: '002',
        owner: 'user',
        date: '2020-02-02',
        title: 'title2',
        content: 'content2',
      }],
    postList:[]
  })

  const state = reducer(initState, {type: ON_DELETE_THREAD, value: '002'})

  expect(state).toStrictEqual({
    ...state,
    threads: [{
      id: '001',
      owner: 'user',
      date: '2020-02-02',
      title: 'title',
      content: 'content',
    }]
  })
})

test('ON_DELETE_THREAD should delete all posts for that thread', () => {
  const initState = reducer({
    currentUser: {username: 'user'},
    threads: [{
      id: '001',
      owner: 'user',
      date: '2020-02-02',
      title: 'title',
      content: 'content',
    }],
    postList: [
      {
        id: '1',
        threadId: '001'
      },
      {
        id: '2',
        threadId: '001'
      },
      {
        id: '3',
        threadId:'002'
      }
    ]
  })

  const state = reducer(initState, {type: ON_DELETE_THREAD, value: '001'})

  expect(state).toStrictEqual({
    ...state,
    threads: [],
    postList: [{id: '3', threadId: '002'}]
  })
})

test('ON_Submit_POST should add a post to postList', () => {
  const initState = reducer({
    currentUser: {id: "43", username: "Kai"},
    postContent: "P",
    postToId: "007",
    postList: []
  })

  const state = reducer(initState, {type: ON_SUBMIT_POST, value: {date: "2020-02-02", id: "9000"}})

  expect(state).toStrictEqual({
    ...state,
    postList: [
      {
        id: "9000",
        threadId: "007",
        owner: "43",
        "ownerName": "Kai",
        date: "2020-02-02",
        content: "P"
      }
    ],
    postContent: '',
    addPost: false,
    id: null,
    postToId: null
  })
})

test('ON_Submit_POST should not add a post when postContent is empty/only whitespaces', () => {
  const initState = reducer({
    currentUser: {id: "43", username: "Kai"},
    postContent: " ",
    postToId: "007",
    postList: []
  })

  const state = reducer(initState, {type: ON_SUBMIT_POST, value: {date: "2020-02-02", id: "9000"}})

  expect(state).toStrictEqual({
    ...state,
    postContent: '',
    addPost: false,
    id: null,
    postToId: null
  })
})

test('ON_SUBMIT_POST should update an existing post', () => {
  const initState = reducer({
    id: "13",
    currentUser: {id: "21", username: "Bulma"},
    postContent: "Old reply updated",
    postList: [
      {
        id: "13",
        threadId: "34",
        owner: "21",
        date: "2020-02-02",
        content: "Old reply"
      },
      {
        id: "17",
        threadId: "34",
        owner: "65",
        date: "2020-02-02",
        content: "Endeavor reply"
      }
    ]

  })

  const state = reducer(initState, {type: ON_SUBMIT_POST, value: {date: "2022-02-02", id: "13"}})

  expect(state).toStrictEqual({
    postList: [
      {
        id: "13",
        threadId: "34",
        owner: "21",
        date: "2022-02-02",
        content: "Old reply updated"
      },
      {
        id: "17",
        threadId: "34",
        owner: "65",
        date: "2020-02-02",
        content: "Endeavor reply"
      }
    ],
    id: null,
    addPost: false,
    postContent: '',
    postToId: null,
    currentUser: {id: "21", username: "Bulma"}
  })
})

test('ON_DELETE_POST should delete the correct post', () => {
  const initState = reducer({
    postList: [
      {
        id: "56"
      },
      {
        id: "09"
      }
    ]
  })

  const state = reducer(initState, {type: ON_DELETE_POST, value: "56"})

  expect(state).toStrictEqual({
    ...state,
    postList: [
      {
        id: "09"
      }
    ]
  })
})
