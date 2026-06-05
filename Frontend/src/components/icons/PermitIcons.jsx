import React from 'react';
import {
  Filter,
  Trash2,
  Save,
  Printer,
  Search,
  Calendar,
  MapPin,
  XCircle,
  ChevronRight
} from "lucide-react";

export const ChevronRightSvg = ({ className }) => (
  <ChevronRight className={className} />
);
export const FilterSvg = ({ className }) => <Filter className={className} />;
export const ClearSvg = ({ className }) => <Trash2 className={className} />;
export const SaveSvg = ({ className }) => <Save className={className} />;
export const PrintSvg = ({ className }) => <Printer className={className} />;
export const SearchIconSvg = ({ className }) => <Search className={className} />;
export const CalendarSvg = ({ className }) => <Calendar className={className} />;
export const MapPinSvg = ({ className }) => <MapPin className={className} />;
export const XCircleSvg = ({ className }) => <XCircle className={className} />;

