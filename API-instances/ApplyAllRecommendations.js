import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/applyAllRecommendation`
})

export default ApplyAllRecommendation