import axios from 'axios'

const CheckBundleEnabled = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/enabledCheck`
})

export default CheckBundleEnabled