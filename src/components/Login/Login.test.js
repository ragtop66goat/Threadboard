import {render, screen} from "@testing-library/react";
import {Login} from "./Login";
import userEvent from "@testing-library/user-event";
import {ON_LOGIN, ON_REG, ON_SET_ID, ON_SET_PASSWORD_IN, ON_SET_USERNAME_IN} from "../../modules/threads";

// ---------- Element Tests -----------------------

test('should have a Username and Password input field', () => {
  const _useSelector = () => {
  }
  const _useDispatch = () => {
  }

  render(<Login _useSelector={_useSelector} _useDispatch={_useDispatch}/>)

  expect(screen.getByPlaceholderText('Username').tagName).toBe("INPUT")
  expect(screen.getByPlaceholderText('Password').tagName).toBe("INPUT")
})

test('should have a "Login" and "Create Account" button', () => {
  const _useSelector = () => {
  }
  const _useDispatch = () => {
  }

  render(<Login _useSelector={_useSelector} _useDispatch={_useDispatch}/>)

  expect(screen.getByText('Login').tagName).toBe("BUTTON")
  expect(screen.getByText('Create Account').tagName).toBe("BUTTON")
})

test('should have a div that says "Welcome to Threadboard" and no loginError message', () => {
  const _useSelector = () => {
  }
  const _useDispatch = () => {
  }

  render(<Login _useSelector={_useSelector} _useDispatch={_useDispatch}/>)

  const errorMessage = screen.getByLabelText("error")

  expect(screen.getByText('Welcome to Threadboard')).toBeInTheDocument()
  expect(errorMessage).toContainHTML('')
})

test('should show error message in login-error div', () => {
  const dispatch = () => {}
  const loginError = 'Error'
  const useSelector = () => {
    return loginError
  }

  render(<Login _useSelector={() => useSelector()} _useDispatch={dispatch}/> )

  expect(screen.getByText('Error')).toBeInTheDocument()

})

// --------- function tests ------------------------

test('should dispatch ON_LOGIN when "Login" button is pressed', () => {
  const _useSelector = () => {
  }
  const dispatch = jest.fn()

  render(<Login _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText('Login')
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_LOGIN
  })
})

test('should dispatch ON_REG and ON_SET_ID when "Create Account" is pressed', () => {
  const _useSelector = () => {}
  const dispatch = jest.fn()
  const _uuidv4 = () => "5"


  render(<Login _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)


  const button = screen.getByText('Create Account')
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_ID,
    value: "5"
  })
  expect(dispatch).toHaveBeenCalledWith({
    type: ON_REG
  })

})

test('should dispatch ON_SET_USERNAME_IN with value "A" ', () => {
  const _useSelector = () => {
  }
  const dispatch = jest.fn()

  render(<Login _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const input = screen.getByPlaceholderText('Username')
  userEvent.type(input, 'A')

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_USERNAME_IN,
    value: 'A'
  })
})

test('should dispatch ON_SET_PASSWORD_IN with value "P" ', () => {
  const _useSelector = () => {
  }
  const dispatch = jest.fn()

  render(<Login _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const input = screen.getByPlaceholderText('Password')
  userEvent.type(input, "P")

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_PASSWORD_IN,
    value: "P"
  })
})

test('should dispatch ON_SET_ID with "3" when', () => {
  const _useSelector = () => {}
  const dispatch = jest.fn()
  const _uuidv4 = () => {
    return "3"
  }

  render(<Login _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={() => _uuidv4()}/>)

  const button = screen.getByText('Create Account')
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({type: ON_SET_ID, value: "3"})
  expect(dispatch).toHaveBeenCalledWith({type: ON_REG})

})