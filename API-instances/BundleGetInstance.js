import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/getBundleInfo`
})

export default GetBundleInstance