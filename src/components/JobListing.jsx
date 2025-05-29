import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, SetSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocation] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        SetSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }
    const handleLocationChange = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matechesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job =>job.visible && matchesCategory(job) && matchesLocation(job) && matechesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className="container py-4 d-flex flex-column flex-lg-row gap-3 gap-lg-0">
            {/* Sidebar  */}
            <div className="col-12 col-lg-3 bg-white px-3">
                {/* Search Filter From Hero Component */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className="fw-medium fs-5 mb-3">Current Search</h3>

                            <div className="mb-4 text-secondary">
                                {searchFilter.title && (
                                    <span className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 border border-primary px-3 py-1 rounded me-2">
                                        {searchFilter.title}
                                        <img
                                            onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                                            className="ms-1"
                                            style={{ cursor: "pointer", width: "16px", height: "16px" }}
                                            src={assets.cross_icon}
                                            alt="Clear"
                                        />
                                    </span>
                                )}

                                {searchFilter.location && (
                                    <span className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 border border-primary px-3 py-1 rounded me-2">
                                        {searchFilter.location}
                                        <img
                                            onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                            className="ms-1"
                                            style={{ cursor: "pointer", width: "16px", height: "16px" }}
                                            src={assets.cross_icon}
                                            alt="Clear"
                                        />
                                    </span>
                                )}

                            </div>
                        </>
                    )
                }

                <button onClick={e => setShowFilter(prev => !prev)} className="px-4 py-1 border border-secondary rounded d-lg-none">

                    {showFilter ? "Close" : "Filter"}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? "" : "d-none d-xl-block"}>
                    <h4 className="fw-semibold fs-5 py-4">Search by categories</h4>
                    <ul className="list-unstyled text-secondary">

                        {
                            JobCategories.map((category, index) => (
                                <li className="d-flex align-items-center gap-3 mb-3" key={index}>
                                    <input className="form-check-input" style={{ transform: 'scale(1.25)' }}
                                        type='checkbox'
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)} />
                                    {category}

                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter ? "" : "d-none d-xl-block"}>
                    <h4 className="fw-semibold fs-5 py-4 pt-5">Search by Location</h4>
                    <ul className="list-unstyled text-secondary">

                        {
                            JobLocations.map((location, index) => (
                                <li className="d-flex align-items-center gap-3 mb-3" key={index}>
                                    <input className="form-check-input" style={{ transform: 'scale(1.25)' }}
                                        type='checkbox'
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocations.includes(location)} />
                                    {location}

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {/* Job listing */}
            <section className="w-100 w-lg-75 text-dark px-lg-0 px-4">

                <h3 className="fw-semibold fs-3 py-2" id="job-list">Latest Jobs</h3>
                <p className='mb-4'>Get your desired job from top companies</p>
                <div className="row g-4">
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <div key={index} className="col-12 col-sm-6 col-xl-4">
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className="d-flex align-items-center justify-content-center gap-2 mt-5">

                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`btn d-flex align-items-center justify-content-center rounded border ${currentPage === index + 1 ? 'text-primary bg-light border-primary' : 'btn-outline-secondary text-secondary'
                                    }`}
                                    style={{ width: '40px', height: '40px' }}>
                                    {index + 1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing