export function Message({message}) {

  return<div>
    <h5>{message.owner.username} <small>{message.date}</small></h5>
    <div>
      <p>{message.message}</p>
    </div>
    </div>

}