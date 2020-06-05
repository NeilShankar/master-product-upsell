import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable