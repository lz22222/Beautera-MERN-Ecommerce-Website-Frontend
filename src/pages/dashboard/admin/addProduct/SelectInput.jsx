import React from 'react';

// A reusable SelectInput component
const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div>
            {/* Label for the select input */}
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            {/* Select dropdown */}
            <select
                name={name} // Name attribute for the select input
                id={name}   // ID for accessibility
                value={value} // Controlled value for the dropdown
                onChange={onChange} // Function to handle value change
                className="add-product-InputCSS" // Styling class
            >
                {/* Map through the options array to create <option> elements */}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
