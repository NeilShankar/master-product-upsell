import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation