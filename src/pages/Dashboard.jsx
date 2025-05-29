import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import RecruiterProfileDropdown from '../components/RecruiterProfileDropdown';


const Dashboard = () => {
    // const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    const recruiterName = localStorage.getItem('recruiterName');
    const recruiterImage = localStorage.getItem('recruiterImage');


    return (
        <div className='min-h-screen'>

            {/* Navbar for Recruiter Panel */}
            <div className="shadow py-2 bg-white" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <div className="d-flex justify-content-between align-items-center px-4">
                    <div onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} className="d-flex align-items-center gap-3">
                        <img src={assets.logo2} alt="Logo" style={{ width: '55px', height: '55px' }} />
                        <div className="d-flex flex-column lh-1">
                            <span className="fw-bold text-dark mb-1 fs-3">Business Mitra</span>
                            <span className="text-muted fs-5">Placement</span>
                        </div>
                    </div>

                         <div className='d-flex align-items-center gap-2'>
                        <RecruiterProfileDropdown
                            recruiterImage={recruiterImage}
                            recruiterName={recruiterName}
                        />
                    </div>


                    {/* <div className='d-flex align-items-center gap-3'>
                        
                        <div className="position-relative">
                            <img
                                className='border rounded-pill'
                                style={{ width: '2rem', cursor: 'pointer' }}
                                src={assets.upload_area || `http://localhost:8080/uploads/${recruiterImage}`}
                                alt=""
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div className="position-absolute text-black rounded"
                                    style={{ top: '2rem', right: '2rem', zIndex: 10, paddingTop: '3rem' }}>
                                    <ul className="list-unstyled m-0 p-2 bg-white rounded border small">
                                        <li className='py-1 px-2' style={{ cursor: 'pointer' }}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <p className='d-none mb-0 d-sm-block'>{recruiterName}</p>
                    </div> */}
                </div>
            </div>

            <div className='d-flex items-start' style={{ marginTop: '70px' }}>

                {/* Left sliderbar with option to add job, manage jobs, view applications */}
                <div
                    className='position-fixed bg-white border-end border-2 sidebar'
                    style={{
                        top: '70px',
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <ul className="d-flex flex-column align-items-start pt-4 text-black">
                        <NavLink
                            to="/dashboard/add-job"
                            className={({ isActive }) =>
                                `d-flex align-items-center w-100 py-3 gap-2 text-decoration-none ${isActive ?
                                    'fw-semibold' : 'hover-bg-light'}`
                            }
                            style={({ isActive})=>
                            isActive
                            ? {
                                backgroundColor: '#e0faff',
                                borderRight: '4px solid #00c4e6',
                            } : {}
                            }
                            >
                            <img src={assets.add_icon} alt="" />
                            <p className='mb-0 text-dark d-none d-lg-block'>Add Job</p>
                        </NavLink>

                        <NavLink
                            to="/dashboard/manage-jobs"
                            className={({ isActive }) =>
                                `d-flex align-items-center w-100 py-3 gap-2 text-decoration-none ${isActive ? 'fw-semibold' : 'hover-bg-light'}`
                            }
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                        backgroundColor: '#e0faff',
                                        borderRight: '4px solid #00c4e6',
                                    }
                                    : {}
                            }
                        >
                            <img src={assets.home_icon} alt="" />
                            <p className="mb-0 text-dark d-none d-lg-block">Manage Jobs</p>
                        </NavLink>


                        <NavLink to='/dashboard/view-applications' className={({ isActive }) =>
                            `d-flex align-items-center w-100 py-3 gap-2 text-decoration-none ${isActive ?
                                'fw-semibold' : 'hover-bg-light'}`
                        }
                        style={({ isActive }) =>
                            isActive
                        ? {
                            backgroundColor: '#e0faff',
                            borderRight: '4px solid #00c4e6'
                        } : {}
                    }
                        >
                            <img src={assets.person_tick_icon} alt="" />
                            <p className='mb-0 text-dark d-none d-lg-block'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-grow-1 p-3 p-sm-4 w-100 overflow-auto main-content'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Dashboard
