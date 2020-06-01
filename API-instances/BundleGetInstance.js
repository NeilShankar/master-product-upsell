import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance