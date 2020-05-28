import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/selectProduct`
})

export default SelectProduct