import {render, screen} from "@testing-library/react";
import {Thread} from './Thread'

test('should render elements with "User1", "2020-02-02", "Test Title" and "Test content"', () => {

  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = () => {
  }
  const _Post = () => {
  }
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)

  expect(screen.getByText("User1")).toBeInTheDocument()
  expect(screen.getByText("2020-02-02")).toBeInTheDocument()
  expect(screen.getByText("Test Title")).toBeInTheDocument()
  expect(screen.getByText("Test content")).toBeInTheDocument()
})

test('should render "Edit and Delete buttons"', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: []
  }))
  const dispatch = () => {
  }
  const _Post = () => {
  }
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)


  expect(screen.getByText("Edit")).toBeInTheDocument()
  expect(screen.getByText("Delete")).toBeInTheDocument()

})

test('should render Thread with Post"', () => {
  const _useSelector = ((fn) => fn({
    currentUser: {username: "User1"},
    postList: [1]
  }))
  const dispatch = () => {
  }
  const _Post = () => <>PostItem</>
  const thread = {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch} _useSelector={_useSelector} _Post={_Post}/>)


  expect(screen.getByText("PostItem")).toBeInTheDocument()

})