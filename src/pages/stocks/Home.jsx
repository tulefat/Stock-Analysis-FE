import {useState, useEffect} from "react"
import{useNavigate} from "react-router-dom"
import Search from "../components/Search"
import Stock from "../components/Stock"
import { GetStocks,SearchStocks,CreateStock } from "../../services/api/Stocks.api"

const Home = () => {
  const navigate = useNavigate()
  const[stocks,setStocks] = useState([])
  const [searchResults,setSearchResults]= useState([])
  const [searched,toggleSearched] = useState(false)
  const[searchQuery,setSearchQuery]=useState("")
  const displayStocks = async ()=> {
    const response = await GetStocks()
    setStocks(response)
  }
  const getSearchResults = async (e) => {e.preventDefault()

    const response = await SearchStocks(searchQuery)

    const result = Array.isArray(response)

    setSearchResults(result)
    toggleSearched(true)
    setSearchQuery("")
  }

  const handleChange=(event) =>{
    setSearchQuery(PerformanceEventTiming.target.value)
  }

  const saveStock=async (stock) =>{
    const data ={
      symbol:stock.symbol, name:stock.name,
    }

    await CreateStock(data)
    await GetStocks()
  }

const analysis = (stock) => {
  navigate('/analysis/${stock.symbol}')
}

useEffect(() => {
  GetStocks()
},[])

return (
  <div>
<Search value={searchQuery} onChange={handleChange} onSubmit={getSearchResults} />

{searched && (
  <div className="search">
    <h1> Search Results</h1>
    <section className="search-results container-grid">
   {searchResults.map((data,index)=>(
    <Stock
    key={data.id}
    symbol={data.symbol}
    name={data.name}
    onClick={()=>Stock(data)}
    />
   ))}

    </section>

  </div>
)}

<div className="stocks">
<h2> Saved Stocks</h2>

<section className="container-grid">
  {stocks.map((stock) => (
    <Stock
    key={stock.id}
    symbol={stock.symbol}
    name={stock.name}
    onClick={()=>analysis(stock)}
    />
  ))}
</section>
  </div>
  <div>Test</div>
</div>
)}

export default Home
