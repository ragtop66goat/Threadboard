
export function Thread({thread}) {
  return <div className={"card"}>
    <div className={"card-header"}>
      <div>{thread.owner}</div>
      <div>{thread.date}</div>
    </div>
    <div className={"card-body"}>
      <h5 className={"card-title"}>{thread.title}</h5>
      <p className={"card-text"}>{thread.content}</p>
    </div>
  </div>
}