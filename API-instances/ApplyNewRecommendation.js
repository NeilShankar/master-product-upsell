import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation