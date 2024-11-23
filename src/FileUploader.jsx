import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import './styles/fileUploader.css'

const FileUploader = ({ onFileUpload, context }) => {
  const [fileData, setFileData] = useState(null);

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setFileData(jsonData); // Store data in state
      onFileUpload(jsonData); // Pass file data to parent component
    };
    reader.readAsBinaryString(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementsByTagName('p').innerText = 'File Parsing ...';
      handleFileRead(file);
    }
  };

  return (
    <div className='file-uploader'>
      {context.boardId ? (
        <div>
          <label className='custom-file-input'>
            Upload File
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            /> 
          </label> 
          <p style={{alignItems: "center"}}>Board Selected!</p>
        </div>
      ) : ( 
        <p style={{fontSize: "20px"}}>No Board is Selected</p> 
      )}
    </div>
  );
};

export default FileUploader;
