import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance