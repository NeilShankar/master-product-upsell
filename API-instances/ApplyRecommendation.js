import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation