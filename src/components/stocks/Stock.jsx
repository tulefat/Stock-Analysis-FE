const Stock = ({symbol, name, onClick, website, description, sector, image }) => {
  return (

    <div className="card stock" onClick={onClick}>
    <div className="info-wrapper flex-col">
      {image && (
        <img
         src={image}
         alt={name}
         style={{ width: "80px",
         display: "block"
         }} />
        )}
      <h3>{symbol}</h3>
      <h2>{name}</h2>
      <h1>{description}</h1>
      <h3>{sector}</h3>
      <p>
        <a href={website}>{website}</a>
        </p>

    </div>

    </div>
  )
}

export default Stock
