import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable