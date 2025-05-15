import React, { useState } from 'react';

const App = () => {
const [selectedFile, setSelectedFile] = useState(null);
  const [documentUrl, setDocumentUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

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
        setDocumentUrl(data.secure_url);
        alert('File uploaded successfully!');
        // Proceed with further actions, e.g., sending the URL to your backend
      } else {
        alert('Failed to upload the document.');
      }
    } catch (error) {
      console.error('Error uploading the document:', error);
      alert('An error occurred while uploading the document.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="text-center p-0 m-0 bg-gray-100">
          <h1 className="text-[60px] font-oswald mb-6 text-slate-800 tracking-wide">
            Submit a Debtor
          </h1>
          <p className="text-lg font-bold text-gray-600 max-w-2xl mx-auto">
            Help us keep the industry informed. Use the form below to report companies or individuals who owe you money.
            Your contribution strengthens the network and promotes accountability across the board.
          </p>
        </section>

        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[1500px]">
          <h1 className="text-5xl font-oswald text-[#222222] mb-6 border-b-2 border-[#222222] pb-4">
            Freight Claim Recovery Submission
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Documentation*
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  name="documentFile"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <p className="text-xs mt-1 text-gray-600">
                  Required: Bill of Lading, Rate Confirmation, Invoice (PDF/JPEG/PNG)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a1a1a] text-white py-4 px-6 rounded-lg shadow-lg hover:bg-[#333333] transition-all duration-300 font-semibold text-lg flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Initiate Recovery Process
            </button>
          </form>

          {documentUrl && (
            <div className="mt-4">
              <p className="text-green-600">Uploaded Document URL:</p>
              <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {documentUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;