import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount