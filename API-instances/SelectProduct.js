import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/selectProduct`
})

export default SelectProduct