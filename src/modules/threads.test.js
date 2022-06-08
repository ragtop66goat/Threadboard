import {
  ON_SET_USERNAME_IN,
  ON_SET_PASSWORD_IN,
  ON_CREATE_THREAD,
  ON_DELETE_THREAD,
  ON_LOGIN,
  ON_LOGOUT,
  ON_REG,
  reducer,
  ON_SET_ID, ON_SEND_MESSAGE, ON_SET_SELECTED_USER, ON_SET_PRIV_MESSAGE
} from "./threads";


test('should init to correct state', () => {
  const state = reducer()
  expect(state).toStrictEqual({
    currentUser: null,
    selectedUser: null,
    loginError: null,
    usernameIn: '',
    passwordIn: '',
    id: '',
    userList:[],
    threads: [],
    messageList: [],
    privMessage: '',
  })
})

// ---------ON_SET type tests ------------------

test('should set the usernameIn to "user"', () => {
  const initSate = reducer()
  const state = reducer(initSate, {type:ON_SET_USERNAME_IN, value: "user"})
  expect(state).toStrictEqual({
    ...state,
    usernameIn: "user"
  })
})

test('should set passwordIn to "pass"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_PASSWORD_IN, value: "pass"})
  expect(state).toStrictEqual({
    ...state,
    passwordIn: "pass"
  })
})

test('should set id to "3"', () => {
  const initState = reducer()
  const state = reducer(initState, {type: ON_SET_ID, value: "3"})
  expect(state).toStrictEqual({
    ...state,
    id: "3"
  })
})

test('should set selected user and privMessage to empty', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_SELECTED_USER, value: "Crocodile"})

  expect(state).toStrictEqual({
    ...state,
    selectedUser: "Crocodile",
    privMessage: ''
  })
})

test('should set privMessage to "test"', () => {
  const initState = reducer()

  const state = reducer(initState, {type: ON_SET_PRIV_MESSAGE, value: "test"})

  expect(state).toStrictEqual({
    ...state,
    privMessage: "test"
  })
})

//--------- ON_REG tests --------------------

test('should set loginError to "User already exists" when registering an existing user',() => {
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

test('should login user and set currentUser state to that user', () => {
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

test('should set login error to "Username not found"', () => {
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

test('should set login error to "Username and password do not match',()=>{
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

test('should logout current user', () => {
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

test('should create a thread', () => {
  const initState = reducer({
    currentUser: {username:'user'},
    userThreads: []
  })

  const state = reducer(initState, {type: ON_CREATE_THREAD,
    value:{id:'001',date:'2020-02-02', title:'title', content:'content'}})
  expect(state).toStrictEqual({
    ...state,
    userThreads:[{
      id:'001',
      createdBy: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    }]
  })


})

test('should create a message with date, owner, recipient, and message', () => {
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

test('Should delete a thread', () => {
  const initState = reducer({
    currentUser: {username:'user'},
    userThreads:[{
      id:'001',
      createdBy: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    },
      {
        id:'002',
        createdBy: 'user',
        date:'2020-02-02',
        title:'title2',
        content:'content2',
      }]
  })

  const state = reducer(initState, {type:ON_DELETE_THREAD, value:'002'})

  expect(state).toStrictEqual({
    ...state,
    userThreads:[{
      id:'001',
      createdBy: 'user',
      date:'2020-02-02',
      title:'title',
      content:'content',
    }]
  })
})
