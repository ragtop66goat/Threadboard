import {useSelector, useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {Card} from "react-bootstrap";
import {ON_SUBMIT_POST, ON_SET_POST_CONTENT} from "../../modules/threads";

export function PostInput({_useSelector = useSelector, _useDispatch = useDispatch}) {

  const threads = _useSelector((state) => state.threads)
  const postToId = _useSelector((state) => state.postToId)
  const foundThread = threads.find((thread) => thread.id === postToId)
  const postContent = _useSelector((state) => state.postContent)
  const postId = _useSelector((state) => state.id)
  const dispatch = _useDispatch()

  function postContentChange(e) {
    dispatch({type: ON_SET_POST_CONTENT, value: e.target.value})
  }

  function onSubmitPost() {
    let id;
    if(!postId){
      id = uuidv4()
    } else {
      id = postId
    }
    const date = new Date().toDateString().substring(0, 10)
    dispatch({type: ON_SUBMIT_POST, value: date, id})
  }
  return <div>
    <Card>
      <div className={"card-header"}>
        <h4> Post to: {foundThread.title}</h4>
      </div>
      <div className={"card-body"}>
        <p>{foundThread.content}</p>
      </div>
      <div className={"card-footer"}>
        <input onChange={postContentChange} value={postContent}/>
        <button className={"btn-success btn-sm"} onClick={onSubmitPost}>Post</button>
      </div>
    </Card>
  </div>
}