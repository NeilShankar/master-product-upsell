import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount