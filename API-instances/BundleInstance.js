import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance