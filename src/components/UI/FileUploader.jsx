import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Assurez-vous d'installer le package 'prop-types'

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (onFileSelect) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>File selected - {selectedFile.name}</p>}
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUploader;
