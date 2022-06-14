import {render, screen} from "@testing-library/react";
import {PostInput} from "./PostInput";
import userEvent from "@testing-library/user-event";
import {ON_CANCEL, ON_SET_POST_CONTENT, ON_SUBMIT_POST} from "../../modules/threads";


test('should render an element with Title, postContent, and Content of the thread to post to', () => {
  const _useSelector = ((fn) => fn(
    {
      postToId: "1",
      postContent: "postContent",
      threads: [{id: "1", title: "title", content: "content"}]
    }))
  const dispatch = () => {
  }

  render(<PostInput _useSelector={_useSelector} _useDispatch={dispatch}/>)

  expect(screen.getByText("Post to: title")).toBeInTheDocument()
  expect(screen.getByText("content")).toBeInTheDocument()
  expect(screen.getByDisplayValue("postContent")).toBeInTheDocument()

})

test('should render an input, "Post", and "Cancel" button', () => {
  const _useSelector = ((fn) => fn(
    {
      postToId: "1",
      postContent: "postContent",
      threads: [{id: "1", title: "title", content: "content"}]
    }))
  const dispatch = () => {
  }

  render(<PostInput _useSelector={_useSelector} _useDispatch={dispatch}/>)

  expect(screen.getByText("Post").tagName).toBe("BUTTON")
  expect(screen.getByDisplayValue("postContent").tagName).toBe("INPUT")

})

test('should dispatch ON_SET_POST_CONTENT with input change', () => {
  const _useSelector = ((fn) => fn(
    {
      postToId: "1",
      postContent: "p",
      threads: [{id: "1", title: "title", content: "content"}]
    }))
  const dispatch = jest.fn()

  render(<PostInput _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const input = screen.getByDisplayValue("p")
  userEvent.type(input, "o")

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_POST_CONTENT, value: "po"
  })


})

test('should dispatch ON_SUBMIT_POST when "Post" button clicked', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date('October, 27, 1979'))
  const _useSelector = ((fn) => fn(
    {
      postToId: "15",
      postContent: "posted",
      threads: [{id: "15", title: "title", content: "content"}]
    }))
  const dispatch = jest.fn()
  const _uuidv4 = () => "13"

  render(<PostInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const button = screen.getByText("Post")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SUBMIT_POST, value: {date: "Sat Oct 27 1979", id: "13"}
  })


})

test('should dispatch ON_CANCEL when "Cancel" button clicked', () => {
  const _useSelector = ((fn) => fn(
    {
      postToId: "15",
      postContent: "posted",
      threads: [{id: "15", title: "title", content: "content"}]
    }))
  const dispatch = jest.fn()
  const _uuidv4 = () => {}

  render(<PostInput _useSelector={_useSelector} _useDispatch={() => dispatch} _uuidv4={_uuidv4}/>)

  const button = screen.getByText("Cancel")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_CANCEL
  })


})