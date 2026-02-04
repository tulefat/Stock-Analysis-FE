import Client from "../api";


export const CreateAnalysis = async (data) => {
  const res = await Client.post("/analysis", data)
  return res.data
}

export const GetAnalysisByUser = async (userId) => {
  const res = await Client.get('/analysis/${userId}')
  return res.data
}

export const UpdateAnalysis = async (analysisId,data) => {
  const res = await Client.put('/analysis/${analysisId}', data)
  return res.data
}
