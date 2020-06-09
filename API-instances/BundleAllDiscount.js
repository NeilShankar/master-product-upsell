import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/discountBundleAll`
})

export default BundleAllDiscount