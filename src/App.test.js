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

// ------------ UserList test ------------
test('should render UserList component when currentUser is not null', () => {
  const _useSelector = (fn) => fn({currentUser:"Gohan"})
  const _threadList = () => {}
  const _UserList = () => {
    return <>UserList</>
  }

  render(<App _useSelector={_useSelector} _UserList={_UserList} _Threadlist={_threadList}/>)

  expect(screen.getByText("UserList")).toBeInTheDocument()

})

//todo: -------- Threadlist Test -----------
test('renders Theadlsit when logged in', () => {

})