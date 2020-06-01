import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance