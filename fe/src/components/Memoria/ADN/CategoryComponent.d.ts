import React from 'react';
interface CategoryComponentProps {
    section: {
        title: string;
        key: string;
        fields: [string, string][];
    };
    formData: Record<string, any>;
    expandedSections: Record<string, boolean>;
    handleChange: (category: string, field: string, value: string) => void;
    toggleSection: (section: string) => void;
    errors: Record<string, Record<string, string>>;
    editingField: string | null;
    handleEditField: (category: string, field: string) => void;
    handleSaveField: (category: string, field: string) => void;
}
declare const CategoryComponent: React.FC<CategoryComponentProps>;
export default CategoryComponent;
