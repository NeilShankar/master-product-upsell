import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount