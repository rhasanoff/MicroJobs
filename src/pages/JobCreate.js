import React, { useState } from 'react'
import authorization from 'components/helpers/authorization'
import { createJob } from 'actions'
import { Redirect } from 'react-router-dom'

const JobCreate = ({auth}) => {

    const [redirect, setRedirect] = useState(false)

    const [ jobForm, setJobForm ] = useState({
        category: 'mathematics',
        title: '',
        description: '',
        image: '',
        price: null
    })

    const handleSubmit = () => {
        const {user} = auth
        createJob(jobForm, user.uid)
        .then(() => alert('Job Created!'))
        .catch(() => alert('Error!'))
    }

    const handleChange = e => {
        const {name, value} = e.target
        setJobForm({...jobForm, [name]:value})
    }

    if(redirect){return <Redirect to="/"/>}
    return(
        <div className="create-page">
        <div className="container">
            <div className="form-container">
            <h1 className="title">Create Service</h1>
            <form>
                <div className="field">
                <label className="label">Category</label>
                <div className="control">
                    <div className="select">
                    <select name="category" onChange={handleChange}>
                        <option value="design">Graphics & Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="writing">Writing & Translation</option>
                        <option value="video">Video & Animation</option>
                        <option value="music">Music & Audio</option>
                        <option value="programming">Programming & Tech</option>
                        <option value="business">Business</option>
                        <option value="lifestyle">Lifestyle</option>
                    </select>
                    </div>
                </div>
                </div>
                <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input onChange={handleChange}
                    name="title"
                    className="input"
                    type="text"
                    placeholder="Text input" />
                </div>
                </div>
                <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <textarea
                    onChange={handleChange}
                    name="description"
                    className="textarea"
                    placeholder="Textarea"></textarea>
                </div>
                </div>
                <div className="field">
                <label className="label">Image Url</label>
                <div className="control">
                    <input
                    onChange={handleChange}
                    name="image"
                    className="input"
                    type="text"
                    placeholder="Text input" />
                </div>
                </div>
                <div className="field">
                <label className="label">Price per Hour</label>
                <div className="control">
                    <input
                    onChange={handleChange}
                    name="price"
                    className="input"
                    type="number"
                    placeholder="Text input" />
                </div>
                </div>
                <div className="field is-grouped">
                <div className="control">
                    <button
                    onClick={handleSubmit}
                    type="button" className="button is-link">Create</button>
                </div>
                <div className="control">
                    <button className="button is-text">Cancel</button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default authorization(JobCreate)