import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import './FileUpload2.css';
import './RembourssementDetails .css';import { IconButton } from '@mui/material';




const FileUpload = () => {
    const { id: rembourssementId } = useParams();
    const [rembourssement, setRembourssement] = useState(null);
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

        console.log("Uploading file for Rembourssement ID:", rembourssementId);

        axios.post(`http://127.0.0.1:8000/api/v1/rembourssement/${rembourssementId}/upload/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("File uploaded successfully", response.data);
            navigate(`/rembourssements/${rembourssementId}`);
        })
        .catch(error => {
            console.error("Failed to upload file:", error.response.data);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/rembourssement/${rembourssementId}/`);
                console.log(data);
                setRembourssement(data);
                setFiles(data.files || []);
            } catch (error) {
                console.error('Failed to fetch rembourssement details:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, [rembourssementId]);

    if (loading) return <p>Loading...</p>;
    if (!rembourssement) return <p>No rembourssement found</p>;

    const deleteFile = async (fileId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/v1/files/${fileId}/`);
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
        <div className="rembou-container">
            <div className="l-image2"></div>

            <div className="upload-butp-container">
                <label htmlFor="file-upload" className="upload-butp">Select File</label>
                <input type="file" id="file-upload" onChange={onFileChange} />
                <button className="butp" onClick={onFileUpload}>Upload</button>
            </div>

            <h3>Files</h3>
            {files.length > 0 ? (
                <div className="file-list">
                    <ul>
                        {files.map(file => {
                            const fileUrl = `http://127.0.0.1:8000${file.file}`;
                            const fileDownloadUrl = `http://127.0.0.1:8000/api/v1/files/${file.id}/download/`;

                            return (
                                <li key={file.id}>
                                    <span>{file.file}</span>
                                    <div>
                                        <IconButton onClick={() => window.open(fileUrl, '_blank')} className="view-butp">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = fileDownloadUrl;
                                            link.setAttribute('download', '');
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        }} className="download-butp">
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteFile(file.id)} className="delete-butp">
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
