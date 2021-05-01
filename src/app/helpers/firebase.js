import fadmin from 'firebase-admin';
import path from 'path'
import serviceAccount from './cokitchen-312312-d3cc6d60550e'

fadmin.initializeApp({
    credential: fadmin.credential.cert(serviceAccount)
   });

const db = fadmin.firestore();

const pendingOrdersDb = db.collection('pending_orders'); 

export const setPendingOrder = async order => {
    const new_pending_order = pendingOrdersDb.doc(order.id); 
    await new_pending_order.set(order);
    return true
}