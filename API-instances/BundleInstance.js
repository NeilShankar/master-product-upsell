import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance