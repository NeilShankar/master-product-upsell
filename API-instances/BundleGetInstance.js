import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance