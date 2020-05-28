import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/saveBundleInfo`
})

export default BundleInstance