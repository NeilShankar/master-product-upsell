import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance