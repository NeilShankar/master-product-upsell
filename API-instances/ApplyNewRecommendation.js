import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `${process.env.HOST}/api/applyNewRecommendation`
})

export default ApplyNewRecommendation