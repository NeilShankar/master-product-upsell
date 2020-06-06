import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation