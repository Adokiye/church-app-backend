import axios from 'axios'
import {
  POSIST_API_URL,
  POSIST_TOKEN,
  POSIST_CLIENT_ID,
  POSIST_CLIENT_NAME
} from '../config.js'

export const getPosistBrandMenu = async customerKey => {
  const sub_url = 'online_order_cloud/menu'
  console.log(POSIST_API_URL + sub_url + '?customer_key=' + customerKey)
  const response = await axios.get(
    POSIST_API_URL + sub_url + '?customer_key=' + customerKey,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + POSIST_TOKEN
      }
    }
  )
  return response
}

export const createPosistOrder = async (data, customerKey) => {
  const sub_url = 'online_order_cloud/push'
  console.log(POSIST_API_URL + sub_url + '?customer_key=' + customerKey)
  data.source.name = POSIST_CLIENT_NAME
  data.source.id = POSIST_CLIENT_ID
  console.log(data)
  console.log(data.items[0].addOns)
  const response = await axios.post(
    POSIST_API_URL + sub_url + '?customer_key=' + customerKey,
    data,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + POSIST_TOKEN
      }
    }
  )
  console.log(response)
  return response
}
