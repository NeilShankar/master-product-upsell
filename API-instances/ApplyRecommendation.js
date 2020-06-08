import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `${process.env.HOST}/api/applyRecommendation`
})

export default ApplyRecommendation