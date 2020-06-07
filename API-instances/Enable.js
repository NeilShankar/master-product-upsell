import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable