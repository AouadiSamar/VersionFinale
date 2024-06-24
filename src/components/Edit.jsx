import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css';

const EditUser = () => {
  const { id: userId } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const rolesResponse = await AxiosInstance.get('/api/v1/users/roles/');
        console.log('Roles Response:', rolesResponse.data);
        setRoles(rolesResponse.data);
  
        const userResponse = await AxiosInstance.get(`/api/v1/users/${userId}/`);
        console.log('User Response:', userResponse.data);
        const userData = userResponse.data;
  
        if (userData) {
          setValue('first_name', userData.first_name);
          setValue('last_name', userData.last_name);
          setValue('email', userData.email);
          setValue('phone_number', userData.phone_number);
          setValue('role', userData.roles.length > 0 ? userData.roles[0].id : '');
          setValue('is_active', userData.is_active);
        } else {
          console.log('User data is null');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInitialData();
  }, [userId, setValue]);
  
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      roles: data.role ? [parseInt(data.role)] : [],
      is_active: data.is_active,
    };

    try {
      await AxiosInstance.put(`/api/v1/users/update/${userId}/`, payload);
      navigate('/home');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <section className="section-style">
      <div className="image-container"></div>
      <div className="form-container">
        <h2 className="section-title">Update User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="first_name" className="form-labe">FirstName</label>
            <input {...register('first_name')} placeholder="First Name*" className="form-input" />
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="form-labe">LastName</label>
            <input {...register("last_name")} placeholder="LastName*" className="form-input" />
            {errors.last_name && <p>{errors.last_name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="form-labe">Email</label>
            <input {...register('email')} placeholder="Email*" className="form-input" />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone_number" className="form-labe">PhoneNumber</label>
            <input {...register('phone_number')} placeholder="PhoneNumber*" className="form-input" />
            {errors.phone_number && <p>{errors.phone_number.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="form-labe">Roles</label>
            <select {...register('role')} className="form-input">
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="is_active" className="form-labe">Active Status:</label>
            <input type="checkbox" {...register('is_active', { valueAsBoolean: true })} />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-ajouter">Update</button>
            <button type="button" className="btn-annuler" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
