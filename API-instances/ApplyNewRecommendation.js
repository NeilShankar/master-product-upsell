import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation