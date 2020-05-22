import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance