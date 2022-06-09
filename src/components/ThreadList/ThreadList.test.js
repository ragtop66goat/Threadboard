import {render, screen} from "@testing-library/react";
import {ThreadList} from "./ThreadList";

test('should render an element for each thread', ()=> {
  const _useSelector = ((fn) => fn({threads: [{owner: true}, {owner: true}]}))
  const _Thread = () => <>Thread</>

  render(<ThreadList _useSelector={_useSelector} _Thread={_Thread}/>)


  expect(screen.getAllByText("Thread")).toHaveLength(2)

})