
import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams, useNavigate } from 'react-router-dom';  
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import './FileUpload.css';
import './ChargebackDetails .css';

const FileUpload = () => {
    const { id: chargebackId } = useParams();
    const [chargeback, setChargeback] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        axios.post(`http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/upload-file/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
        }})
        .then(response => {
            console.log("File uploaded successfully", response.data);
            navigate(`/chargebacks/${chargebackId}`);
        })
        .catch(error => {
            console.error("Failed to upload file:", error.response.data);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/`);
                setChargeback(data);
                setFiles(data.files || []);
            } catch (error) {
                console.error('Failed to fetch chargeback details:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, [chargebackId]);

    if (loading) return <p>Loading...</p>;
    if (!chargeback) return <p>No chargeback found</p>;

    const deleteFile = async (fileId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/v1/files/${fileId}/delete/`);
            if (response.status === 204) {
                setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
                alert('File deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete file:', error);
            alert('Failed to delete file');
        }
    };

    return (
        <div className="cargeback-container">
            <div className="l-image1"></div>

            <div className="upload-buttn-container">
                <label htmlFor="file-upload" className="upload-buttn">Select File</label>
                <input type="file" id="file-upload" onChange={onFileChange} />
                <button className="buttn" onClick={onFileUpload}>Upload</button>
            </div>

            <h3 className="rembou-container">Files</h3>
            {files.length > 0 ? (
                <div className="file-list">
                    <ul>
                        {files.map(file => {
                            const fileUrl = `http://127.0.0.1:8000${file.file}`;
                            const fileDownloadUrl = `http://127.0.0.1:8000/api/v1/files/download/${file.id}/`;

                            return (
                                <li key={file.id}>
                                    <span>{file.file}</span>
                                    <div>
                                        <IconButton onClick={() => window.open(fileUrl, '_blank')} className="view-buttn">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = fileDownloadUrl;
                                            link.setAttribute('download', '');
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        }} className="download-buttn">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteFile(file.id)} className="delete-buttn">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : <p>No files uploaded</p>}
        </div>
    );
};

export default FileUpload;
