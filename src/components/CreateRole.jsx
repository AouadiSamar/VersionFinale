import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './CreateRole.css';

function CreateRole() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/permissions/');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchPermissions();

    const fetchRoles = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/roles/');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const schema = yup.object().shape({
    name: yup.string().required('Role name is required'),
    description: yup.string().optional(),
    permissions: yup.array().min(1, 'Select at least one permission'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const roleData = {
      name: data.name,
      description: data.description,
      permissions: permissions.filter(p => p.enabled).map(p => p.id),
    };
    try {
      await AxiosInstance.post('/api/v1/users/rolesc/', roleData);
      navigate('/home');
    } catch (error) {
      console.error('Error creating role:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-and-list-section">
        <section className="form-section">
          <h2 className="section-title">Add role</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">Role name</label>
              <input {...register('name')} type="text" placeholder="Role Name*" />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea {...register('description')} placeholder="Description (facultatif)" />
            </div>
            <div className="permissions-section">
              <h3>Specify the permissions associated with this role:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Enabled</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission, index) => (
                    <tr key={permission.id}>
                      <td>{permission.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={permission.enabled || false}
                          onChange={e => {
                            const updatedPermissions = [...permissions];
                            updatedPermissions[index].enabled = e.target.checked;
                            setPermissions(updatedPermissions);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btn-container">
              <button className="btn-annuler" type="button" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn-ajouter" type="submit">Add</button>
            </div>
          </form>
        </section>
        <section className="list-section">
          <h2 className="section-title">Roles </h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default CreateRole;
