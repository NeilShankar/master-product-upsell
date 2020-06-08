import axios from 'axios'

const url = process.env.HOST + '/api/updatesEnable'

const BundleUpdateEnable = axios.create({
  baseURL: url
})

export default BundleUpdateEnable