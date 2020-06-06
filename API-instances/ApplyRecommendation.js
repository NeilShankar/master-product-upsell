import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation