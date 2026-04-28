import React, { useState, useEffect } from 'react';
import '../../Styles/Admin.css';

export default function BrandMasterScreen() {
  const [form, setForm] = useState({
    liquorCategory: '',
    kindOfLiquor: 'Country Liquor(CL)',
    liquorType: 'Country Liquor',
    oldBrandId: '',
    brandCode: '',
    quartsMeasure: '',
    brandName: ''
  });

  const [liquorCategories, setLiquorCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/admin/liquor-categories')
      .then(response => response.json())
      .then(data => {
        setLiquorCategories(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, liquorCategory: data[0].liquorCatCode }));
        }
      })
      .catch(error => console.error('Error fetching liquor categories:', error));
  }, []);

  const rows = [
    'BAHUBALI',
    'EMPIRE NO.1 MOTA SANTARA SPICED COUNTRY LIQUOR',
    'GULAB',
    'LAL GULAB',
    'NARANGI',
    'SHAHI ORANGE',
    'SUPER HIMMAT SANTRA',
    'TEST 20ROH'
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('Saved successfully');
  };

  return (
    <div className='admin-container'>
      <div className='admin-card'>
        <div className='admin-header'>
          <h1 className='admin-title'>Liquor Brand Master</h1>
          <div className='admin-badge'>
            Brand Master
          </div>
        </div>

        <div className='admin-grid'>
          <div className='form-section'>
            <Field label='Liquor Category'>
             <select
  name='liquorCategory'
  value={form.liquorCategory}
  onChange={handleChange}
  className='form-control'
>
  <option value="">--Select--</option>

  {liquorCategories.map(item => (
    <option key={item.liquorCatCode} value={item.liquorCatCode}>
      {item.category?.trim()}
    </option>
  ))}
</select>
            </Field>

            <Field label='Kind of Liquor'>
              <select
                name='kindOfLiquor'
                value={form.kindOfLiquor}
                onChange={handleChange}
                className='form-control'
              >
                <option>Country Liquor(CL)</option>
              </select>
            </Field>

            <Field label='Liquor Type'>
              <select
                name='liquorType'
                value={form.liquorType}
                onChange={handleChange}
                className='form-control'
              >
                <option>Country Liquor</option>
              </select>
            </Field>

            <Field label='Old Brand Id'>
              <input
                name='oldBrandId'
                value={form.oldBrandId}
                onChange={handleChange}
                className='form-control'
              />
            </Field>

            <Field label='Brand Code'>
              <select
                name='brandCode'
                value={form.brandCode}
                onChange={handleChange}
                className='form-control'
              >
                <option value=''>--Select--</option>
                <option>B001</option>
                <option>B002</option>
              </select>
            </Field>

            <Field label='Quarts Measure'>
              <input
                name='quartsMeasure'
                value={form.quartsMeasure}
                onChange={handleChange}
                className='form-control'
              />
            </Field>

            <Field label='Brand Name'>
              <input
                name='brandName'
                value={form.brandName}
                onChange={handleChange}
                className='form-control'
              />
            </Field>

            <div className='form-actions'>
              <button className='btn btn-cancel'>Cancel</button>
              <button
                onClick={handleSave}
                className='btn btn-save'
              >
                Save
              </button>
            </div>
          </div>

          <div className='table-container'>
            <div className='table-actions'>
              <button className='btn-pdf'>Print To PDF</button>
            </div>

            <div className='table-wrapper'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Liquor</th>
                    <th>Brand Name</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {index === 0 ? 'CL - CL - Country Liquor' : ''}
                      </td>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className='form-group'>
      <label className='form-label'>{label}</label>
      <div>
        {children}
      </div>
    </div>
  );
}
