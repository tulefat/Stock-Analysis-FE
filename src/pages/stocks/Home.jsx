import {useState, useEffect} from "react"
import{useNavigate} from "react-router-dom"
import Search from "../../components/stocks/Search"
import Stock from "../../components/stocks/Stock"
import { GetStocks,SearchStocks,CreateStock,GetCashFlow,GetSharesOutstanding,GetStockPrice } from "../../services/api/Stocks.api"

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
    setSearchResults(response)
    toggleSearched(true)
    setSearchQuery("")
  }

  const handleChange=(event) =>{
    setSearchQuery(event.target.value)
  }

  const saveStock=async (stock) =>{
    try {
      const symbol = stock.symbol
      const data =
      {
      symbol:symbol, name:stock.name,
    }

    await CreateStock(data)
    await GetCashFlow(symbol)
    await GetSharesOutstanding(symbol)
    await GetStockPrice(symbol)
    await displayStocks()
    toggleSearched(false)
    setSearchResults([])
  } catch (error) { console.log ("error saving stock", error)}
}

const analysis = (stock) => {
  navigate(`/analysis/${stock.symbol}`)
}

useEffect(() => {
  displayStocks()
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
    key={data.symbol}
    symbol={data.symbol}
    name={data.name}
    onClick={()=>saveStock(data)}
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
    key={stock._id}
    symbol={stock.symbol}
    name={stock.name}

    website={stock.website}
    description={stock.description}
    sector={stock.sector}
    image={stock.image}

    onClick={()=>analysis(stock)}
    />
  ))}
</section>
  </div>
</div>
)
}

export default Home
