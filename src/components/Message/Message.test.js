import {render, screen} from "@testing-library/react";
import {Message} from "./Message";

test('should display the date, from, and message', () => {
  const message = {
    date: '2022-02-02',
    owner: 'user1',
    message: 'test'
  }

  render(<Message message={message}/>)

  expect(screen.getByText("2022-02-02")).toBeInTheDocument()
  expect(screen.getByText("user1")).toBeInTheDocument()
  expect(screen.getByText("test")).toBeInTheDocument()
})