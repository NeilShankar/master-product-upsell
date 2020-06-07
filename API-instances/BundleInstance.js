import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance