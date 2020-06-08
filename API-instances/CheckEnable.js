import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled