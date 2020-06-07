import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation