import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/applyNewRecommendation`
})

export default ApplyNewRecommendation