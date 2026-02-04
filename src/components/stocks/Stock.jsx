const Stock = (props) => {
  return (
    <div className="card stock" onClick={props.onClick}>
    <div className="info-wrapper flex-col">
      <h3>{props.symbol}</h3>
      <h2>{props.name}</h2>
    </div>

    </div>
  )
}

export default Stock
