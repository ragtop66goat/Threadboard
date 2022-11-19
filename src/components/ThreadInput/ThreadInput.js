import {useSelector, useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {ON_SUBMIT_THREAD, ON_SET_ID, ON_SET_THREAD_CONTENT, ON_SET_THREAD_TITLE} from "../../modules/threads";
import {useRef} from "react";

export function ThreadInput(props) {

  let {
    _useSelector = useSelector,
    _useDispatch = useDispatch,
    _uuidv4 = uuidv4
  } = props;

  const threadId = _useSelector((state) => state.id);
  const dispatch = _useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();

  function submitThread() {
    let id;
    // assigns new Id if it is not an edit
    if (!threadId) {
      id = _uuidv4();
    } else {
      id = threadId;
    }
    dispatch({type: ON_SET_THREAD_TITLE, value: titleRef.current.value})
    dispatch({type: ON_SET_THREAD_CONTENT, value: contentRef.current.value})
    dispatch({type: ON_SET_ID, value: id});
    const date = new Date().toString().substring(0, 15);
    dispatch({type: ON_SUBMIT_THREAD, value: date});
  }

  //conditional styling/text elements
  const setHeader = threadId ? "Edit Thread" : "Post Thread?";
  const setBtnColor = threadId ? "info" : "success";
  const setBG = threadId ? "light" : "white";
  const setBTN = threadId ? "Submit Edit" : "Submit";


  return <>
    <div>
      <h1 className={"text-center bg-dark bg-opacity-75 text-white border rounded p-2"}>Threadboard</h1>
    </div>
    <div className={`d-flex flex-column shadow p-3 mb-5 bg-${setBG} rounded p-2`}>
      <h4>{setHeader}</h4>
      <input ref={titleRef} type={'text'} placeholder={'Title'}/>
      <input ref={contentRef} type={'text'} className={'mt-3'} placeholder={'content'}/>
      <button className={`btn-sm btn-${setBtnColor} w-25 mt-2`} onClick={submitThread}>{setBTN}</button>
    </div>

  </>;
}