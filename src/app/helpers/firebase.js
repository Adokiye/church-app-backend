import fadmin from 'firebase-admin'
import path from 'path'
import serviceAccount from './cokitchen-312312-d3cc6d60550e.json'

fadmin.initializeApp({
  credential: fadmin.credential.cert(serviceAccount)
})

const db = fadmin.firestore()

const pendingOrdersDb = db.collection('pending_orders')

export const setPendingOrder = async order => {
  const new_pending_order = pendingOrdersDb.doc(order.id)
  const data = {}
  data.order_details = order
  console.log(order)
  await new_pending_order.set(data)
  return true
}
