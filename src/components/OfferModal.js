import React, {useState} from 'react'
import Modal from 'components/Modal'
import {createRef, createOffer} from 'actions'
import {useToasts} from 'react-toast-notifications'
const OfferModal = ({job, auth}) =>{
    const {addToast} = useToasts()

    const [offer, setOffer] = useState({
        fromUser: '',
        toUser: '',
        job: '',
        status: 'pending',
        price: 0,
        time: 0,
        note: ''
    })

    const handleChange = ({target: {value, name}}) => {
        if(name === 'time'){
            const price = Math.round(value * job.price*100)/100
            return setOffer({...offer, [name]:value, price})
        }
        return setOffer({...offer, [name]:value})
    }

    const handleSubmit = (closeModal) => {
        const myOffer = {...offer}

        myOffer.fromUser = createRef('users', auth.user.uid)
        myOffer.toUser = createRef('users', job.user.uid)
        debugger
        myOffer.job = createRef('jobs', job.id)
        myOffer.time = parseInt(offer.time, 10)
        createOffer(myOffer)
        .then(_ => {
            closeModal()
            addToast('Offer was successfully created!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
        }, (error) => {
            console.log(error)
        })
    }

    return (<Modal onModalSubmit = {handleSubmit}>
        <div className="field">
            <input
                onChange={handleChange}
                name="note"
                className="input is-large"
                type="text"
                placeholder="Note for author"
                max="5"
                min="0"/>
            <p className="help">Note can increase chance of getting the service</p>
            </div>
            <div className="field">
            <input
                onChange={handleChange}
                name="time"
                className="input is-large"
                type="number"
                placeholder="How long you need service for ?"
                max="5"
                min="0"/>
            <p className="help">Enter time in hours</p>
            </div>
            <div className="job-price has-text-centered">
            <div className="job-price-title">
            {job.user && `Uppon acceptance youu will be charged:`}
            </div>
            <div className="job-price-value">
            <h1 className="title">{offer.price}$</h1>
            </div>
            </div>
            </Modal>)

}

export default OfferModal