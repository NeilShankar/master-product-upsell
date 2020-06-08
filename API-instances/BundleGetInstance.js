import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `${process.env.HOST}/api/getBundleInfo`
})

export default GetBundleInstance