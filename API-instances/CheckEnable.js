import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/enabledCheck`
})

export default CheckBundleEnabled