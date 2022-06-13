import {render, screen} from "@testing-library/react";
import {ThreadInput} from "./ThreadInput";
import userEvent from "@testing-library/user-event";
import {ON_SET_ID, ON_SET_THREAD_CONTENT, ON_SET_THREAD_TITLE, ON_SUBMIT_THREAD} from "../../modules/threads";

test('should render an element with "Post Thread?", a "Title", a "Content" input, and "Submit" button', () => {
  const dispatch = () => {}
  const _uuidv4 = () => {}
  const _useSelector = ((fn) => fn({
    threadTitle: '',
    threadContent: '',
    id: null
  }))

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={dispatch} _uuidv4={_uuidv4}/>)

  expect(screen.getByText("Post Thread?")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Title").tagName).toBe("INPUT")
  expect(screen.getByPlaceholderText("content").tagName).toBe("INPUT")
  expect(screen.getByText("Submit").tagName).toBe("BUTTON")
})

test('should render an element with "Edit Thread", a "Title" input as "TITLE", a "Content" input as "Content", and "Submit Edit" button', () => {
  const dispatch = () => {}
  const _uuidv4 = () => {}
  const _useSelector = ((fn) => fn({
    threadTitle: 'Title',
    threadContent: 'Content',
    id: "345"
  }))

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={dispatch} _uuidv4={_uuidv4}/>)

  expect(screen.getByText("Edit Thread")).toBeInTheDocument()
  expect(screen.getByDisplayValue("Title").tagName).toBe("INPUT")
  expect(screen.getByDisplayValue("Content").tagName).toBe("INPUT")
  expect(screen.getByText("Submit Edit").tagName).toBe("BUTTON")
})

test('should dispatch ON_SET_THREAD_TITLE when user types in Title field', () => {
  const _useSelector = ((fn) => fn({
    threadTitle: '',
    threadContent: '',
    id: null
  }))
  const dispatch = jest.fn()
  const _uuidv4 = () => {}

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const input = screen.getByPlaceholderText("Title")
  userEvent.type(input, "P")

  expect(dispatch).toHaveBeenLastCalledWith({
    type: ON_SET_THREAD_TITLE,
    value: "P"
  })
})

test('should dispatch ON_SET_THREAD_CONTENT when user types in content field', () => {
  const _useSelector = ((fn) => fn({
    threadTitle: '',
    threadContent: '',
    id: null
  }))
  const dispatch = jest.fn()
  const _uuidv4 = () => {}

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const input = screen.getByPlaceholderText("content")
  userEvent.type(input, "C")

  expect(dispatch).toHaveBeenLastCalledWith({
    type: ON_SET_THREAD_CONTENT,
    value: "C"
  })
})

test('should dispatch ON_SUBMIT_THREAD and ON_SET_ID when "Submit" button is clicked', () => {
  const _useSelector = ((fn) => fn({
    threadTitle: 'this',
    threadContent: 'that',
    id: null
  }))
  const dispatch = jest.fn()
  const _uuidv4 = () => "4"

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const button = screen.getByText("Submit")
  userEvent.click(button)

  expect(dispatch).toHaveBeenLastCalledWith({
    type: ON_SUBMIT_THREAD,
    value: new Date().toISOString().substring(0, 10)
  })

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_ID,
    value: "4"
  })

})

test('should dispatch ON_SUBMIT_THREAD and ON_SET_ID with the id in state when "Submit Edit" button is clicked', () => {
  const _useSelector = ((fn) => fn({
    threadTitle: 'one',
    threadContent: 'two',
    id: "13"
  }))
  const dispatch = jest.fn()
  const _uuidv4 = () => "4"

  render(<ThreadInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const button = screen.getByText("Submit Edit")
  userEvent.click(button)

  expect(dispatch).toHaveBeenLastCalledWith({
    type: ON_SUBMIT_THREAD,
    value: new Date().toISOString().substring(0, 10)
  })

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_ID,
    value: "13"
  })

})