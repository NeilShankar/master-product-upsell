import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation