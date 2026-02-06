import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetStocks } from "../../services/api/Stocks.api"


const Feed = ({ user }) => {
  const navigate = useNavigate()
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    const obtainStocks = async () => {
      try {
        const data = await GetStocks()
        setStocks(data)
      } catch (error) {
        console.log("Failed to load stocks", error)
      }
    }

    obtainStocks()
  }, [])

  if (!user) {
    return (
      <div className="protected">
        <h3> You must be signed in to do that </h3>
        <button onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <h2>Stocks Overview</h2>

        <button onClick={() => navigate("/stocks")}>
          Go To Stocks
        </button>
      
      {stocks.length === 0 ? (
        <p>No stocks available</p>
      ) : (
        <div >
          {stocks.map((stock) => (
            <div key={stock._id}>
              <h3>{stock.symbol}</h3>
              <p>{stock.name}</p>



              <button onClick={() => navigate(`/analysis/${stock.symbol}`)}>
                View analysis
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Feed
