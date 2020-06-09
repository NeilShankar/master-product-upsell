import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/bundlesEnabled`
})

export default BundleEnable