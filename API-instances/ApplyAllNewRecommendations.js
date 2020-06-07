import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation