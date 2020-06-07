import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount