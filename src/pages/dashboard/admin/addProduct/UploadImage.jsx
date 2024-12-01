import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../../utils/baseURL';

const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false); // State to track upload progress
    const [url, setUrl] = useState(""); // State to store the uploaded image URL

    // Function to convert a file to Base64 format
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file); // Read the file as a Base64 string

            // Resolve the Base64 string once reading is complete
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            // Reject in case of an error
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Function to upload a single image to the server
    const uploadSingleImage = (base64) => {
        setLoading(true); // Set loading state to true while uploading
        axios
            .post(`${getBaseUrl()}/uploadImage`, { image: base64 }) // Send POST request to the server
            .then((res) => {
                const imageUrl = res.data; // Get the uploaded image URL from the response
                setUrl(imageUrl); // Update the URL state
                alert("Image uploaded successfully"); // Alert success message
                setImage(imageUrl); // Pass the image URL to the parent component via `setImage`
            })
            .then(() => setLoading(false)) // Set loading state to false once done
            .catch((error) => {
                console.error(error); // Log any errors
                setLoading(false); // Reset loading state
            });
    };

    // Handle image file input
    const uploadImage = async (event) => {
        const files = event.target.files;

        // If only one file is selected, process it
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]); // Convert the file to Base64
            uploadSingleImage(base64); // Upload the single image
            return;
        }

        // If multiple files are selected, convert them all to Base64 (optional logic for multiple uploads)
        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    };

    return (
        <div>
            {/* Label for the file input */}
            <label htmlFor={name}>Upload Image</label>
            <input
                type="file" // Input type for file selection
                name={name} // Name for the input
                id={name} // ID for accessibility
                onChange={uploadImage} // Handle file selection
                className="add-product-InputCSS" // CSS class for styling
            />

            {/* Show loading indicator while the image is uploading */}
            {loading && (
                <div className="mt-2 text-sm text-blue-600">
                    Product uploading...
                </div>
            )}

            {/* Display the uploaded image URL and a preview if the upload is successful */}
            {url && (
                <div className="mt-2 text-sm text-green-600">
                    <p>Image uploaded successfully!</p>
                    <img src={url} alt="uploaded-image" /> {/* Image preview */}
                </div>
            )}
        </div>
    );
};

export default UploadImage;
