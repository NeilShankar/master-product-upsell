import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation