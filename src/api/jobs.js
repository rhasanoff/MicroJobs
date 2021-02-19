import db from 'database'
import { createRef } from './index'

export const createJob = newJob => {
    return db.collection('jobs')
      .add(newJob)
      .then(doc => doc.id)
  }
  
export const getUserJobs = userId =>{
    const userRef = createRef('users', userId)
    return db.collection('jobs')
    .where("user", "==", userRef)
    .get()
    .then(snapshot => {
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return jobs
    })
  }

export const getJobById = jobId => 
  db.collection('jobs')
    .doc(jobId)
    .get()
    .then(snapshot => ({id: snapshot.id, ...snapshot.data()}))