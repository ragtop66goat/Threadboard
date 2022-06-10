import {useSelector} from "react-redux";

export function Post({post, _useSelector = useSelector}) {
  const currentUser = _useSelector((state) => state.currentUser.username)

      if(post.owner === currentUser)
      return(<>
      <h6 key={post.id}>{post.content}</h6>
      <button>Delete</button>
      <button>Edit</button>
      </>
      )
      return <h6 key={post.id}>{post.content}</h6>


}