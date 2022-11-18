import {useSelector} from "react-redux";
import {Thread} from "../Thread/Thread";

export function ThreadList({_Thread = Thread, _useSelector = useSelector}) {

  const threads = _useSelector((state) => state.threads)


  // renders each item in the threads array. .reverse() so they display newest to oldest
  return <>
    <div>
      {
        threads.reverse().map((thread, idx) => {
          return <div className={"mt-4"} key={idx}>
            <_Thread thread={thread}/>
          </div>
        })
      }
    </div>
    </>
}