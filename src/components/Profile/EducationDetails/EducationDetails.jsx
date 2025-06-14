import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import EducationForm from './EducationForm';
import axios from 'axios';
import ClassXIIXForm from './ClassXIIXForm';


const EducationDetails = () => {

  const [showModal, setShowModal] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [formType, setFormType] = useState(null);


  // useEffect(() => {
  //   // Fetch education data from backend on component mount
  //   const fetchEducation = async () => {
  //     try {
  //       const res = await axios.get('/api/education');
  //       console.log('Fetched education data:', res.data);
  //       // if (res.data) {
  //       //   setEducationData(res.data);
  //       // }
  //       const data = res.data;

  //       //check if data is not empty
  //       if (data && Object.keys(data).length > 0) {
  //         setEducationData(data);
  //       } else {
  //         setEducationData(null);
  //       }
  //     } catch (err) {
  //       console.error('Failed to fetch education data:', err);
  //       setEducationData(null);
  //     }
  //   };
  //   fetchEducation();
  // }, []);

  const handleSave = (formData) => {
    setEducationData(formData);
    setShowModal(false);
  }

  return (
    <>
      {/* Display Card */}
      <div className="card shadow-sm rounded-4 p-4 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Education</h5>
          <span role="button" style={{color:'#00c4e6'}} onClick={() => {setFormType('education'); setShowModal(true)} }>
            {'Add education'}</span>
        </div>

        {educationData ? (
          <>
            <p className="fw-semibold mb-0">{educationData.education}</p>
            <p className="text-muted mb-0">{educationData.university}</p>
            <p className="text-muted mb-0">
              {educationData.startYear} - {educationData.endYear} | {educationData.courseType}
            </p>
          </>
        ) : (
          <>
            <p className=" mt-3 text-secondary" role="button" onClick={() => { setFormType('education'); setShowModal(true);}} >
              Add Graduation /masters /post-graduation /doctorate/PhD</p>
            <p className=" mt-0 " role="button" onClick={() => {setFormType('classXII'); setShowModal(true)}} style={{color:'#00c4e6'}}>Add class XII</p>
            <p className=" mt-0 " role="button" onClick={() => {setFormType('classX'); setShowModal(true)}} style={{color:'#00c4e6'}}>Add class X</p>
          </>
        )}
      </div>

        {formType === 'education' && (
      <EducationForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={educationData || {}}

      />
        )}

        {(formType === 'classXII' || formType === 'classX') && (
      <ClassXIIXForm
              show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={educationData || {}}
        formLevel={formType}
        />
  )}
    </>
  );
};

export default EducationDetails;


// import React, { useState } from 'react';
// import { Modal } from 'react-bootstrap';
// import EducationForm from './EducationForm';


// const EducationDetails = () => {

//   const [showModal, setShowModal] = useState(false);
//   const [educationData, setEducationData] = useState({
//     education: 'B.Tech/B.E. Computers',
//     university: 'Pune University',
//     course: 'Computer Science',
//     courseType: 'Full Time',
//     startYear: '2021',
//     endYear: '2022',
//     grading: 'Percentage'
//   });

//   const handleSave = (formData) => {
//     setEducationData(formData);
//     setShowModal(false);
//   };

//   return (
//     <>
//       {/* Display Card */}
//       <div className="card shadow-sm p-3 mb-3">
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <h5 className="mb-0">Education</h5>
//           <span role="button" className="text-primary" onClick={() => setShowModal(true)}>Add education</span>
//         </div>

//         <p className="fw-semibold mb-0">{educationData.education}</p>
//         <p className="text-muted mb-0">{educationData.university}</p>
//         <p className="text-muted mb-0">
//           {educationData.startYear} - {educationData.endYear} | {educationData.courseType}
//         </p>
//         <p className=" mt-3 text-primary" role="button" onClick={() => setShowModal(true)}>Add Graduation /masters /post-graduation /doctorate/PhD</p>
//         <p className=" mt-0 text-primary">Add class XII</p>
//         <p className=" mt-0 text-primary">Add class X</p>
//       </div>

//       <EducationForm
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onSave={handleSave}
//         initialData={educationData}

//       />
//     </>
//   );
// };

// export default EducationDetails;
