import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { BsCloudUpload } from "react-icons/bs";


const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError('');
        setSuccessMsg('');

        if (rejectedFiles.length > 0) {
            setError('Only PDF, DOC or DOCX files under 5MB are allowed.');
            return;
        }

        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false
    });

    const handleUpload = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccessMsg('Resume uploaded successfully!');
        }, 2000);
    };

    return (
        <Card className="p-4 shadow-sm rounded-4 border-1  mb-3">
            <h5 className="mb-3">Upload Your Resume</h5>
            <div
                {...getRootProps()}
                className={`border border-dashed rounded-3 p-4 mb-3 text-center ${isDragActive ? 'bg-light' : ''}`}
                style={{ cursor: 'pointer' }}
            >
                <input {...getInputProps()} />
                <BsCloudUpload size={48} className="mb-2" style={{ color : '#00c4e6'}} />
                {
                    isDragActive ? (
                        <p>Drop your resume here...</p>
                    ) : (
                        <p>Drag & drop your resume, or <strong>click to browse</strong><br /><small>(PDF, DOC, DOCX, Max 2MB)</small></p>
                    )
                }
            </div>

            {file && <div className="mb-3"><strong>Selected:</strong> {file.name}</div>}
            {error && <Alert variant="danger">{error}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <div className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="w-auto px-4"
                    style={{cursor: 'pointer', background: '#00c4e6', color: 'white', border: 'none' }}
                    disabled={!file || loading}
                    onClick={handleUpload}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Upload Resume'}
                </Button>
            </div>



        </Card>
    );
};

export default ResumeUpload;
