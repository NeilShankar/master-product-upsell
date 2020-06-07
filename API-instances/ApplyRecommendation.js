import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation