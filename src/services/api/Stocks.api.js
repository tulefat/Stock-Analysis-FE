import Client from "../api";

export const SearchStocks = async (query) => {
  const res = await Client.get(`/stocks/search?q=${query}`)
  return res.data
}


export const GetStocks = async () => {
  const res = await Client.get("/stocks")
  return res.data
}


export const CreateStock = async (data) => {
  const res = await Client.post("/stocks", data)
  return res.data
}

export const GetCashFlow = async (symbol) => {
  const res = await Client.get(`/stocks/${symbol}/cashflow`)
  return res.data
}


export const GetSharesOutstanding = async (symbol) => {
  const res = await Client.get(`/stocks/${symbol}/sharesOutstanding`)
  return res.data
}

export const GetStockPrice = async (symbol) => {
  const res = await Client.get(`/stocks/${symbol}/price`)
  return res.data
}
