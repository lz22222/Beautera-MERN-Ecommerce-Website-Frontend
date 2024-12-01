import React from 'react';

// A reusable TextInput component
const TextInput = ({ label, name, value, onChange, type = "text", placeholder }) => {
  return (
    <div>
      {/* Label for the input */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* Input field */}
      <input
        type={type}           // Input type (e.g., text, number, email)
        name={name}           // Name attribute for the input
        id={name}             // ID for accessibility
        value={value}         // Controlled value for the input
        onChange={onChange}   // Function to handle value change
        className="add-product-InputCSS" // Styling class
      />
    </div>
  );
};

export default TextInput;
