import Client from "../api";


export const CreateWatchlist = async (data) => {
  const res = await Client.post("/watchlist", data)
  return res.data
}

export const GetWatchlist = async () => {
  const res = await Client.get("/watchlist")
  return res.data
}

export const UpdateWatchlist = async (watchlistId,data) => {
  const res = await Client.put(`/watchlist/${watchlistId}`, data)
  return res.data
}

export const DeleteWatchlist = async (watchlistId) => {
  const res = await Client.delete(`/watchlist/${watchlistId}`)
  return res.data
}
