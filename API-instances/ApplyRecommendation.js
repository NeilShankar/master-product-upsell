import axios from 'axios'

const ApplyRecommendation = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/applyRecommendation`
})

export default ApplyRecommendation