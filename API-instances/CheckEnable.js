import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled