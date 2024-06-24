import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams } from 'react-router-dom';

const AssignChargeback = () => {
    const { chargebackId } = useParams();
    const [users, setUsers] = useState([]);
    const [chargebacks, setChargebacks] = useState([]); // To store chargebacks and their assigned users
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch users to populate the dropdown
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://127.0.0.1:8000/api/v1/users/');
                setUsers(usersResponse.data);
                const chargebacksResponse = await axios.get('http://127.0.0.1:8000/api/v1/chargebacks/list/');
                setChargebacks(chargebacksResponse.data); // Assuming the API sends back chargebacks with user info
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
            setError('Please select a user to assign the chargeback.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.patch(
                
                `http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/assign/`,
                { assigned_to: selectedUserId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            console.log('Chargeback assigned successfully:', response.data);
            setError('');
        } catch (error) {
            console.error('Failed to assign chargeback:', error);
            setError('Failed to assign chargeback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Assign Chargeback</h3>
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

            <h4>Chargeback Assignments</h4>
            <table>
                <thead>
                    <tr>
                        <th>Chargeback ID</th>
                        <th>Title</th>
                        <th>Assigned User</th>
                    </tr>
                </thead>
                <tbody>
    {chargebacks.map((chargeback) => (
        <tr key={chargeback.id}>
            <td>{chargeback.id}</td>
            <td>{chargeback.title}</td>
            <td>{chargeback.assigned_to ? chargeback.assigned_to.email : 'Not Assigned'}</td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

export default AssignChargeback;
