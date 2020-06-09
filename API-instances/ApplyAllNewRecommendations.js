import axios from 'axios'

const ApplyAllNewRecommendation = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/applyAllNewRecommendation`
})

export default ApplyAllNewRecommendation