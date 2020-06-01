import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled