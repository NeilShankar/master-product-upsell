import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled