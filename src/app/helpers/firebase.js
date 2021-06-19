// import fadmin from 'firebase-admin'
// import path from 'path'
// import serviceAccount from './cokitchen-312312-d3cc6d60550e.json'

// fadmin.initializeApp({
//   credential: fadmin.credential.cert(serviceAccount)
// })

// const db = fadmin.firestore()

// const pendingOrdersDb = db.collection('pending_orders')

// const trackingOrdersDb = db.collection('tracking_orders')

// export const setPendingOrder = async order => {
//   const new_pending_order = pendingOrdersDb.doc(order.id)
//   console.log(order)
//   await new_pending_order.set(JSON.parse(JSON.stringify(order)))
//   return true
// }

// export const deletePendingOrder = async order => {
//   const new_pending_order = pendingOrdersDb.doc(order.id)
//   console.log(order)
//   await new_pending_order.delete()
//   return true
// }

// export const setTrackingOrder = async data => {
//   const new_tracking_order = trackingOrdersDb.doc(data.id)
//   new_tracking_order.get().then(async function (thisDoc) {
//     if (thisDoc.exists) {
//       await new_tracking_order.update(JSON.parse(JSON.stringify(data)))
//     } else {
//       console.log('not exists')
//       await new_tracking_order.set(JSON.parse(JSON.stringify(data)))
//     }
//   })
//   return true
// }
