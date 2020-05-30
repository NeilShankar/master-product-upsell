import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation