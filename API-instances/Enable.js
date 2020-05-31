import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/bundlesEnabled`
})

export default BundleEnable