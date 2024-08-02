import React from 'react';
interface FieldComponentProps {
    category: string;
    field: string;
    label: string;
    value: string;
    error: string | null;
    editingField: string | null;
    handleChange: (category: string, field: string, value: string) => void;
    handleEditField: (category: string, field: string) => void;
    handleSaveField: (category: string, field: string) => void;
}
declare const FieldComponent: React.FC<FieldComponentProps>;
export default FieldComponent;
