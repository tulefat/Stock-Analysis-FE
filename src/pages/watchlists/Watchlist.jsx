import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

import {GetStocks} from "../../services/api/Stocks.api"

import { CreateWatchlist,GetWatchlist,UpdateWatchlist,DeleteWatchlist } from "../../services/api/Watchlists.api";

import { GetAnalysisByUser } from "../../services/api/Analysis.api";

const Watchlist =({user}) => {
  const navigate = useNavigate()
  const [stocks, setStocks] = useState([])
  const [watchlist, setWatchlist] = useState([])

  const [stockId, setStockId] = useState("")
  const [decision, setDecision] = useState("Watch")
 const [analysisList, setAnalysisList] = useState([])

  const data = async () => {
    const stocksData = await GetStocks()
    setStocks(stocksData)

    const watchlistData = await GetWatchlist()
    setWatchlist(watchlistData)

    const analysisData = await GetAnalysisByUser()
    setAnalysisList(analysisData)
  }
  useEffect(()=>{
    if (user) data()
    }, [user])

    if (!user) {
      return (
        <div>
        <h3>You must be signed in </h3>
        <button onClick={()=> navigate ("/signin")}>Sign In </button>
        </div>
      )
    }

    const addItem = async (e) => {
      e.preventDefault()
      await CreateWatchlist ({
        stockId,
        decision
      })

      setStockId("")
      setDecision("Watch")
      data()
      navigate("/watchlist")
    }
 const changeDecision = (itemId,newDecision) => {
  const update = watchlist.map((watch) => ( watch._id === itemId ? {...watch, decision: newDecision} : watch
))
  setWatchlist(update)
 }

 const saveDecision = async (itemId,newDecision) => {
  await UpdateWatchlist (itemId, {decision:newDecision})
  data()
 }

const removeItem = async (itemId) => {
  await DeleteWatchlist (itemId)
  data()
}
return (
  <div>
    <h1> Watchlist </h1>
    <form onSubmit={addItem}>
    <label> Stock: </label>
    <select value={stockId}
    onChange={(e)=> setStockId(e.target.value)}> <option value =""> -- Select -- </option>
    {stocks.map((stock) => (
      <option key={stock._id} value={stock._id}>
        {stock.symbol} - {stock.name}
      </option>
    ))}
      </select>
     <label>Decision :</label>
     <select
     value={decision}
     onChange={(e)=> setDecision(e.target.value)}>

      <option value="Watch">Watch</option>
      <option value="Buy">Buy</option>
      <option value="Sell">Sell</option>
     </select>

    <button type="submit">
      Add
    </button>
    </form>

    {watchlist.map((item)=> {

 const analysis = analysisList.find((ticker) => ticker.stockId === item.stockId._id)


    return (

      <div key={item._id}>
        <h3>{item.stockId.symbol} - {item.stockId.name} </h3>


      {analysis && (
        <div className="analysis-card">
          <p>analysis price: {Number(analysis.analysisPrice)}</p>
          <p>Fair Value 10 Cap : {Number(analysis.fairValue10Cap)}</p>
          <p>status: {analysis.status}</p>
          </div>
        )}

        <select
        value ={item.decision}
        onChange={(e)=> changeDecision(item._id,e.target.value)}>
      <option value="Watch">Watch</option>
      <option value="Buy">Buy</option>
      <option value="Sell">Sell</option>

        </select>
        <button onClick={()=> saveDecision(item._id, item.decision)}>
          save
        </button>
        <button onClick={()=> removeItem(item._id)}>
          Delete
        </button>
      </div>
    )
    })}
</div>
)
}

export default Watchlist



