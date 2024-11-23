import React, { useState, useEffect } from "react";
import "./App.css";
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
  const [foundItems, setFoundItems] = useState([]); // Updated to hold multiple items

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
    setFoundItems(items); // Update state with all found items
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
        {fileData && <GetAddressColumn fileData={fileData} onAddressesExtracted={handleAddressesExtracted} />}
        {context && addressData.length > 0 && (
          <SearchInMondayBoard
            addressData={addressData}
            boardId={context.boardId}
            onItemFound={handleItemsFound}
          />
        )}
        {context && foundItems.length > 0 && (
          
          foundItems.map((item) => {
            console.log("Item: ", item);
            const matchedData = fileData.find((data) =>
              item.name.includes(data["INPUT: Address 1"]));
            if (!matchedData) {
              console.log(`No match found for item: ${item.name}`);
              return null;  // Skip rendering if no match
            }

            return (
              <CreateSubitems
                key={item.id}
                fileData={matchedData}
                parentItemId={item.id}
                boardId={context.boardId}
                addressData={item.name}
              />
            );
          })
        )}

      </div>
    </div>
  );
};

export default App;
