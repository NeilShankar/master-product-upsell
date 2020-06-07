import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation