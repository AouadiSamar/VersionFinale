import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import './ChargebackCreate.css'; // Ensure the CSS file is correctly linked

const ChargebackForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chargeback, setChargeback] = useState({
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
            axios.get(`/api/v1/chargebacks/${id}/`)
                .then(response => {
                    setChargeback(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching chargeback details:', error);
                    setLoading(false);
                    setError('Failed to fetch chargeback details');
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChargeback(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const apiEndpoint = id ? `/api/v1/chargebacks/${id}/update/` : '/api/v1/chargebacks/';
        axios.post(apiEndpoint, chargeback)
            .then(() => {
                navigate('/ChargebackHome');
            })
            .catch(error => {
                console.error('Failed to save chargeback:', error);
                setError('Failed to save chargeback');
                setLoading(false);
            });
    };

    return (
        <div className="chargeback-section-style">
            <div className="chargeback-image-container"></div>
            <div className="chargeback-form-container">
                <h2 className="chargeback-section-title">{id ? 'Edit Chargeback' : 'Create Chargeback'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="chargeback-form-label">Authorization Number:</label>
                    <input
                        name="authorization_number"
                        value={chargeback.authorization_number}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Title:</label>
                    <input
                        name="title"
                        value={chargeback.title}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Description:</label>
                    <textarea
                        name="description"
                        value={chargeback.description}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={chargeback.amount}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Merchant Number:</label>
                    <input
                        name="merchant_number"
                        value={chargeback.merchant_number}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Merchant Email:</label>
                    <input
                        type="email"
                        name="merchant_email"
                        value={chargeback.merchant_email}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Merchant Name:</label>
                    <input
                        name="merchant_name"
                        value={chargeback.merchant_name}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <label className="chargeback-form-label">Status:</label>
                    <select
                        name="status"
                        value={chargeback.status}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    >
                        <option value="created">Created</option>
                    </select>
                    <label className="chargeback-form-label">Reason:</label>
                    <textarea
                        name="reason"
                        value={chargeback.reason}
                        onChange={handleChange}
                        required
                        className="chargeback-form-input"
                    />
                    <div className="chargeback-btn-container">
                        <button type="submit" className="chargeback-btn-ajouter" disabled={loading}>
                            {loading ? 'Saving...' : 'Add'}
                        </button>
                        <button type="button" className="chargeback-btn-annuler" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChargebackForm;
