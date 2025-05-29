import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {

    const navigate = useNavigate()

    return (
        <div className="border p-4 shadow rounded">
            <div className="d-flex justify-content-between align-items-center">
                <img className='img-fluid' src={assets.company_icon} alt="" />
            </div>
            <h4 className="fw-medium fs-5 mt-2">{job.title}</h4>
            <div className="d-flex align-items-center gap-2 mt-2 small">
                <span className="bg-light border border-primary px-3 py-1 rounded small">{job.location}</span>
                <span className="bg-light border border-danger px-3 py-1 rounded small">{job.level}</span>

            </div>
            <p className="text-muted small mt-4" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
            <div className="mt-4 d-flex gap-2 small">

                <button onClick={() => { navigate(`/apply-job/${job.id}`); scrollTo(0, 0); }} className="px-2 py-2 rounded fs-6" style={{background: '#00c4e6', color:'white',border: 'none'}}>
                    Apply Now
                </button>

                <button onClick={() => { navigate(`/apply-job/${job.id}`); scrollTo(0, 0); }} className="btn btn-outline-secondary px-2 py-2 rounded fs-6">
                    Learn More
                </button>

            </div>
        </div>
    )
}

export default JobCard