import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation