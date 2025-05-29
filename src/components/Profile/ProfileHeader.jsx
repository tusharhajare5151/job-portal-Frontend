import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCheckCircle, FaMale } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { assets } from '../../assets/assets';


const ProfileHeader = () => {
  const [user, setUser] = useState({
    name: "Tushar Kisan Hajare",
    degree: "B.Tech/B.E.",
    university: "Pune University",
    location: "Pune",
    gender: "Male",
    dob: "10th August",
    phone: "9975813161",
    email: "tusharhajare.virat@gmail.com",
    profileCompletion: 100,
    image: "https://via.placeholder.com/100",
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});

  // Refs for form fields
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const locationRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);

    // Scroll to the first invalid field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.gender) genderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.dob) dobRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.location) locationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.phone) phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (newErrors.email) emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // No errors — update and close modal
    setUser(formData);
    setShowModal(false);
  };

  return (
    <>
      <div className="card shadow-sm p-3 mb-4">
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <img src={assets.upload_area } className="rounded-circle border border-3" width="100" height="100" alt="User" />
            <span className="position-absolute bottom-0 start-50 translate-middle badge bg-success">
              {user.profileCompletion}%
            </span>
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-0">
              {user.name}{" "}
              <BsPencil
                className="text-primary cursor-pointer"
                role="button"
                onClick={() => {
                  setFormData({ ...user });
                  setErrors({});
                  setShowModal(true);
                }}
              />
            </h5>
            <div className="text-muted">{user.degree}</div>
            <div className="text-muted mb-2">{user.university}</div>
            <div className="row text-muted">
              <div className="col-md-6 mb-1"><FaMapMarkerAlt /> {user.location}</div>
              <div className="col-md-6 mb-1"><FaPhone /> {user.phone} <FaCheckCircle className="text-success ms-1" /></div>
              <div className="col-md-6 mb-1"><FaMale /> {user.gender}</div>
              <div className="col-md-6 mb-1"><FaEnvelope /> {user.email} <FaCheckCircle className="text-success ms-1" /></div>
              <div className="col-md-6"><FaBirthdayCake /> {user.dob}</div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered size="md" dialogClassName="scrollable-modal">
        <Modal.Header closeButton>
          <Modal.Title>All about you</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          <Form id="profileForm" noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Full name {errors.name && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Gender {errors.gender && <span className="text-danger">*</span>}</Form.Label>
              <div ref={genderRef}>
                {["Male", "Female", "Transgender"].map((g) => (
                  <Form.Check
                    inline
                    key={g}
                    label={g}
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    required
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Date of birth (DD/MM/YYYY) {errors.dob && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={dobRef}
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder='Enter your DOB'
                isInvalid={!!errors.dob}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Current Location {errors.location && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={locationRef}
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter your Location'
                isInvalid={!!errors.location}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Mobile Number {errors.phone && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={phoneRef}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter Number'
                isInvalid={!!errors.phone}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email {errors.email && <span className="text-danger">*</span>}</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                isInvalid={!!errors.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button type="submit" variant="primary" form="profileForm">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileHeader;


// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaCheckCircle, FaMale } from 'react-icons/fa';
// import { BsPencil } from 'react-icons/bs';


// const ProfileHeader = () => {
//   const [user, setUser] = useState({
//     name: "Tushar Kisan Hajare",
//     degree: "B.Tech/B.E.",
//     university: "Pune University",
//     location: "Pune",
//     gender: "Male",
//     dob: "10th August 1996",
//     phone: "9975813161",
//     email: "tusharhajare.virat@gmail.com",
//     profileCompletion: 100,
//     image: "https://via.placeholder.com/100",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ ...user });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleModalClose = () => {
//     setShowModal(false);
//     setErrors({});              // Clear errors
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Check form validity
//     // const form = e.currentTarget;
//     // if (form.checkValidity() === false) {
//     //   e.stopPropagation();
//     //   return;
//     // }



//     const newErrors = {};

//     // Check required fields
//     if (!formData.name.trim()) newErrors.name = "Full name is required";
//     if (!formData.gender.trim()) newErrors.gender = "Gender is required";
//     if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
//     if (!formData.location.trim()) newErrors.location = "Location is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";

//     setErrors(newErrors);

//     // If there are any errors, don't proceed
//     if (Object.keys(newErrors).length === 0) {
//       setUser(formData);
//       setShowModal(false);
//     }

//   };

//   return (
//     <>
//       <div className="card shadow-sm p-3 mb-4">
//         <div className="d-flex align-items-center">
//           <div className="position-relative me-3">
//             <img src={user.image} className="rounded-circle border border-3" width="100" height="100" alt="User" />
//             <span className="position-absolute bottom-0 start-50 translate-middle badge bg-success">
//               {user.profileCompletion}%
//             </span>
//           </div>
//           <div className="flex-grow-1">
//             <h5 className="mb-0">
//               {user.name}{" "}
//               {/* <BsPencil className="text-primary cursor-pointer" role="button" onClick={() => setShowModal(true)} /> */}
//               <BsPencil
//                 className="text-primary cursor-pointer"
//                 role="button"
//                 onClick={() => {
//                   setFormData({ ...user });  // ✅ Reset to last saved values
//                   setErrors({});             // ✅ Clear validation errors
//                   setShowModal(true);        // ✅ Open modal
//                 }}
//               />
//             </h5>
//             <div className="text-muted">{user.degree}</div>
//             <div className="text-muted mb-2">{user.university}</div>
//             <div className="row text-muted">
//               <div className="col-md-6 mb-1"><FaMapMarkerAlt /> {user.location}</div>
//               <div className="col-md-6 mb-1"><FaPhone /> {user.phone} <FaCheckCircle className="text-success ms-1" /></div>
//               <div className="col-md-6 mb-1"><FaMale /> {user.gender}</div>
//               <div className="col-md-6 mb-1"><FaEnvelope /> {user.email} <FaCheckCircle className="text-success ms-1" /></div>
//               <div className="col-md-6"><FaBirthdayCake /> {user.dob}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md" dialogClassName="scrollable-modal"> */}
//       <Modal show={showModal} onHide={handleModalClose} centered size="md" dialogClassName="scrollable-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>All about you</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modal-body-scroll">
//           <Form id="profileForm" noValidate onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Full name {errors.name && <span className="text-danger">*</span>}
//               </Form.Label>
//               <Form.Control type="text" name="name" value={formData.name} onChange={handleChange}
//                 placeholder='Enter your full name'
//                 isInvalid={!!errors.name} />

//               <Form.Control.Feedback type='invalid'>
//                 {errors.name}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Gender {errors.gender && <span className="text-danger">*</span>}</Form.Label>
//               <div>
//                 {["Male", "Female", "Transgender"].map((g) => (
//                   <Form.Check
//                     inline
//                     key={g}
//                     label={g}
//                     type="radio"
//                     name="gender"
//                     value={g}
//                     checked={formData.gender === g}
//                     onChange={handleChange}
//                     required
//                   />
//                 ))}
//               </div>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Date of birth (DD/MM/YYYY) {errors.dob && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control type="text" name="dob" value={formData.dob} onChange={handleChange}
//                 placeholder='Enter your DOB'
//                 isInvalid={!!errors.dob}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Current Location {errors.location && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control type="text" name="location" value={formData.location} onChange={handleChange}
//                 placeholder='Enter your Location'
//                 isInvalid={!!errors.location} />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Mobile Number {errors.phone && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange}
//                 placeholder='Enter Number'
//                 isInvalid={!!errors.phone} />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Email {errors.email && <span className="text-danger">*</span>}</Form.Label>
//               <Form.Control type="email" name="email" value={formData.email} onChange={handleChange}
//                 placeholder='Enter your email'
//                 isInvalid={!!errors.email} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button type="submit" variant="primary" form="profileForm">Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ProfileHeader;

