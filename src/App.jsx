import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import DashboardLayout from './components/DashboardLayout'; // Import the new DashboardLayout

import SendResetEmail from './components/SendResetEmail';
import ResetPasswordForm from './components/ResetPasswordForm';

import ChargebackFilesComments from './components/Chargebacks/ChargebackFilesComments';
import RembourssementChart from './components/Rembourssements/RembourssementChart'
import NotFoundPage from './pages/NotFoundPage';
import LogoutButton from './pages/LogoutButton';
import About from './components/About';
import Create from './components/Create';
import Edit from './components/Edit';
import Delete from './components/Delete';
import CreateRole from './components/CreateRole';
import Home from './components/Home';
import ChargebackChart from './components/Chargebacks/ChargebackChart';

import UserProfile from './pages/UserProfile';
import Configuration from './components/Configuration';
import PaymentsNavigation from './components/PaymentsNavigation';
import LoginPage from './pages/LoginPage';

import ChargebackHome from './components/Chargebacks/ChargebackHome';
import ChargebackList from './components/Chargebacks/ChargebackEdit';
import ChargebackDetails from './components/Chargebacks/ChargebackDetails';
import ChargebackCreate from './components/Chargebacks/ChargebackCreate';
import AssignChargeback from './components/Chargebacks/AssignChargeback';

import FileUpload from './components/Chargebacks/FileUpload';
import Nav from './components/Chargebacks/Nav';
import Dashboard from './components/Chargebacks/Dashboard';
import Dashboard2 from './components/Rembourssements/Dashboard2';

import Header2 from './components/Chargebacks/Header2';
import ChargebackEdit from './components/Chargebacks/ChargebackEdit';
import ChangeChargebackStatus from './components/Chargebacks/ChangeChargebackStatus';
import  Chart from './components/Chart';
import RembourssementHome from './components/Rembourssements/RembourssementHome';
import RembourssementCreate from './components/Rembourssements/RembourssementCreate';
import RembourssementEdit from './components/Rembourssements/RembourssementEdit';
import RembourssementDetails from './components/Rembourssements/RembourssementDetails';
import AssignRembourssement from './components/Rembourssements/AssignRembourssement';
import ChangeRembourssementStatus from './components/Rembourssements/ChangeRembourssementStatus';
import Das from './components/Das'
function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/RembourssementChart" element={<Dashboard2><RembourssementChart/></Dashboard2>} />
          <Route path="Dashboard2" element={<Dashboard2 />} />
          <Route path="Chart" element={<Das><Chart /></Das>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<DashboardLayout><UserProfile /></DashboardLayout>} />
          <Route path="/Configuration" element={<DashboardLayout><Configuration/></DashboardLayout>} />
          <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
          <Route path="/edit-user/:id" element={<DashboardLayout><Edit /></DashboardLayout>} />
          <Route path="/delete-user/:id" element={<Delete />} />
          <Route path="/create-role" element={<DashboardLayout><CreateRole /></DashboardLayout>} />
          <Route path="/About" element={<About />} />
          <Route path="/reset-password-form/:uid/:token" element={<ResetPasswordForm />} />
          <Route path="/createuser" element={<DashboardLayout><Create /></DashboardLayout>} />
          <Route path="/send-reset-email" element={<SendResetEmail />} />
          <Route path="PaymentsNavigation" element={<PaymentsNavigation />} />
          <Route path="Nav" element={<Nav />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/chargebacks" element={<ChargebackList />} />
          <Route path="/chargebacks/create/" element={<Dashboard><ChargebackCreate mode="create" /></Dashboard>} />
          <Route path="/chargebacks/:id/edit/" element={<Dashboard><ChargebackEdit mode="edit" /></Dashboard>} />
          <Route path="/chargebacks/:id/delete" element={<ChargebackCreate mode="delete" />} />
          <Route path="/ChargebackHome" element={<Dashboard><ChargebackHome /></Dashboard>} />
          <Route path="/chargebacks/:id" element={<Dashboard><ChargebackDetails /></Dashboard>} />
          <Route path="/chargebacks/:chargebackId/change-status" element={<ChangeChargebackStatus />} />
          <Route path="/chargebacks/:chargebackId/upload" element={<FileUpload />} />
          <Route path="/chargebacks/:id/files-comments" element={<Dashboard><ChargebackFilesComments /></Dashboard>} />
          <Route path="/chargebacks/:chargebackId/assign/" element={<AssignChargeback />} />
          <Route path="/Header2" element={<Header2 />} />
          <Route path="/ChargebackChart" element={<Dashboard><ChargebackChart /></Dashboard>} />
          <Route path="/rembourssements" element={<Dashboard2><RembourssementHome /></Dashboard2>} />
          <Route path="/rembourssements/create/" element={<Dashboard2><RembourssementCreate mode="create" /></Dashboard2>} />
          <Route path="/rembourssements/:id/edit/" element={<Dashboard2><RembourssementEdit mode="edit" /></Dashboard2>} />
          <Route path="/rembourssements/:id" element={<Dashboard2><RembourssementDetails /></Dashboard2>} />
          <Route path="/rembourssements/:rembourssementId/assign/" element={<AssignRembourssement />} />
          <Route path="/rembourssements/:rembourssementId/change-status" element={<ChangeRembourssementStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
