import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `${process.env.HOST}/api/applyAllRecommendation`
})

export default ApplyAllRecommendation