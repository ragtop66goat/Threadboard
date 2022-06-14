import {useSelector, useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {Card} from "react-bootstrap";
import {ON_SUBMIT_POST, ON_SET_POST_CONTENT, ON_CANCEL} from "../../modules/threads";

export function PostInput({_uuidv4 = uuidv4, _useSelector = useSelector, _useDispatch = useDispatch}) {

  const threads = _useSelector((state) => state.threads)
  // brought in to link post to parent thread. Set with Post btn in Post
  const postToId = _useSelector((state) => state.postToId)
  const foundThread = threads.find((thread) => thread.id === postToId)
  const postContent = _useSelector((state) => state.postContent)
  // brought in to decide if post is being edited
  const postId = _useSelector((state) => state.id)
  const dispatch = _useDispatch()

  function postContentChange(e) {
    dispatch({type: ON_SET_POST_CONTENT, value: e.target.value})
  }

  function onSubmitPost() {
    let id;
    // creates new Id if new post
    if(!postId){
      id = _uuidv4()
    } else {
      id = postId
    }
    const date = new Date().toString().substring(0, 15)
    dispatch({type: ON_SUBMIT_POST, value: {date, id}})
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
        <button className={"btn-success btn-sm m-2"} onClick={onSubmitPost}>Post</button>
        <button className={"btn-danger btn-sm"} onClick={()=>dispatch({type: ON_CANCEL})}>Cancel</button>
      </div>
    </Card>
  </div>
}