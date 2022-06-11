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
  ON_EDIT_THREAD, ON_SUBMIT_POST, ON_SET_ADD_POST, ON_DELETE_POST
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
  const initSate = reducer()
  const state = reducer(initSate, {type:ON_SET_USERNAME_IN, value: "user"})
  expect(state).toStrictEqual({
    ...state,
    usernameIn: "user"
  })
})

test('ON_SET_PASSWORD_IN should set passwordIn to "pass"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_PASSWORD_IN, value: "pass"})
  expect(state).toStrictEqual({
    ...state,
    passwordIn: "pass"
  })
})

test('ON_SET_ID should set id to "3"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_ID, value: "3"})
  expect(state).toStrictEqual({
    ...state,
    id: "3"
  })
})

test('ON_SET_SELECTED_USER should set selected user and privMessage to empty', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_SELECTED_USER, value: "Crocodile"})

  expect(state).toStrictEqual({
    ...state,
    selectedUser: "Crocodile",
    privMessage: ''
  })
})

test('ON_SET_PRIV_MESSAGE should set privMessage to "test"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_PRIV_MESSAGE, value: "test"})

  expect(state).toStrictEqual({
    ...state,
    privMessage: "test"
  })
})

test('ON_SET_THREAD_TITLE should set threadTitle to "Title"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_TITLE, value: "Title"})

  expect(state).toStrictEqual({
    ...state,
    threadTitle: 'Title'
  })
})

test('ON_SET_THREAD_CONTENT should set threadContent to "Content"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_CONTENT, value: "Content"})

  expect(state).toStrictEqual({
    ...state,
    threadContent: 'Content'
  })
})

test('ON_SET_POST_CONTENT should set the postContent to "P"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_THREAD_CONTENT, value: "P"})

  expect(state).toStrictEqual({
    ...state,
    threadContent: "P"
  })
})

test('ON_SET_ADD_POST should set post to true and postToId to "23"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_ADD_POST, value: "23"})

  expect(state).toStrictEqual({
    ...state,
    addPost: true,
    postToId: "23"
  })
})

//--------- ON_REG tests --------------------

test('ON_REG should set loginError to "User already exists" when registering an existing user',() => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: [{username:'user',password:'pass'}],
  })
  const state = reducer(initState, {type:ON_REG})
  expect(state).toStrictEqual({
    ...state,
    loginError:'User already exists. Please login.'
  })

})

test('should register a new user', ()=> {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: []
    }
  )
  const state = reducer(initState, {type: ON_REG})
  expect(state).toStrictEqual({
    ...state,
    currentUser:{username:'user'},
    userList:[{username:'user',password:'pass'}],
    usernameIn: '',
    passwordIn: ''
  })
})

//  ----- ON_LOGIN tests -------------

test('ON_LOGIN should login user and set currentUser state to that user', () => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList:[{username:'user',password:'pass'}],
  })

  const state = reducer(initState, {type:ON_LOGIN})

  expect(state).toStrictEqual({
    ...state,
    currentUser: {username:'user'},
    usernameIn: '',
    passwordIn: ''
  })

})

test('ON_LOGIN should set login error to "Username not found"', () => {
  const initState = reducer({
    usernameIn: "user",
    passwordIn: "pass",
    userList: []
  })
  const state = reducer(initState, {type:ON_LOGIN})
  expect(state).toStrictEqual({
    ...state,
    loginError:'Username not found'
  })
})

test('ON_LOGIN should set login error to "Username and password do not match',()=>{
  const initState = reducer({
    usernameIn: 'user',
    passwordIn: 'oass',
    userList: [{username: 'user', password: 'pass'}]
  })

  const state = reducer(initState, {type: ON_LOGIN})
  expect(state).toStrictEqual({
    ...state,
    loginError: 'Username and password do not match'
  })
})

test('ON_LOGOUT should logout current user', () => {
  const initState = reducer({
    currentUser: 'user',
    loginError: null
  })

  const state = reducer(initState, {type:ON_LOGOUT})
  expect(state).toStrictEqual({
    ...state,
    currentUser: null
  })
})


//---------- EVENT tests --------------

test('ON_SUBMIT_THREAD should create a thread then threadTitle and threadContent turned to empty strings', () => {
  const initState = reducer({
    currentUser: {username:'user'},
    threads: [],
    threadTitle: 'title',
    threadContent: 'content'
  })

  const state = reducer(initState, {type: ON_SUBMIT_THREAD,
    value:{id:'001',date:'2020-02-02'}})
  expect(state).toStrictEqual({
    ...state,
    threads:[{
      id:'001',
      owner: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    }],
    threadTitle: '',
    threadContent: ''
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

  const state = reducer(initState, {type: ON_SUBMIT_THREAD, value: {date: "2022-02-02", id: "213"}})

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
  const  initState = reducer({
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
    selectedUser: "user2",
    currentUser: "user1",
    privMessage: 'test',
    messageList: []
  })

  const state = reducer(initState, {type: ON_SEND_MESSAGE, value: "2022-02-02"})

  expect(state).toStrictEqual({
    ...state,
    messageList: [
      {
        date: "2022-02-02",
        recipient: "user2",
        owner: "user1",
        message: "test"
      }
    ],
    selectedUser: null,
    privMessage: ""
  })
})

test('ON_DELETE_THREAD should delete a thread', () => {
  const initState = reducer({
    currentUser: {username:'user'},
    threads:[{
      id:'001',
      owner: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    },
      {
        id:'002',
        owner: 'user',
        date:'2020-02-02',
        title:'title2',
        content:'content2',
      }]
  })

  const state = reducer(initState, {type:ON_DELETE_THREAD, value:'002'})

  expect(state).toStrictEqual({
    ...state,
    threads:[{
      id:'001',
      owner: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    }]
  })
})

test('ON_Submit_POST should add a post to postList', () => {
  const initState = reducer({
    currentUser: {username: "Kai"},
    postContent: "P",
    postToId: "007",
    postList:[]
  })

  const state = reducer(initState, {type: ON_SUBMIT_POST, value: {date:"2020-02-02", id: "9000"}})

  expect(state).toStrictEqual({
    ...state,
    postList: [
      {
        id: "9000",
        threadId: "007",
        owner: "Kai",
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

test('ON_SUBMIT_POST should update an existing post', () => {
  const initState = reducer({
    id: "13",
    currentUser: {username: "Bulma"},
    postContent: "Old reply updated",
    postList: [
      {
        id: "13",
        threadId: "34",
        owner: "Bulma",
        date: "2020-02-02",
        content: "Old reply"
      },
      {
        id: "17",
        threadId: "34",
        owner: "Endeavor",
        date: "2020-02-02",
        content: "Endeavor reply"
      }
    ]

  })

  const state = reducer(initState, {type: ON_SUBMIT_POST, value: {date: "2022-02-02", id:"13"}})

  expect(state).toStrictEqual({
    postList:[
      {
        id: "13",
        threadId: "34",
        owner: "Bulma",
        date: "2022-02-02",
        content: "Old reply updated"
      },
      {
        id: "17",
        threadId: "34",
        owner: "Endeavor",
        date: "2020-02-02",
        content: "Endeavor reply"
      }
    ],
    id: null,
    addPost: false,
    postContent: '',
    postToId: null,
    currentUser: {username: "Bulma"}
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
