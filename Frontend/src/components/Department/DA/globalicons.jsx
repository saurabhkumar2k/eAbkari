import React from 'react';
import { 
Home, Folder, Database, Ticket, Tag, PieChart, Settings, Search, LogOut
} from 'lucide-react';

export const HomeSvg = ({ className }) => <Home className={className} />;
export const FolderSvg = ({ className }) => <Folder className={className} />;
export const DatabaseSvg = ({ className }) => <Database className={className} />;
export const TicketSvg = ({ className }) => <Ticket className={className} />;
export const TagSvg = ({ className }) => <Tag className={className} />;
export const PieChartSvg = ({ className }) => <PieChart className={className} />;
export const SettingsSvg = ({ className }) => <Settings className={className} />;
export const LogOutSvg = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17l5-5-5-5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);