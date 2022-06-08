import {useSelector} from "react-redux";
import {Thread} from "../Thread/Thread";

export function ThreadList({_Thread = Thread, _useSelector = useSelector}) {

  const threads = _useSelector((state) => state.threads)

  return <>
    <div className={"d-flex justify-content-center"}>
      <h1>Threadboard</h1>
    </div>
    <div>
      {
        threads.map((thread, idx) => {
          return <div className={"mt-4"} key={idx}>
            <_Thread thread={thread}/>
          </div>
        })
      }
    </div>
    </>
}