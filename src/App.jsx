import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file here
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

import FileUploader from "./FileUploader";
import GetAddressColumn from "./GetAddressColumn";
import SearchInMondayBoard from "./SearchInMondayBoard";
import CreateSubitemsInAlabamaBoard from "./CreateSubitemsInAlabamaBoard";
import CreateSubitemsInArkansasBoard from "./CreateSubitemsInArkansasBoard";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [fileData, setFileData] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [startCreation, setStartCreation] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // New state to track button click

  const handleFileUpload = (data) => {
    setFileData(data);
  };

  const handleAddressesExtracted = (addresses) => {
    setAddressData((prevData) => {
      const newAddresses = addresses.filter((address) => !prevData.includes(address));
      return [...prevData, ...newAddresses];
    });
  };

  const handleItemsFound = (items) => {
    setFoundItems(items);
  };

  const handleSearchComplete = () => {
    setIsSearchComplete(true);
  };

  const handleCreateSubitemsClick = () => {
    setStartCreation(true);
    setButtonClicked(true); // Set the button clicked state to true
    setIsSearchComplete(false); // Hide button after clicking
  };

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {context && <FileUploader onFileUpload={handleFileUpload} context={context} />}

        {fileData && (
          <GetAddressColumn
            fileData={fileData}
            onAddressesExtracted={handleAddressesExtracted}
          />
        )}

        {context && addressData.length > 0 && (
          <>
            <p>Total number of addresses in Excel file: {addressData.length}</p>
            <SearchInMondayBoard
              addressData={addressData}
              boardId={context.boardId}
              onItemFound={handleItemsFound}
              onSearchComplete={handleSearchComplete}
            />
          </>
        )}

        {!isSearchComplete && fileData && !buttonClicked && ( <div className="skeleton-loader"></div> )}

        {isSearchComplete && !startCreation && !buttonClicked && (
          <button
            className={`custom-file-input ${buttonClicked ? 'fade-out' : ''}`}
            onClick={handleCreateSubitemsClick}
          >
            Create Subitems
          </button>
        )}

        {startCreation && foundItems.length > 0 && (
          context.boardId == "4410835954" ? (
            <CreateSubitemsInAlabamaBoard
              foundItems={foundItems}
              fileData={fileData}
            />
          ) : (
            <CreateSubitemsInArkansasBoard
              foundItems={foundItems}
              fileData={fileData}
            />
          ) 
        )}
      </div>
    </div>
  );
};

export default App;