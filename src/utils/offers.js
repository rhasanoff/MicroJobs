import {Timestamp} from 'database'
export const newCollaboration = ({offer: {job, time, toUser, id}, fromUser}) => ({
    jobId: job.id,
    title: job.title,
    image: job.image,
    time: time*60*60,
    allowedPeople: [fromUser.uid, toUser.uid],
    joinedPeople: [],
    toUser: toUser.uid,
    fromUser: fromUser.uid,
    fromOffer: id,
    status: 'pending',
    createdAt: Timestamp.fromDate(new Date())
})

export const newMessage = ({offer: {job, toUser}, fromUser}) => ({
    isRead: false,
    type: 'invitation',
    text: `Hello ${toUser.fullName}, please join collaboration asap!`,
    click: '',
    toUser: toUser.uid,
    fromUser: {
        name: fromUser.fullName,
        avatar: fromUser.avatar
    },
    jobTitle: job.title,
    jobLink: `/jobs/${job.id}`,
    createdAt: Timestamp.fromDate(new Date())
})