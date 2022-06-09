import {render, screen} from "@testing-library/react";
import {Thread} from './Thread'

test('should render elements with "User1", "2020-02-02", "Test Title" and "Test content"', () => {

  const dispatch = () => {}
  const thread =  {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch}/>)

  expect(screen.getByText("User1")).toBeInTheDocument()
  expect(screen.getByText("2020-02-02")).toBeInTheDocument()
  expect(screen.getByText("Test Title")).toBeInTheDocument()
  expect(screen.getByText("Test content")).toBeInTheDocument()
})

test('should render "Edit and Delete buttons"', () => {

  const dispatch = () => {}
  const thread =  {
    owner: "User1",
    date: "2020-02-02",
    title: "Test Title",
    content: "Test content"
  }

  render(<Thread thread={thread} _useDispatch={dispatch}/>)

  expect(screen.getByText("Edit")).toBeInTheDocument()
  expect(screen.getByText("Delete")).toBeInTheDocument()

})