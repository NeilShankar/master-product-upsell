import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `${process.env.HOST}/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation