import {Card} from "react-bootstrap";

export function Message({message}) {

  return<div>
    <Card className={"p-2"} style={{maxWidth: "20rem", minWidth: "15rem"}}>
      <div className={"card-header d-flex justify-content-between"}>
        <h5>{message.owner.username}</h5>
        <small>{message.date}</small>
      </div>
      <div>
        <p>{message.message}</p>
      </div>
    </Card>
    </div>

}