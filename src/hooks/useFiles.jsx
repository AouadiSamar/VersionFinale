import { useState, useEffect } from 'react';
import { getChargebackFiles, uploadChargebackFile } from '../services/chargebackService';

function useFiles(chargebackId) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      const data = await getChargebackFiles(chargebackId);
      setFiles(data);
    }
    
    fetchFiles();
  }, [chargebackId]);




  async function fetchFiles() {
    const data = await getChargebackFiles(chargebackId);
    setFiles(data);
  }

  async function addFile(fileData) {
    const formData = new FormData();
    formData.append('file', fileData);
    await uploadChargebackFile(chargebackId, formData);
    fetchFiles();
  }

  return {
    files,
    addFile,
  };
}

export default useFiles;
