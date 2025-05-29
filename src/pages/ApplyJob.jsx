import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios';



const ApplyJob = () => {

  const [applyMessage, setApplyMessage] = useState('');

  const { id } = useParams()

  const [JobData, setJobData] = useState(null)

  const { jobs } = useContext(AppContext)

  const fetchJob = async () => {
    const data = jobs.filter(job => job.id === id)
    if (data.length !== 0) {
      setJobData(data[0])
      console.log(data[0])
    }
  }

  // useEffect(() => {
  //   if (jobs.length > 0) {
  //     fetchJob()
  //   }

  // }, [id, jobs])
  useEffect(() => {
    setApplyMessage('');
  }, [id]);



  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT from localStorage
        const response = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request header
          },
        });
        setJobData(response.data);

        //  // ✅ Debug logs after setting job data
        //     console.log("JobData companyId:", response.data.companyId?.id || response.data.companyId?._id);
        //     console.log("All jobs' companyId:");
        //     jobs.forEach(job => {
        //       console.log(job.id, job.companyId?.id || job.companyId?._id);
        //     });

      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  if (!JobData) {
    return <div>Loading...</div>;
  }

  const applyJob = async () => {
    try {
      const token = localStorage.getItem('token'); // JWT token
      const userId = localStorage.getItem('userId'); // store this at login/signup

      const response = await axios.post('http://localhost:8080/api/applications', {
        jobId: JobData.id,
        userId: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Job applied successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error === "You have already applied for this job."
      ) {
        setApplyMessage("You have already applied for this job.");
      } else {
        setApplyMessage("Something went wrong while applying.");
      }
      console.error(error);
    }
  };

  console.log("Current JobData ID:", JobData.id || JobData._id);
  console.log("Current Company ID:", JobData.companyId || JobData.companyId);
  console.log("All Jobs Company IDs:");
  jobs.forEach((job, i) => {
    console.log(`Job ${i}: ID=${job.id || job._id}, CompanyID=${job.companyId || job.companyId}`);
  });



  return JobData ? (
    <>
      <Navbar />


      <section style={{ marginTop: '150px' }}></section>
      <div className="min-vh-100 d-flex flex-column py-1 container px-4 px-xxl-5 mx-auto " style={{ minHeight: '250px' }}>
        <div className="bg-white text-black rounded w-100">
          <div className="d-flex justify-content-center justify-content-md-between flex-wrap gap-3 px-4 px-md-5 py-5 mb-4 border border-info rounded" style={{ backgroundColor: '#e0faff', minHeight: '250px' }}>
            <div className="d-flex flex-column flex-md-row align-items-center">

              <img className="h-auto bg-white rounded-lg p-4 me-0 mb-md-0 border rounded"
                src={JobData.companyId.image} alt="" />

              <div className="ms-4 text-center text-md-start text-secondary">

                <h1 className="h2-sm fw-medium">{JobData.title}</h1>

                <div className="d-flex flex-row flex-wrap align-items-center justify-content-md-start justify-content-center text-secondary mt-0 gap-3">

                  <span className="d-flex align-items-center gap-2">

                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <img src={assets.money_icon} alt="" />
                    Salary: {(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center text-md-end text-center mx-md-0 mx-auto small">
              {applyMessage && (
                <div className=" text-danger mb-2">
                  {applyMessage}
                </div>
              )}
              <button className="px-5 py-2 rounded mx-md-0 mx-auto mt-4 " style={{ background: '#00c4e6', color: 'white', border: 'none' }} onClick={applyJob}>Apply Now</button>
              <p className="mt-1 text-secondary">Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start">
            <div className="col-12 col-lg-8">
              <h2 className="fw-bold fs-3 mb-3 mt-3">Job description</h2>

              <div className="rich-text mb-4" dangerouslySetInnerHTML={{ __html: JobData.description }}></div>

              {applyMessage && (
                <div className=" text-danger mb-2">
                  {applyMessage}
                </div>
              )}

              <button className="px-5 py-2 rounded mt-2 mx-auto d-block d-lg-inline-block" style={{ background: '#00c4e6', color: 'white', border: 'none' }} onClick={applyJob}>Apply Now</button>
            </div>
            {/* Right section more jobs */}
            {/* <div className=" col-lg-4 mt-2 mt-lg-3 d-flex flex-column gap-4">
              <h2>More jobs from {JobData.companyId.name}</h2>
              {jobs.filter( job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
              .filter( job => true).slice(0,3)
              .map((job,index)=> <JobCard key={index} job={job} />)}
            </div> */}

            {/* <div className="col-lg-4 mt-2 mt-lg-3 d-flex flex-column gap-4">
              <h2>More jobs from {JobData?.companyId?.name}</h2>
              {
                jobs
                  .filter(job =>
                    job?.id !== JobData?.id &&
                    job?.companyId?.id === JobData?.companyId?.id
                  )
                  .slice(0, 3)
                  .map((job, index) => <JobCard key={index} job={job} />)
              }
            </div> */}

            <div className="col-lg-4 mt-2 mt-lg-3 d-flex flex-column gap-4">
              <h2>
                More jobs from{" "}
                {JobData?.companyId?.name || JobData?.companyName || "this company"}
              </h2>

              {
                jobs
                  .filter(job => {
                    const currentCompanyId =
                      JobData?.companyId?.id || JobData?.companyId; // Either object or direct ID
                    const jobCompanyId =
                      job?.companyId?.id || job?.companyId;

                    return job?.id !== JobData?.id && jobCompanyId === currentCompanyId;
                  })
                  .slice(0, 3)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))
              }
            </div>


          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob