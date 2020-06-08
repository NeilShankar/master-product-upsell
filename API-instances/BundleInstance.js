import axios from 'axios'

const BundleInstance = axios.create({
  baseURL: `${process.env.HOST}/api/saveBundleInfo`
})

export default BundleInstance