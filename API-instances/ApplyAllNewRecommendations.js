import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation