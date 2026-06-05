import React from 'react';
import { UserCheck } from 'lucide-react';
import PermitForm from '../PermitForm';
import EmptyPermitTable from '../EmptyPermitTable';
import { ChevronRightSvg } from '../../icons/PermitIcons';

const ImportPermitCumPass = () => {
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
        <PermitForm />
        <EmptyPermitTable />
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
