import fadmin from 'firebase-admin'
import path from 'path'
import serviceAccount from './cokitchen-312312-d3cc6d60550e.json'

fadmin.initializeApp({
  credential: fadmin.credential.cert(serviceAccount)
})

const db = fadmin.firestore()

const pendingOrdersDb = db.collection('pending_orders')

const trackingOrdersDb = db.collection('tracking_orders')

export const setPendingOrder = async order => {
  const new_pending_order = pendingOrdersDb.doc(order.id)
  console.log(order)
  await new_pending_order.set(JSON.parse(JSON.stringify(order)))
  return true
}

export const setTrackingOrder = async data => {
  const new_tracking_order = trackingOrdersDb.doc(data.id)
  await new_tracking_order.set(data, { merge: true })
  return true
}
