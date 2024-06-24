import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios'; // Assurez-vous que AxiosInstance est correctement configuré
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Create.css';

function AddUser() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  console.log('Fetching roles from:', '/api/v1/users/roles/');
  useEffect(() => {
    const fetchRoles = async () => {
      try {
    
        const response =    await AxiosInstance.get('/api/v1/users/roles/');// Utilisez l'URL complète pour des tests
        setRoles(response.data);
        console.log('Rôles récupérés:', response.data); // Ajoutez ceci pour déboguer
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchRoles();
  }, []);
  
  // Form validation schema
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    description: yup.string(),
    roles: yup.array().min(1, 'Select at least one role'),
  });

  // Use useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const userData = {
      ...data,
      phone_number: data.phoneNumber,
      first_name: data.firstName,
      last_name: data.lastName,
      roles: data.roles.map(role => parseInt(role)),
    };
    
    console.log('Sending user data:', userData);
  
    try {
      const response = await AxiosInstance.post('/api/v1/users/usersc/', userData);
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error('There was an error creating the user:', error.response ? error.response : error);
      alert('Erreur lors de la création de l’utilisateur. Vérifiez la console pour plus de détails.');
  }
  
};
  
  
return (
  <section className="section-style">
    <div className="image-container"></div>
    <div className="form-container">
      <h2 className="section-title">Add user</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-labell" htmlFor="firstName">FirstName</label>
          <input {...register('firstName')} className="form-input" type="text" placeholder="First name*" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-labell" htmlFor="lastName">LastName</label>
          <input {...register('lastName')} className="form-input" type="text" placeholder="Last Name*" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-labell" htmlFor="email">Email</label>
          <input {...register('email')} className="form-input" type="email" placeholder=" email*" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-labell" htmlFor="phoneNumber">Phone number</label>
          <input {...register('phoneNumber')} className="form-input" type="tel" placeholder="Phone number*" />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-labell" htmlFor="roles">Roles</label>
          <select {...register('roles')} className="form-input" multiple>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.roles && <p>{errors.roles.message}</p>}
        </div>
        <div className="btn-container">
          <button className="btn-ajouter" type="submit">Add</button>
          <button className="btn-annuler" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  </section>
);
}

export default AddUser;