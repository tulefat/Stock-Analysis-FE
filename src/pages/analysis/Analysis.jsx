import {useState, useEffect} from "react"
import{useNavigate, useParams} from "react-router-dom"

import { GetStocks } from "../../services/api/Stocks.api"

import { CreateAnalysis, GetAnalysisByUser, UpdateAnalysis } from "../../services/api/Analysis.api"

const Analysis = ({ user }) => {
    const navigate = useNavigate()
    const {symbol} = useParams


    const [stock,setStock] =useState(null)
    const [analysis,setAnalysis] = useState(null)
    const [capexFactor, setCapexFactor] = useState(0.5)
}
