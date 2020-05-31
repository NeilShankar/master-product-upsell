import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance