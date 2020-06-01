import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable