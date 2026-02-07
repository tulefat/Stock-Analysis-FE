import {useState, useEffect} from "react"
import{useNavigate, useParams} from "react-router-dom"

import { GetStocks } from "../../services/api/Stocks.api"

import { CreateAnalysis, GetAnalysisByUser, UpdateAnalysis } from "../../services/api/Analysis.api"

const Analysis = ({ user }) => {
    const navigate = useNavigate()
    const {symbol} = useParams()


    const [stock,setStock] =useState(null)
    const [analysis,setAnalysis] = useState(null)
    const [capexFactor, setCapexFactor] = useState(0.5)
}

const [ownerEarnings, setOwnerEarnings] = useState(0)
const [fairValue10cap,setFairValue10Cap] = useState(0)
const [percentDifferent,setPercentDifferent] = useState(0)
const [status,setStatus] = useState("fair")

const calculationStatus = (percentDifferent) => {
  if (percentDifferent>10) return "undervalued"
  if (percentDifferent) return "overvalued"
  else return "fair"
}

useEffect (()=>{
  const displayStock = async () => {
    try {
      const result = await GetStocks().find((ticker)=> (ticker.symbol).toUpperCase())
      setStock(result)}
      catch (error) {
        console.log("Failed to load the stock",error)
      }}

      displayStock()},[symbol])

useEffect(()=>{
  const ownerEarnings = Number(stock.operatingCashFlow) - capexFactor * Math.abs(Number(stock.capitalExpenditure))

  const fairValue10Cap = (ownerEarnings/Number(stock.outstandingShares)) * 10

  const percentDifferent = ((fairValue10Cap - Number(stock.price))/Number(stock.price)) * 100

  setOwnerEarnings(ownerEarnings)
  setFairValue10Cap(fairValue10Cap)
  setPercentDifferent(percentDifferent)
  setStatus(calculationStatus(percentDifferent))
}, [stock,capexFactor])

const runAnalysis = async ()=> {
  try {if (!stock) return

    const factorNumber = Number(capexFactor)

    if(isNaN(factorNumber)=== true) {
      return
    }
    if (analysis) {
      const update = await UpdateAnalysis(analysis._id,{
        userId: user.id,
        capexFactor: factorNumber,
      })
      setAnalysis(update)
      setCapexFactor(update.capexFactor)
    } else {
      const create = await CreateAnalysis({
        stockId: stock._id,
        capexFactor: factorNumber
      })
      setAnalysis(create)
      setCapexFactor(create.capexFactor)
    }
  } catch (error) {
    console.log("Analysis Failed")
  }
  }

  if (!user) {
    return (
      <div>
      <h2> You must signed in </h2>
      <button onClick={()=> navigate ("/signin")}>Sign In </button>
      </div>
    )
  }

  if (!stock) {
    return (
      <div>
<h2>Analysis</h2>
<p>Stock not found in the saved list.</p>
<button onClick={()=> navigate ("/stocks")}>Back to stock search  </button>

      </div>

    )
  }

  return (
    <div className="analysis">
      <h1> Analysis: {stock.symbol}</h1>
      <p>{stock.name}</p>

      <div className="analysis-card">
        <h3> Stock fundamentals</h3>
        <p>Price: {Number(stock.price)}</p>
        <p>Operating Cash Flow: {Number(stock.operatingCashFlow)}</p>
        <p>Capital Expenditure: {Number(stock.capitalExpenditure)}</p>
        <p>Outstanding Shares: {Number(stock.outstandingShares)}</p>
      </div>
      <div className="analysis-card">
        <h3>Capex Factor</h3>
        <input
        type="number"
        step="0.1"
        value={capexFactor}
        />
        <button onClick={runAnalysis}>
          {analysis ? "Update Analysis" : "Run Analysis"}

        </button>
      </div>
      <div className="analysis-card">
        <h3> 10 Cap Calculations</h3>
        <p>Owner Earnings: {ownerEarnings}</p>
        <p>Fair Value (10 Cap) : {fairValue10cap}</p>
        <p>% Difference: {percentDifferent}</p>
        <p>Status: {status} </p>

      </div>
      {analysis && (
        <div className="analysis-card">
          <h3>Saved Analysis </h3>
          <p>capexFactor: {analysis.capexFactor}</p>
          <p>analysis price: {Number(analysis.analysisPrice)}</p>
          <p>Fair Value 10 Cap : {Number(analysis.fairValue10Cap)}</p>
          <p>percentDifferent: {Number(analysis.percentDifferent)}</p>
          <p>status: {Number(analysis.status)}</p>
    </div>
      )}
      <button onClick={()=> navigate ("/stocks")}>Back to Stocks </button>
      </div>
  )
  export default Analysis
