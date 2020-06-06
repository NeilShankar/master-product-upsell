import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled