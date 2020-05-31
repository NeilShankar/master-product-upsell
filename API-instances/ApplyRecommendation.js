import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/applyRecommendation`
})

export default ApplyRecommendation