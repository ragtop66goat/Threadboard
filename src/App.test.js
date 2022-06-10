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

//todo: -------- Threadlist Test -----------
test('renders Theadlsit when logged in', () => {

})

//todo: -------- MessageList Test ------------