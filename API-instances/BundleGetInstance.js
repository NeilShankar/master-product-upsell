import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance