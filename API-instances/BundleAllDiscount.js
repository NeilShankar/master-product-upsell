import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `${process.env.HOST}/api/discountBundleAll`
})

export default BundleAllDiscount