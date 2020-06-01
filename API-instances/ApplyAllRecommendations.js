import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation