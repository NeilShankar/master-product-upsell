import axios from 'axios'

const BundleEnable = axios.create({
  baseURL: `${process.env.HOST}/api/bundlesEnabled`
})

export default BundleEnable