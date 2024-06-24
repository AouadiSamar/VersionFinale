import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import './RembourssementCreate.css'; // Ensure the CSS file is correctly linked

const RembourssementForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rembourssement, setRembourssement] = useState({
        authorization_number: '',
        title: '',
        description: '',
        amount: '',
        merchant_number: '',
        merchant_email: '',
        merchant_name: '',
        status: 'created',
        reason: ''
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get(`http://localhost:8000/api/v1/rembourssement/${id}/`)
                .then(response => {
                    setRembourssement(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching rembourssement details:', error);
                    setLoading(false);
                    setError('Failed to fetch rembourssement details');
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRembourssement(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const apiEndpoint = id ? `http://localhost:8000/api/v1/rembourssement/${id}/update/` : 'http://localhost:8000/api/v1/rembourssement/create/';
        const method = id ? 'put' : 'post';
        console.log('Submitting data:', rembourssement); // Log the data being submitted
        axios[method](apiEndpoint, rembourssement)
            .then(() => {
                navigate('/rembourssements');
            })
            .catch(error => {
                console.error('Failed to save rembourssement:', error.response?.data || error);
                console.error('Detailed Error:', error.response?.data || error); // Log detailed error
                setError('Failed to save rembourssement');
                setLoading(false);
            });
    };

    return (
        <div className="remb-section-style">
            <div className="remb-imge-container"></div>
            <div className="remb-form-container">
                <h2 className="remb-section-title">{id ? 'Edit Rembourssement' : 'Create Rembourssement'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="remb-form-label">Authorization Number:</label>
                    <input
                        name="authorization_number"
                        value={rembourssement.authorization_number}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Title:</label>
                    <input
                        name="title"
                        value={rembourssement.title}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Description:</label>
                    <textarea
                        name="description"
                        value={rembourssement.description}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={rembourssement.amount}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Merchant Number:</label>
                    <input
                        name="merchant_number"
                        value={rembourssement.merchant_number}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Merchant Email:</label>
                    <input
                        type="email"
                        name="merchant_email"
                        value={rembourssement.merchant_email}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Merchant Name:</label>
                    <input
                        name="merchant_name"
                        value={rembourssement.merchant_name}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <label className="remb-form-label">Status:</label>
                    <select
                        name="status"
                        value={rembourssement.status}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    >
                        <option value="created">Created</option>
                        <option value="sent_to_merchant">Sent to Merchant</option>
                        <option value="processing_by_SMT">Processing by SMT</option>
                        <option value="processing_by_bank">Processing by Bank</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="reactivate">Reactivate</option>
                    </select>
                    <label className="remb-form-label">Reason:</label>
                    <textarea
                        name="reason"
                        value={rembourssement.reason}
                        onChange={handleChange}
                        required
                        className="remb-form-input"
                    />
                    <div className="remb-btn-container">
                        <button type="submit" className="remb-btn-ajouter" disabled={loading}>
                            {loading ? 'Saving...' : 'Add refund'}
                        </button>
                        <button type="button" className="remb-btn-annuler" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RembourssementForm;
