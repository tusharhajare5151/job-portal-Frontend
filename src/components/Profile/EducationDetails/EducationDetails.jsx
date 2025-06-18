import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import EducationForm from './EducationForm';
import axios from 'axios';
import ClassXIIXForm from './ClassXIIXForm';

const EducationDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [formType, setFormType] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);


  const handleAddEducation = () => {
  setSelectedEducation(null);  // ✅ So form opens blank
  setShowModal(true);
};



  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')

        const res = await axios.get('http://localhost:8080/api/education', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched education data:', res.data);
        if (Array.isArray(res.data)) {
          setEducationData(res.data);
        } else {
          setEducationData([]);
        }
      } catch (err) {
        console.error('Failed to fetch education data:', err);
        setEducationData([]);
      }
    };
    fetchEducation();
  }, []);

  // Called when save happens in the modal
  const handleSave = (savedData) => {
    if (savedData.deletedId) {
      // Delete case
      setEducationData(prev => prev.filter(ed => ed.id !== savedData.deletedId));
    } else {
      // Save or update case
      setEducationData(prev =>
        prev.some(ed => ed.id === savedData.id)
          ? prev.map(ed => ed.id === savedData.id ? savedData : ed)
          : [...prev, savedData]
      );
    }
    setShowModal(false);
  };


  return (
    <>
      {/* Display Card */}
      <div className="card shadow-sm rounded-4 p-4 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Education</h5>
          <span
            role="button"
            style={{ color: '#00c4e6' }}
            onClick={() => {handleAddEducation
              setFormType('education');
              setShowModal(true);
            }}
          >
            Add education
          </span>
        </div>

        {Array.isArray(educationData) && educationData.length > 0 ? (
          educationData.map((edu, index) => (
            <div key={index} className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <p className="fw-semibold mb-0">{edu.education}</p>
                <p className="text-muted mb-0">{edu.university}</p>
                <p className="text-muted mb-0">
                  {edu.startYear} - {edu.endYear} | {edu.courseType}
                </p>
              </div>
              <div>
                <i
                  className="bi bi-pencil-square"
                  style={{ color: '#00c4e6', cursor: 'pointer' }}
                  onClick={() => {
                    setFormType('education');
                    setSelectedEducation(edu); // <-- set the clicked one
                    setShowModal(true);
                  }}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <p
            className="mt-3 text-secondary"
            role="button"
            onClick={() => {
              setFormType('education');
              setShowModal(true);
            }}
          >
            Add Graduation /masters /post-graduation /doctorate/PhD
          </p>
        )}

        <p
          className="mt-0"
          role="button"
          onClick={() => {
            setFormType('classXII');
            setShowModal(true);
          }}
          style={{ color: '#00c4e6' }}
        >
          Add class XII
        </p>
        <p
          className="mt-0"
          role="button"
          onClick={() => {
            setFormType('classX');
            setShowModal(true);
          }}
          style={{ color: '#00c4e6' }}
        >
          Add class X
        </p>
      </div>

      {formType === 'education' && (
        <EducationForm
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialData={selectedEducation || {}}
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
