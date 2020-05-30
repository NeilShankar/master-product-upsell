import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation