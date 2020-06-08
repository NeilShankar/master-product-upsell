import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance