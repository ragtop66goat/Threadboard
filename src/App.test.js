import { render, screen } from '@testing-library/react';
import App from './App';


// ------ Login Test -----------------
test('renders Login component when currentUser is null', () => {
  const _useSelector = (fn) => fn({currentUser:null})

  const _Login = () => {
    return <>Login</>
  }

render(<App _useSelector={_useSelector} _Login={_Login}/>)

  expect(screen.getByText('Login')).toBeInTheDocument()

});

// ----------- MessageInput test ---------------
test('should render MessageInput if selectedUser is not null', () => {
  const _useSelector = (fn) => fn({selectedUser: "Bakugo", currentUser: "Todoroki"})
  const _MessageInput = () => <>MessageInput</>

  render(<App _useSelector={_useSelector} _MessageInput={_MessageInput}/>)

  expect(screen.getByText("MessageInput")).toBeInTheDocument()
})

// ----------- PostInput test -------------------
test('should render PostInput', () => {
  const _useSelector = ((fn) => fn({addPost: true, currentUser: true}))
  const _PostInput = () => <>PostInput</>

  render(<App _useSelector={_useSelector} _PostInput={_PostInput}/>)

  expect(screen.getByText("PostInput")).toBeInTheDocument()
})

// _____________ MessageList test ____________
test('should render MessasgeList', () => {
  const _useSelector = ((fn) => fn({currentUser: true}))
  const _ThreadList = () => {}
  const __ThreadInput = () => {}
  const _UserList = () => {}
  const _MessageList = () => <>MessageList</>

  render(<App _useSelector={_useSelector} _MessageList={_MessageList} _ThreadList={_ThreadList}
              _ThreadInput={__ThreadInput} _UserList={_UserList}/>)

  expect(screen.getByText("MessageList")).toBeInTheDocument()
})

// ------------- ThreadInput test ----------------
test('should render ThreadInput', () => {
  const _useSelector = ((fn) => fn({currentUser: true}))
  const _ThreadList = () => {}
  const __ThreadInput = () => <>ThreadInput</>
  const _UserList = () => {}
  const _MessageList = () => {}

  render(<App _useSelector={_useSelector} _MessageList={_MessageList} _ThreadList={_ThreadList}
              _ThreadInput={__ThreadInput} _UserList={_UserList}/>)

  expect(screen.getByText("ThreadInput")).toBeInTheDocument()
})

// -------------- ThreadList test ------------------
test('should render ThreadList', () => {
  const _useSelector = ((fn) => fn({currentUser: true}))
  const _ThreadList = () => <>ThreadList</>
  const __ThreadInput = () => {}
  const _UserList = () => {}
  const _MessageList = () => {}

  render(<App _useSelector={_useSelector} _MessageList={_MessageList} _ThreadList={_ThreadList}
              _ThreadInput={__ThreadInput} _UserList={_UserList}/>)

  expect(screen.getByText("ThreadList")).toBeInTheDocument()
})

// ------------ UserList test ------------
test('should render UserList component when currentUser is not null', () => {
  const _useSelector = (fn) => fn({currentUser:"Gohan"})
  const _threadList = () => {}
  const _messageList = () => {}
  const _messageInput = () => {}
  const _threadInput = () => {}
  const _UserList = () => {
    return <>UserList</>
  }

  render(<App _useSelector={_useSelector} _UserList={_UserList} _ThreadList={_threadList}
              _MessageList={_messageList} _MessageInput={_messageInput} _ThreadInput={_threadInput}/>)

  expect(screen.getByText("UserList")).toBeInTheDocument()

})
