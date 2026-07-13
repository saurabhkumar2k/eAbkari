import React, { useCallback, useEffect, useState } from 'react';
import { UserCheck } from 'lucide-react';
import PermitForm from '../PermitForm';
import EmptyPermitTable from '../EmptyPermitTable';
import { ChevronRightSvg } from '../../icons/PermitIcons';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5214';
const API = `${API_BASE_URL}/api/PermitPassValidity`;

const initialForm = {
  stateCode: '',
  daysIpValidity: '',
  daysIpValidityEoIssue: '',
  daysIpValidityIpRecv: '',
  eoRequired: 'Y'
};

const ImportPermitCumPass = () => {
  const [states, setStates] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadStates = useCallback(async () => {
    const response = await axios.get(`${API}/states`);
    setStates(Array.isArray(response.data) ? response.data : []);
  }, []);

  const loadRows = useCallback(async () => {
    const response = await axios.get(API);
    setRows(Array.isArray(response.data) ? response.data : []);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await Promise.all([loadStates(), loadRows()]);
      } catch (error) {
        setMessage('Unable to load permit pass validity data.');
      }
    };

    init();
  }, [loadStates, loadRows]);

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditing(false);
  };

  const validateDays = (value) => /^\d{1,2}$/.test(String(value));

  const submitForm = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!form.stateCode) {
      setMessage('Please choose the State Name');
      return;
    }
    if (!validateDays(form.daysIpValidity)) {
      setMessage('Please Enter Valid Max No. of days from the Date of Issue of IP');
      return;
    }
    if (!validateDays(form.daysIpValidityEoIssue)) {
      setMessage('Please Enter Valid Max No. of days from the Date of Issue of Export Order');
      return;
    }
    if (!validateDays(form.daysIpValidityIpRecv)) {
      setMessage('Please Enter Valid Max No. of Days from the Date of Receipt of IP');
      return;
    }

    const payload = {
      stateCode: form.stateCode,
      daysIpValidity: Number(form.daysIpValidity),
      daysIpValidityEoIssue: Number(form.daysIpValidityEoIssue),
      daysIpValidityIpRecv: Number(form.daysIpValidityIpRecv),
      eoRequired: form.eoRequired
    };

    setIsSaving(true);
    try {
      if (isEditing) {
        await axios.put(API, payload);
        window.alert('Record Updated Successfully');
      } else {
        await axios.post(API, payload);
        window.alert('Record Saved Successfully');
      }

      await loadRows();
      resetForm();
    } catch (error) {
      const apiMessage = error?.response?.data;
      setMessage(typeof apiMessage === 'string' ? apiMessage : 'Unable to save record.');
    } finally {
      setIsSaving(false);
    }
  };

  const editRow = (row) => {
    setForm({
      stateCode: row.stateCode || '',
      daysIpValidity: String(row.daysIpValidity ?? ''),
      daysIpValidityEoIssue: String(row.daysIpValidityEoIssue ?? ''),
      daysIpValidityIpRecv: String(row.daysIpValidityIpRecv ?? ''),
      eoRequired: row.eoRequired === 'N' ? 'N' : 'Y'
    });
    setIsEditing(true);
    setMessage('');
  };

  const deleteRow = async (stateCode) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await axios.delete(`${API}/${encodeURIComponent(stateCode)}`);
      await loadRows();
      window.alert('Record Deleted Successfully');
      if (form.stateCode === stateCode) {
        resetForm();
      }
    } catch (error) {
      const apiMessage = error?.response?.data;
      setMessage(typeof apiMessage === 'string' ? apiMessage : 'Unable to delete record.');
    }
  };

  return (
    <div className="import-permit-page">
      <div className="page-header-bg">
        <div className="container">
          <div className="breadcrumb-row">
            <div className="page-title-icon-box">
               <UserCheck className="page-title-icon" />
            </div>
            <div className="breadcrumb-info">
              <h2 className="page-main-heading">Import : Bulk Spirit</h2>
              <div className="breadcrumb-nav">
                <span className="breadcrumb-item">Home</span>
                <ChevronRightSvg className="breadcrumb-sep" />
                <span className="breadcrumb-item">Permit/Pass</span>
                <ChevronRightSvg className="breadcrumb-sep" />
                <span className="breadcrumb-item active">Import : Bulk Spirit</span>
              </div>
            </div>
            
            <div className="header-skyline">
               <img 
                 src="https://www.transparentpng.com/download/skyline/delhi-skyline-silhouette-png-12.png" 
                 alt="Delhi Skyline" 
                 className="skyline-silhouette" 
               />
            </div>
          </div>
        </div>
      </div>

      <div className="container page-content-area">
        <PermitForm
          states={states}
          form={form}
          onChange={onChange}
          onSubmit={submitForm}
          onReset={resetForm}
          isEditing={isEditing}
          isSaving={isSaving}
          message={message}
        />
        <EmptyPermitTable rows={rows} onEdit={editRow} onDelete={deleteRow} onRefresh={loadRows} />
      </div>

      <div className="delhi-bg-watermark">
         <img 
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=2000" 
            alt="India Gate" 
            className="bg-watermark-img"
         />
      </div>
    </div>
  );
};

export default ImportPermitCumPass;
