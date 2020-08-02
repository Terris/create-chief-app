import { firebaseAdmin } from '../lib/firebase/admin'

export const users = () => {
  return firebaseAdmin
    .database()
    .ref('users')
    .once('value')
    .then((snap) => snap.val())
    .then((val) => val)
}
