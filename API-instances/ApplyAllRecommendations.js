import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation