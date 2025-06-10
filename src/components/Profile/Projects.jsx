import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import customSelectStyles from '../../styles/customSelectStyles';

const Projects = ({ show, onClose, onSave }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [project, setProject] = useState(null);
    const [errors, setErrors] = useState({});
    const [showMoreDetails, setShowMoreDetails] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData(prev => ({ ...prev, [name]: selectedOption?.value || '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation here if needed
        const newErrors = {};

        const requiredFields = ['tag', 'title', 'client', 'status', 'selectyear', 'selectmonth','selectyear2','selectmonth2','project_details'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Required';
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;


        onSave(formData);
        setShowForm(false);
    };

    const resetForm = () => {
        setErrors({});
        setShowMoreDetails(false);
    };


    return (
        <>
            <div className="card shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Project</h5>
                    <span role="button" style={{ color: '#00c4e6' }} onClick={() => { setShowForm(true) }}>
                        {'Add Project'}</span>

                </div>
                {project ? (
                    <div className='col-sm-12 mb-2'>
                        <p className="mb-1 text-muted">Project Details</p>

                    </div>
                ) : (
                    <div className='text-muted fst-italic'>Please update your project details.</div>
                )}
            </div>

            <Modal show={showForm} onHide={() => setShowForm(false)} centered size="lg" dialogClassName="scrollable-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-scroll">
                    <Form id="projectForm" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter project title"
                                value={formData.title || ''}
                                onChange={handleChange}
                                className="custom-input"
                                isInvalid={!!errors.title}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tag this project with your employment/education</Form.Label>
                            <Select
                            name='tag'
                                options={[{ value: 'college', label: 'College' }, { value: 'internship', label: 'Internship' }]}
                                placeholder="Select employment/education"
                                onChange={(selected) => handleSelectChange('tag', selected)}
                                isClearable
                                components={{ IndicatorSeparator: () => null, ClearIndicator: () => null }}
                                styles={customSelectStyles(errors, 'tag')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Client</Form.Label>
                            <Form.Control
                                type="text"
                                name="client"
                                placeholder="Enter client name"
                                value={formData.client || ''}
                                onChange={handleChange}
                                className="custom-input"
                                isInvalid={!!errors.client}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Project Status</Form.Label>
                            <div>
                                <Form.Check
                                    className="custom-radio"
                                    inline label="In Progress" name="status" type="radio"
                                    value="inprogress" checked={formData.status === 'inprogress'}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}
                                />
                                <Form.Check
                                    className="custom-radio"
                                    inline label="Finished" name="status" type="radio"
                                    value="finished" checked={formData.status === 'finished'}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}
                                />
                            </div>
                        </Form.Group>

                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Worked from</Form.Label>
                                <Select
                                    name='selectyear'
                                    placeholder="Select year"
                                    options={Array.from({ length: 50 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return { value: year, label: year };
                                    })}
                                    onChange={(selected) => handleSelectChange('workedFromYear', selected)}
                                    styles={customSelectStyles(errors, 'selectyear')}
                                    menuPosition="fixed"
                                    isClearable
                                    components={{ IndicatorSeparator: () => null, ClearIndicator: () => null }}
                                />
                            </Col>
                            <Col>
                                <Form.Label>&nbsp;</Form.Label>
                                <Select
                                    name='selectmonth'
                                    placeholder="Select month"
                                    options={[
                                        'January', 'February', 'March', 'April', 'May', 'June',
                                        'July', 'August', 'September', 'October', 'November', 'December'
                                    ].map(month => ({ value: month, label: month }))}
                                    onChange={(selected) => handleSelectChange('workedFromMonth', selected)}
                                    styles={customSelectStyles(errors, 'selectmonth')}
                                    menuPosition="fixed"
                                    isClearable
                                    components={{ IndicatorSeparator: () => null, ClearIndicator: () => null }}
                                />
                            </Col>
                        </Row>

                        {formData.status === 'finished' && (
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Worked till</Form.Label>
                                    <Select
                                        name='selectyear2'
                                        placeholder="Select year"
                                        options={Array.from({ length: 50 }, (_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return { value: year, label: year };
                                        })}
                                        onChange={(selected) => handleSelectChange('workedTillYear', selected)}
                                        styles={customSelectStyles(errors, 'selectyear2')}
                                        menuPosition="fixed"
                                        isClearable
                                        components={{ IndicatorSeparator: () => null, ClearIndicator: () => null }}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Select
                                        name='selectmonth2'
                                        placeholder="Select month"
                                        options={[
                                            'January', 'February', 'March', 'April', 'May', 'June',
                                            'July', 'August', 'September', 'October', 'November', 'December'
                                        ].map(month => ({ value: month, label: month }))}
                                        onChange={(selected) => handleSelectChange('workedTillMonth', selected)}
                                        styles={customSelectStyles(errors, 'selectmonth2')}
                                        menuPosition="fixed"
                                        isClearable
                                        components={{ IndicatorSeparator: () => null, ClearIndicator: () => null }}
                                    />
                                </Col>
                            </Row>
                        )}


                        <Form.Group className="mb-3">
                            <Form.Label>Details of project</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="project_details"
                                placeholder="Type here..."
                                value={formData.details || ''}
                                onChange={handleChange}
                                maxLength={1000}
                                className="custom-input"
                                isInvalid={!!errors.project_details}
                            />
                            <div className="text-end text-muted small">
                                {1500 - (formData.details?.length || 0)} character(s) left
                            </div>
                        </Form.Group>

                        {!showMoreDetails && (
                            <div className="mb-3">
                                <Button variant="link" onClick={() => setShowMoreDetails(true)} style={{ color: '#00c4e6' }}>
                                    + Add more details
                                </Button>
                            </div>
                        )}

                        {showMoreDetails && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        placeholder="Enter project location"
                                        value={formData.location || ''}
                                        onChange={handleChange}
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Project Site</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline label="Offsite" name="site" type="radio"
                                            value="offsite" checked={formData.site === 'offsite'}
                                            onChange={handleChange}
                                            className="custom-radio"
                                        />
                                        <Form.Check
                                            inline label="Onsite" name="site" type="radio"
                                            value="onsite" checked={formData.site === 'onsite'}
                                            onChange={handleChange}
                                            className="custom-radio"
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Nature of Employment</Form.Label>
                                    <div>
                                        {['Full time', 'Part time', 'Contractual'].map((type) => (
                                            <Form.Check
                                                inline label={type} name="employment" type="radio"
                                                key={type} value={type.toLowerCase()}
                                                checked={formData.employment === type.toLowerCase()}
                                                onChange={handleChange}
                                                className="custom-radio"
                                            />
                                        ))}
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Team Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="teamSize"
                                        placeholder="Enter team size"
                                        value={formData.teamSize || ''}
                                        onChange={handleChange}
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        placeholder="Enter your role"
                                        value={formData.role || ''}
                                        onChange={handleChange}
                                        className="custom-input"
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3">
                                    <Form.Label>Role Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="roleDescription"
                                        placeholder="Type here..."
                                        value={formData.roleDescription || ''}
                                        onChange={handleChange}
                                        maxLength={250}
                                        className="custom-input"
                                    />
                                    <div className="text-end text-muted small">
                                        {250 - (formData.roleDescription?.length || 0)} character(s) left
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Skills Used</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder="Enter skills used"
                                        className="custom-input"

                                    />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</Button>
                    <Button type="submit" form="projectForm" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Projects;
