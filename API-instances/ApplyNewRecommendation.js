import axios from 'axios'

const ApplyNewRecommendation = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/applyNewRecommendation`
})

export default ApplyNewRecommendation