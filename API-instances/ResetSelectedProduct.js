import axios from 'axios'

const ResetProducts = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/resetProducts`
})

export default ResetProducts