import axios from 'axios'

const url = process.env.HOST + '/api/checkUpdatesEnable'

const CheckBundleUpdateEnabled = axios.create({
  baseURL: url
})

export default CheckBundleUpdateEnabled