import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance