import db from 'database'

export const createRef = (collection, docId) => db.doc(`${collection}/` + docId)

export * from './auth'
export * from './jobs'
export * from './offer'
export * from './collaboration'
export * from './connection'