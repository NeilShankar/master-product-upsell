import axios from 'axios'

const ApplyAllRecommendation = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/applyAllRecommendation`
})

export default ApplyAllRecommendation