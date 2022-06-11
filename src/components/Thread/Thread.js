import {useDispatch, useSelector} from "react-redux";
import {ON_DELETE_THREAD, ON_EDIT_THREAD, ON_SET_ADD_POST} from "../../modules/threads";
import {Post} from "../Post/Post";

export function Thread({thread, _useDispatch = useDispatch, _useSelector = useSelector, _Post = Post}) {

  const dispatch = _useDispatch()
  const currentUser = _useSelector((state) => state.currentUser.username)
  const postList = _useSelector((state) => state.postList)
  const foundPosts = postList.filter((post) => post.threadId === thread.id)

  if(thread.owner === currentUser)
  return <div className={"card"}>
    <div className={"card-header d-flex justify-content-between"}>
      <div>{thread.owner}</div>
      <div>{thread.date}</div>
    </div>
    <div className={"card-body"}>
      <h5 className={"card-title"}>{thread.title}</h5>
      <p className={"card-text"}>{thread.content}</p>
    </div>

    <div className={"card-footer"}>
      <div className={"d-flex justify-content-evenly"}>
        <button className={"btn-sm btn-info"} onClick={()=> dispatch({type: ON_EDIT_THREAD, value: thread.id})}>Edit</button>
        <button className={"btn-success btn-sm"} onClick={()=> dispatch({type: ON_SET_ADD_POST, value: thread.id})}>Post</button>
        <button className={"btn-danger btn-sm"} onClick={()=> dispatch({type: ON_DELETE_THREAD, value: thread.id})}>Delete</button>
      </div>
      <div>
        {
          foundPosts.map((post, idx) => {
            return <div key={idx}>
              <_Post post={post}/>
            </div>
          })
        }
      </div>
    </div>

  </div>

  return <div className={"card"}>
    <div className={"card-header d-flex justify-content-between"}>
      <div>{thread.owner}</div>
      <div>{thread.date}</div>
    </div>
    <div className={"card-body"}>
      <h5 className={"card-title"}>{thread.title}</h5>
      <p className={"card-text"}>{thread.content}</p>
    </div>

    <div className={"card-footer"}>
      <div className={"d-flex justify-content-evenly"}>
        <button className={"btn-success btn-sm"} onClick={()=> dispatch({type: ON_SET_ADD_POST, value: thread.id})}>Post</button>
      </div>
      <div>
        {
          foundPosts.map((post, idx) => {
            return <div key={idx}>
              <_Post post={post}/>
            </div>
          })
        }
      </div>
    </div>

  </div>
}

