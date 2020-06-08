import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `${process.env.HOST}/api/enabledCheck`
})

export default CheckBundleEnabled