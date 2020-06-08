import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance