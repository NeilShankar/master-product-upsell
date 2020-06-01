import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation