import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/saveBundleInfo`
})

export default BundleInstance