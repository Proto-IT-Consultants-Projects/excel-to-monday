// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import mondaySdk from "monday-sdk-js";
// import "monday-ui-react-core/dist/main.css";

// import FileUploader from "./FileUploader";
// import GetAddressColumn from "./GetAddressColumn";
// import SearchInMondayBoard from "./SearchInMondayBoard";
// import CreateSubitems from "./CreateSubitems";

// const monday = mondaySdk();

// const App = () => {
//   const [context, setContext] = useState();
//   const [fileData, setFileData] = useState(null);
//   const [addressData, setAddressData] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [totalSubitemsCount, setTotalSubitemsCount] = useState(0); // Use state for UI updates

//   const handleFileUpload = (data) => {
//     setFileData(data);
//   };

//   const handleAddressesExtracted = (addresses) => {
//     setAddressData((prevData) => {
//       const newAddresses = addresses.filter((address) => !prevData.includes(address));
//       return [...prevData, ...newAddresses];
//     });
//   };

//   const handleItemsFound = (items) => {
//     setFoundItems(items);
//   };

//   const handleSubitemsCountUpdate = (increment) => {
//     // Ensure updates occur in sequence
//     setTotalSubitemsCount((prevCount) => prevCount + increment);
//   };

//   useEffect(() => {
//     monday.execute("valueCreatedForUser");
//     monday.listen("context", (res) => {
//       setContext(res.data);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <div className="container">
//         {context && <FileUploader onFileUpload={handleFileUpload} context={context} />}
//         {fileData && (
//           <GetAddressColumn
//             fileData={fileData}
//             onAddressesExtracted={handleAddressesExtracted}
//           />
//         )}
//         {context && addressData.length > 0 && (
//           <>
//             <p>Total number of addresses in Excel file: {addressData.length}</p>
//             <SearchInMondayBoard
//               addressData={addressData}
//               boardId={context.boardId}
//               onItemFound={handleItemsFound}
//             />
//           </>
//         )}
//         {context && foundItems.length > 0 && (
//           <>
//             {foundItems.map((item) => {
//               const matchedData = fileData.find((data) =>
//                 item.name.includes(data["INPUT: Address 1"])
//               );
//               if (!matchedData) {
//                 return null; // Skip rendering if no match
//               }

//               return (
//                 <CreateSubitems
//                   key={item.id}
//                   fileData={matchedData}
//                   parentItemId={item.id}
//                   onSubitemsCountUpdate={handleSubitemsCountUpdate}
//                 />
//               );
//             })}
//             <p>Total subitems created: {totalSubitemsCount}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import mondaySdk from "monday-sdk-js";
// import "monday-ui-react-core/dist/main.css";

// import FileUploader from "./FileUploader";
// import GetAddressColumn from "./GetAddressColumn";
// import SearchInMondayBoard from "./SearchInMondayBoard";
// import CreateSubitems from "./CreateSubitems";

// const monday = mondaySdk();

// const App = () => {
//   const [context, setContext] = useState();
//   const [fileData, setFileData] = useState(null);
//   const [addressData, setAddressData] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [totalSubitemsCount, setTotalSubitemsCount] = useState(0); // Total count of subitems
//   const [showCreateButton, setShowCreateButton] = useState(false); // To show the "Create Subitems" button
//   const [startCreation, setStartCreation] = useState(false); // To trigger subitem creation

//   const handleFileUpload = (data) => {
//     setFileData(data);
//   };

//   const handleAddressesExtracted = (addresses) => {
//     setAddressData((prevData) => {
//       const newAddresses = addresses.filter((address) => !prevData.includes(address));
//       return [...prevData, ...newAddresses];
//     });
//   };

//   const handleItemsFound = (items) => {
//     setFoundItems(items);
//     setShowCreateButton(true); // Enable the "Create Subitems" button once search is complete
//   };

//   const handleSubitemsCountUpdate = (increment) => {
//     setTotalSubitemsCount((prevCount) => prevCount + increment); // Update count incrementally
//   };

//   const handleCreateSubitemsClick = () => {
//     setStartCreation(true); // Start the subitem creation process
//     setShowCreateButton(false); // Hide the button after clicking
//   };

//   useEffect(() => {
//     monday.execute("valueCreatedForUser");
//     monday.listen("context", (res) => {
//       setContext(res.data);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <div className="container">
//         {context && <FileUploader onFileUpload={handleFileUpload} context={context} />}
//         {fileData && (
//           <GetAddressColumn
//             fileData={fileData}
//             onAddressesExtracted={handleAddressesExtracted}
//           />
//         )}
//         {context && addressData.length > 0 && (
//           <>
//             <p>Total number of addresses in Excel file: {addressData.length}</p>
//             <SearchInMondayBoard
//               addressData={addressData}
//               boardId={context.boardId}
//               onItemFound={handleItemsFound}
//             />
//           </>
//         )}
//         {showCreateButton && (
//           <button onClick={handleCreateSubitemsClick}>Create Subitems</button>
//         )}
//         {startCreation && foundItems.length > 0 && (
//           <>
//             {foundItems.map((item) => {
//               const matchedData = fileData.find((data) =>
//                 item.name.includes(data["INPUT: Address 1"])
//               );
//               if (!matchedData) {
//                 return null; // Skip rendering if no match
//               }

//               return (
//                 <CreateSubitems
//                   key={item.id}
//                   fileData={matchedData}
//                   parentItemId={item.id}
//                   onSubitemsCountUpdate={handleSubitemsCountUpdate}
//                 />
//               );
//             })}
//             <p>Total subitems created: {totalSubitemsCount}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

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
  const [foundItems, setFoundItems] = useState([]);
  const [totalSubitemsCount, setTotalSubitemsCount] = useState(0); // Total count of subitems
  const [isSearchComplete, setIsSearchComplete] = useState(false); // Flag to indicate search completion
  const [startCreation, setStartCreation] = useState(false); // To trigger subitem creation

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
    setIsSearchComplete(true); // Indicate search is complete
  };

  const handleSubitemsCountUpdate = (increment) => {
    setTotalSubitemsCount((prevCount) => prevCount + increment); // Update count incrementally
  };

  const handleCreateSubitemsClick = () => {
    setStartCreation(true); // Start the subitem creation process
    setIsSearchComplete(false); // Hide the button after clicking
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
            <p style={{display: "block"}}>Total number of addresses in Excel file: {addressData.length}</p>
            <SearchInMondayBoard
              addressData={addressData}
              boardId={context.boardId}
              onItemFound={handleItemsFound}
              onSearchComplete={handleSearchComplete} // Notify when search is complete
            />
          </>
        )}
        {isSearchComplete && (
          <button className="custom-file-input" onClick={handleCreateSubitemsClick}>Create Subitems</button>
        )}
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
