import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation