import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation