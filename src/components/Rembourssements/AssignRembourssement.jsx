import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams } from 'react-router-dom';

const AssignRembourssement = () => {
    const { rembourssementId } = useParams();
    const [users, setUsers] = useState([]);
    const [rembourssements, setRembourssements] = useState([]); // To store rembourssements and their assigned users
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch users to populate the dropdown
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://127.0.0.1:8000/api/v1/users/');
                setUsers(usersResponse.data);
                const rembourssementsResponse = await axios.get('http://127.0.0.1:8000/api/v1/rembourssement/list/');
                setRembourssements(rembourssementsResponse.data); // Assuming the API sends back rembourssements with user info
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to load data.');
            }
        };
        
        fetchData();
    }, []);

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleAssign = async () => {
        if (!selectedUserId) {
            setError('Please select a user to assign the rembourssement.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/v1/rembourssementzz/${rembourssementId}/assign/`,
                { assigned_to: selectedUserId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            console.log('Rembourssement assigned successfully:', response.data);
            setError('');
        } catch (error) {
            console.error('Failed to assign rembourssement:', error);
            setError('Failed to assign rembourssement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Assign Rembourssement</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select value={selectedUserId} onChange={handleUserChange}>
                <option value="">Select a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.email}</option>
                ))}
            </select>
            <button onClick={handleAssign} disabled={loading}>
                {loading ? 'Assigning...' : 'Assign'}
            </button>

            <h4>Rembourssement Assignments</h4>
            <table>
                <thead>
                    <tr>
                        <th>Rembourssement ID</th>
                        <th>Title</th>
                        <th>Assigned User</th>
                    </tr>
                </thead>
                <tbody>
                    {rembourssements.map((rembourssement) => (
                        <tr key={rembourssement.id}>
                            <td>{rembourssement.id}</td>
                            <td>{rembourssement.title}</td>
                            <td>{rembourssement.assigned_to ? rembourssement.assigned_to.email : 'Not Assigned'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignRembourssement;
