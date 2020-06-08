import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable