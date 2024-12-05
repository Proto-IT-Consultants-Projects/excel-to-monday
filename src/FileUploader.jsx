import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import configForAlabamaBoard from "./configForAlabamaBoard.json";
import './fileUploader.css';

const FileUploader = ({ onFileUpload, context }) => {
  const [fileData, setFileData] = useState(null);
  const [totalSubitems, setTotalSubitems] = useState(0);
  const [processingMessage, setProcessingMessage] = useState("");

  const handleFileRead = (file) => {
    const reader = new FileReader();
    setProcessingMessage("File is being processed...");
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setFileData(jsonData);
      calculateTotalSubitems(jsonData);
      setProcessingMessage("File Processed Completely!");
      onFileUpload(jsonData); // Pass file data to parent component
    };
    reader.readAsBinaryString(file);
  };

  const calculateTotalSubitems = (file) => {
    const subitemTitle = configForAlabamaBoard["subitem_titles"];
    let count = 0;
    for (let i = 0; i < file.length; i++) {
      const row = file[i];
      for (const [ index,title ] of Object.entries(subitemTitle)) {
        if (row[title] && row[title] !== "") {
          count ++;
        }
      }
    }

    setTotalSubitems(count);
    return;
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
          <p className="message-display">{processingMessage || "Board Selected!"}</p>
          { 
            processingMessage === "File Processed Completely!" ? (
              <p>{`Subitems to be created: ${totalSubitems}`}</p>
            ) : ""
          }
        </div>
      ) : (
        <p style={{ fontSize: "20px" }}>No Board is Selected</p>
      )}
    </div>
  );
};

export default FileUploader;
