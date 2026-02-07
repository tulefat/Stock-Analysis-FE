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
