import React, { useState } from 'react';

const App = () => {
 const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    debtorInfo: '',
    additionalDetails: '',
    documentUrl: '', // To store the uploaded document URL
  });

  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Upload the file to Cloudinary
    const cloudName = 'dpttzjwpr'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'PDFDATA'; // Replace with your unsigned upload preset

    const formDataToUpload = new FormData();
    formDataToUpload.append('file', selectedFile);
    formDataToUpload.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formDataToUpload,
      });

      const data = await response.json();

      if (data.secure_url) {
        // Update the formData with the uploaded document URL
        setFormData((prevData) => ({
          ...prevData,
          documentUrl: data.secure_url,
        }));

        // Proceed with form submission (e.g., send formData to your backend)
        // Example:
        // await fetch('/api/submit-form', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });

        alert('Form submitted successfully!');
      } else {
        alert('Failed to upload the document.');
      }
    } catch (error) {
      console.error('Error uploading the document:', error);
      alert('An error occurred while uploading the document.');
    }
  };
























  
  return (
       
  

  );
};

export default App;
