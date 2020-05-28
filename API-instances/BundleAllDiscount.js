import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount