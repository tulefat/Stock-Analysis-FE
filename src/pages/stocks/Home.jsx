import {useState, useEffect} from "react"
import{useNavigate} from "react-router-dom"
import Search from "../../components/stocks/Search"
import Stock from "../../components/stocks/Stock"
import { GetStocks,SearchStocks,CreateStock,GetCashFlow,GetSharesOutstanding,GetStockPrice } from "../../services/api/Stocks.api"
import "../../assets/styles/stocks.css"

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
      symbol:stock.symbol, name:stock.name,
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
  <div className="sa-stocks-page">
        <div className="sa-stocks-wrap">
          <div className="sa-stocks-header">
        <div>
          <h1 className="sa-stocks-title">Stocks</h1>
          <p className="sa-stocks-subtitle">
            Search stocks, save them, then open analysis to compute intrinsic value (10-cap) and track them later.
          </p>
        </div>


      </div>
            <div className="sa-panel sa-fade-in">
        <div className="sa-search">
<Search value={searchQuery} onChange={handleChange} onSubmit={getSearchResults} />
        </div>
      </div>

{searched && (
          <div className="sa-section sa-fade-in">

          <h1 className="sa-section-title">
            Search Results <span>{searchResults.length}</span>
          </h1>
            <div className="sa-panel sa-panel--tight">
                        <section className="search-results sa-grid">
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
        </div>
      )}

   <div className="sa-section sa-fade-in">
         <h2 className="sa-section-title">
          Stocks <span>{stocks.length}</span>
        </h2>
              <div className="sa-panel sa-panel--tight">
                  <section className="sa-grid">

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
</div>
</div>
)
}

export default Home
