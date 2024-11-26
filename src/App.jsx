import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file here
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

import FileUploader from "./FileUploader";
import GetAddressColumn from "./GetAddressColumn";
import SearchInMondayBoard from "./SearchInMondayBoard";
import CreateSubitems from "./CreateSubitems";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [fileData, setFileData] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [totalSubitemsCount, setTotalSubitemsCount] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [startCreation, setStartCreation] = useState(false);
  const [allSubitemsCreated, setAllSubitemsCreated] = useState(false); // To track if all subitems are created

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

  const handleSubitemsCountUpdate = (increment) => {
    setTotalSubitemsCount((prevCount) => prevCount + increment);
  };

  const handleCreateSubitemsClick = () => {
    setStartCreation(true);
    setIsSearchComplete(false); // Hide button after clicking
  };

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  useEffect(() => {
    // Track when all subitems have been created
    if (totalSubitemsCount === foundItems.length) {
      setAllSubitemsCreated(true); // Mark subitems as created
    }
  }, [totalSubitemsCount, foundItems]);

  return (
    <div className="App">
      <div className="container">
        {/* File uploader component */}
        {context && <FileUploader onFileUpload={handleFileUpload} context={context} />}

        {/* Address column extraction */}
        {fileData && (
          <GetAddressColumn
            fileData={fileData}
            onAddressesExtracted={handleAddressesExtracted}
          />
        )}

        {/* Search in Monday board */}
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

        {/* Skeleton loader while the search is in progress */}
        {!isSearchComplete && fileData && <div className="skeleton-loader"></div>}

        {/* Show create subitems button if search is complete */}
        {isSearchComplete && !startCreation && (
          <button className="custom-file-input" onClick={handleCreateSubitemsClick}>
            Create Subitems
          </button>
        )}

        {/* Create subitems */}
        {startCreation && foundItems.length > 0 && (
          <>
            {foundItems.map((item) => {
              const matchedData = fileData.find((data) =>
                item.name.includes(data["INPUT: Address 1"])
              );
              if (!matchedData) {
                return null; // Skip rendering if no match
              }

              return (
                <CreateSubitems
                  key={item.id}
                  fileData={matchedData}
                  parentItemId={item.id}
                  onSubitemsCountUpdate={handleSubitemsCountUpdate}
                />
              );
            })}
            <p>Total subitems created: {totalSubitemsCount}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

