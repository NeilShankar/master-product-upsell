import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation