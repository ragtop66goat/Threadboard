import {useDispatch, useSelector} from "react-redux";
import {ON_DELETE_POST, ON_EDIT_POST} from "../../modules/threads";

export function Post({post, _useSelector = useSelector, _useDispatch = useDispatch}) {

  const currentUser = _useSelector((state) => state.currentUser.id)
  const dispatch = _useDispatch()

  if (post.owner === currentUser)
    // Delete and Edit buttons render if currentUser is the owner
    return (<>
        <div className={"d-flex"}>
          <h5 style={{marginRight: "0.5rem"}}>{post.ownerName}</h5>
          <p>{post.date}</p>
        </div>
        <h6 key={post.id}>{post.content}</h6>
        <div>
          <button className={"btn-sm m-1 btn-danger"} onClick={()=>dispatch({type: ON_DELETE_POST, value: post.id})}>Delete</button>
          <button className={"btn-sm m-1 btn-info"} onClick={()=>dispatch({type: ON_EDIT_POST, value: post.id})}>Edit</button>
        </div>
      </>
    )
  //if curretnUser not the owner of the post only the post renders
  return<>
    <div className={"d-flex"}>
      <h5 style={{marginRight:"0.5rem"}}>{post.ownerName}</h5>
      <p>{post.date}</p>
    </div>
    <h6 key={post.id}>{post.content}</h6>
  </>


}