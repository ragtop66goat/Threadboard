
export function Message({message}) {

  return<>
      <h5>{message.date}</h5>
    <h4>{message.owner.username}</h4>
    <p>{message.message}</p>
    </>

}