import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation