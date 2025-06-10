import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const ProfileSummary = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [profileSummary, setProfileSummary] = useState(null);

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventiveDefault();


        onSave(formData);
        setShowForm(false);
    }

    
    return (
        <>
        <div className="card shadow-sm p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Profile Summary</h5>
                <span role="button" style={{color : '#00c4e6' }} onClick={() => { setShowForm(true) }}>
                    {'Add Profile Summary'}</span>
            </div>
            {profileSummary ? (
                <div className="col-sm-12 mb-2">
                    <p className="me-1 text-muted">Profile Summary</p>
                </div>
            ) : (
                <div className="text-muted fst-italic">Showcase your major career accomplishments to demonstrate your potential to employers.</div>
            )}
        </div>

            <Modal show={showForm} onHide={() => setShowForm(false)} centered size='lg' dialogClassName='scrollable-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Summary</Modal.Title>
                </Modal.Header>
                 <Modal.Body className="modal-body-scroll">
                <Form>
                <Form.Group>
                    <Form.Label className="text-secondary">"Summarize your top career highlights and future goals to make your profile stand out to recruiters."</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="proDesc"
                        placeholder="Type here..."
                        value={formData.proDesc || ''}
                        onChange={handleChange}
                        maxLength={1000}
                        className="custom-input"  
                    />  
                    <div className="text-end text-muted small">
                        {1000 - (formData.proDesc?.length || 0)} character(s) left
                    </div>  
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setShowForm(false)}}>Cancel</Button>
                <Button type="submit" style={{background: '#00c4e6', color: 'white', border: 'none'}}>Save</Button>
            </Modal.Footer>
            </Modal>
           

        </>
    )
}
export default ProfileSummary;