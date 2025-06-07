import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Creatable from 'react-select/creatable';
import Select from 'react-select';

const EducationForm = ({ show, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();
  const [isOtherCourse, setIsOtherCourse] = useState(false);
  const [otherCourse, setOtherCourse] = useState('');
  const [showOtherMarksField, setShowOtherMarksField] = useState(false);
  const [showMarksField, setShowMarksField] = useState('');
  const marksRef = useRef(null);
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => currentYear - i)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const requiredFields = ['education', 'institute', 'course', 'otherCourse', 'specialization', 'courseType', 'startYear', 'endYear', 'grading', 'marks'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Required';
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    axios.post('http://localhost:8080/api/education', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        onSave(res.data);
        onClose();
      })
      .catch(err => {
        console.error("Failed to save education", err);
      });
  };

  const customSelectStyles = (errors = {}, fieldName = '') => ({
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // Ensures it's above the modal
    }),

    menu: (base) => ({
      ...base,
      maxHeight: 130,
      overflowY: 'auto',
      zIndex: 1051,

    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 130,
      overflowY: 'auto',
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      borderColor: errors[fieldName] ? 'red' : '#ccf6fb',
      boxShadow: state.isFocused ? '0 0 0 2px #ccf6fb' : 'none',
      '&:hover': {
        borderColor: errors[fieldName] ? 'red' : '#86b7fe',
      },
    }),
    option: (base, state) => ({
      ...base,
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 10,
      paddingRight: 10,
      lineHeight: '1.2',
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? '#92e6f5'
        : state.isFocused
          ? '#ccf6fb'
          : 'white',
      color: state.isSelected ? 'white' : 'black',
      ':active': {
        backgroundColor: '#92e6f5',
      },
    }),
  });

  const educationOptions = [
    { value: 'phd', label: 'PhD' },
    { value: 'masters', label: "Master's" },
    { value: "Bachelor's", label: "Bachelor's" },
    { value: 'highschool', label: 'High School' },
  ]

  const courseOptions = [
    {
      label: 'Doctorate/PhD',
      options: [
        { value: 'maha', label: 'Ph.D/Doctorate' },
        { value: 'up', label: 'MPHIL' },
      ]
    },
    {
      label: 'Masters/Post-Graduation',
      options: [
        { value: 'cbse', label: 'MBA/PGDM' },
        { value: 'cisce', label: 'M.Tech' },
        { value: 'nios', label: 'MS/M.Sc(Science)' },
        { value: 'ib', label: 'MCA' },
        { value: 'igcse', label: 'M.Com' },
        { value: 'igcse', label: 'PG Diploma' },
        { value: 'igcse', label: 'M.A' },
        { value: 'igcse', label: 'CA' },
        { value: 'igcse', label: 'CS' },
        { value: 'igcse', label: 'DM' },
        { value: 'igcse', label: 'ICWA(CMA)' },
        { value: 'igcse', label: 'Integrated PG' },
        { value: 'igcse', label: 'LLM' },
        { value: 'igcse', label: 'M.Arch' },
        { value: 'igcse', label: 'M.Ch' },
        { value: 'igcse', label: 'M.Des.' },
        { value: 'igcse', label: 'M.Ed' },
        { value: 'igcse', label: 'M.Pharma' },
        { value: 'igcse', label: 'MCM' },
        { value: 'igcse', label: 'MDS' },
        { value: 'igcse', label: 'Medical-MS/MD' },
        { value: 'igcse', label: 'MFA' },
        { value: 'igcse', label: 'MVSC' },

      ]
    },
    {
      label: 'Graduation/Diploma',
      options: [
        { value: 'cbse', label: 'B.Tech/B.E.' },
        { value: 'cisce', label: 'B.Com' },
        { value: 'nios', label: 'B.Sc' },
        { value: 'ib', label: 'B.A' },
        { value: 'igcse', label: 'Diploma' },
        { value: 'igcse', label: 'B.Arch' },
        { value: 'igcse', label: 'B.Des.' },
        { value: 'igcse', label: 'B.B.A/ B.M.S' },
        { value: 'igcse', label: 'B.Ed' },
        { value: 'igcse', label: 'B.El.Ed' },
        { value: 'igcse', label: 'BVSC' },
        { value: 'igcse', label: 'B.Pharma' },
        { value: 'igcse', label: 'LLB' },
        { value: 'igcse', label: 'MBBS' },
        { value: 'igcse', label: 'ITI Certification' },
      ]
    },
    {
      label: 'Other',
      options: [
        { value: 'other', label: 'Other' }
      ]
    }
  ];


  const gradingOption = [
    { value: 'Grade-10', label: 'Grade Out of 10' },
    { value: 'Grade-4', label: 'Grade Out of 4' },
    { value: 'marks', label: '% Marks of 100 Maximum' },
    { value: 'pursuing', label: 'Pursuing' },

  ]


  useEffect(() => {
    if (showOtherMarksField && marksRef.current) {
      marksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showOtherMarksField]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg" dialogClassName="scrollable-modal">
      <Modal.Header closeButton>
        <Modal.Title>Education</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scroll">
        <Form id="educationForm" onSubmit={handleSubmit}>

          <Form.Group className='mb-3'>
            <Form.Label>Education</Form.Label>
            <Select
              name='education'
              placeholder='Select Education'
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              options={educationOptions}
              value={
                educationOptions.find(option => option.value === formData.education) || null
              }
              onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || '';
                handleChange({ target: { name: 'education', value: selectedValue } });
              }}
              styles={customSelectStyles(errors, 'education')}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>University/Institute</Form.Label>
            <Form.Control
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter University/Institute"
              isInvalid={!!errors.university}
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Course</Form.Label>
            <Creatable
              name="course"
              placeholder="Select course"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              options={courseOptions}
              value={courseOptions
                .flatMap(group => group.options)
                .find(option => option.value === formData.board)}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || '';
                handleChange({ target: { name: 'board', value: selectedValue } });
                setIsOtherCourse(selectedValue === 'other');
                if (selectedValue !== 'other') {
                  setOtherCourse('');
                }
              }}
              styles={customSelectStyles(errors, 'course')}
            />
          </Form.Group>

          {isOtherCourse && (
            <Form.Group className="mb-3">
              <Form.Label>Please specify your course</Form.Label>
              <Creatable
                isClearable
                menuIsOpen={false}
                inputValue={otherCourse}
                onInputChange={setOtherCourse}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                styles={customSelectStyles(errors, 'otherCourse')}
                placeholder="Enter a course name"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter specialization"
              isInvalid={!!errors.specialization}
              className="custom-input"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Course Type</Form.Label>
              <div>
                {['Full time', 'Part time', 'Distance learning'].map((type) => (
                  <Form.Check
                    key={type}
                    inline
                    label={type}
                    className="custom-radio"
                    type="radio"
                    name="courseType"
                    value={type}
                    checked={formData.courseType === type}
                    onChange={handleChange}
                    isInvalid={!!errors.courseType}

                  />
                ))}
              </div>
            </Col>
            <Col md={6}>
              <Form.Label>Course Duration</Form.Label>
              <Row>
                <Col>
                  <Select
                    name="startYear"
                    placeholder="Starting year"
                    isClearable
                    components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
                    options={years.map((year) => ({ value: year, label: year }))}
                    value={formData.startYear ? { value: formData.startYear, label: formData.startYear } : null}
                    onChange={(selected) =>
                      setFormData({ ...formData, startYear: selected?.value || '' })
                    }
                    menuPosition="fixed"
                    styles={customSelectStyles(errors, 'startYear')}
                  />

                </Col>
                <Col>
                  <Select
                    name="endYear"
                    placeholder="Ending year"
                    isClearable
                    components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
                    options={years.map((year) => ({ value: year, label: year }))}
                    value={formData.endYear ? { value: formData.endYear, label: formData.endYear } : null}
                    onChange={(selected) =>
                      setFormData({ ...formData, endYear: selected?.value || '' })
                    }
                    menuPosition="fixed"
                    styles={customSelectStyles(errors, 'endYear')}
                  />

                </Col>
              </Row>
            </Col>
          </Row>


          <Form.Group className='mb-3'>
            <Form.Label>Grading System</Form.Label>
            <Select
              name="grading"
              placeholder="Select Grading System"
              isClearable
              components={{ ClearIndicator: () => null, IndicatorSeparator: () => null }}
              options={gradingOption}
              value={
                gradingOption.find(option => option.value === formData.grading) || null
              }
              onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || '';
                handleChange({ target: { name: 'grading', value: selectedValue } });
                setShowOtherMarksField(selectedValue === 'Grade-10' ||
                  selectedValue === 'Grade-4' ||
                  selectedValue === 'marks');
                if (selectedValue !== 'Grade-10' &&
                  selectedValue !== 'Grade-4' &&
                  selectedValue !== 'marks') {
                  setShowMarksField('');
                }
              }}
              menuPosition="fixed"
              styles={customSelectStyles(errors, 'grading')}
            />
          </Form.Group>

          {showOtherMarksField && (
            <Form.Group className="mb-3" ref={marksRef}>
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="text"
                name="marks"
                value={showMarksField}
                onChange={(e) => setShowMarksField(e.target.value)}
                placeholder="Enter marks/grade"
                isInvalid={!!errors?.marks}
                className="custom-input"
              />
            </Form.Group>
          )}


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" form="educationForm" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EducationForm;

