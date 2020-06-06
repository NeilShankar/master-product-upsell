import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount