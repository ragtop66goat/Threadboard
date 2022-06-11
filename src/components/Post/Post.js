import {useDispatch, useSelector} from "react-redux";
import {ON_DELETE_POST, ON_EDIT_POST} from "../../modules/threads";

export function Post({post, _useSelector = useSelector, _useDispatch = useDispatch}) {

  const currentUser = _useSelector((state) => state.currentUser.username)
  const dispatch = _useDispatch()

  if (post.owner === currentUser)
    return (<>
        <h6 key={post.id}>{post.content}</h6>
        <button onClick={()=>dispatch({type: ON_DELETE_POST, value: post.id})}>Delete</button>
        <button onClick={()=>dispatch({type: ON_EDIT_POST, value: post.id})}>Edit</button>
      </>
    )
  return <h6 key={post.id}>{post.content}</h6>


}