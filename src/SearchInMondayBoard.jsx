// import React, { useEffect, useState } from 'react';
// import mondaySdk from 'monday-sdk-js';

// const monday = mondaySdk();

// const SearchInMondayBoard = ({ addressData, boardId, onItemFound }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);

//   const findAddressInBoard = async (address, boardId) => {
//     console.log('Address:', address);
//     try {
//       const response = await monday.api(
//         `query {
//           boards(ids: ${boardId}) {
//             items_page(query_params: {rules: [{column_id: "name", compare_value: "${address}", operator: contains_text}]}) {
//               cursor
//               items {
//                 id
//                 name
//                 column_values {
//                   id
//                   text
//                   column {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }`
//       );

//       const items = response.data.boards[0]?.items_page.items[0] || [];

//       if (items) {
//         return {
//           id: items.id,
//           name: items.name,
//         };
//       }
//       console.log("No match found for:", address);
//       return null;
//     } catch (error) {
//       console.error("Error fetching data from Monday.com:", error);
//       return null;
//     }
//   };

//   const processAddresses = async () => {
//     setIsLoading(true);
//     const results = [];

//     for (const address of addressData) {
//       const result = await findAddressInBoard(address, boardId);
//       if (result) {
//         results.push(result);
//         console.dir(results);
//       }
//     }

//     setSearchResults(results);
//     setIsLoading(false);

//     if (onItemFound) {
//       onItemFound(results);
//     }
//   };

//   useEffect(() => {
//     if (addressData.length > 0 && boardId) {
//       processAddresses();
//     }
//   }, [addressData, boardId]);

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <p>Search completed.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInMondayBoard;

// import React, { useEffect, useState } from "react";
// import mondaySdk from "monday-sdk-js";

// const monday = mondaySdk();

// const SearchInMondayBoard = ({ addressData, boardId, onItemFound }) => {
//   const [currentCount, setCurrentCount] = useState(0); // For real-time count

//   const findAddressInBoard = async (address, boardId) => {
//     console.log("Address:", address);
//     try {
//       const response = await monday.api(
//         `query {
//           boards(ids: ${boardId}) {
//             items_page(query_params: {rules: [{column_id: "name", compare_value: "${address}", operator: contains_text}]}) {
//               cursor
//               items {
//                 id
//                 name
//                 column_values {
//                   id
//                   text
//                   column {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }`
//       );

//       const items = response.data.boards[0]?.items_page.items[0] || [];
//       if (items) {
//         return {
//           id: items.id,
//           name: items.name,
//         };
//       }
//       console.log("No match found for:", address);
//       return null;
//     } catch (error) {
//       console.error("Error fetching data from Monday.com:", error);
//       return null;
//     }
//   };

//   const processAddresses = async () => {
//     for (const address of addressData) {
//       const result = await findAddressInBoard(address, boardId);
//       if (result) {
//         setCurrentCount((prevCount) => prevCount + 1); // Increment count
//         onItemFound((prevItems) => [...prevItems, result]); // Add to found items
//       }
//     }
//   };

//   useEffect(() => {
//     if (addressData.length > 0 && boardId) {
//       processAddresses();
//     }
//   }, [addressData, boardId]);

//   return (
//     <div>
//       <p>Total number of addresses found in Monday board: {currentCount}</p>
//     </div>
//   );
// };

// export default SearchInMondayBoard;

// import React, { useEffect, useState } from "react";
// import mondaySdk from "monday-sdk-js";

// const monday = mondaySdk();

// const SearchInMondayBoard = ({ addressData, boardId, onItemFound, onSearchComplete }) => {
//   const [currentCount, setCurrentCount] = useState(0); // For real-time count

//   const findAddressInBoard = async (address, boardId) => {
//     console.log("Address:", address);
//     try {
//       const response = await monday.api(
//         `query {
//           boards(ids: ${boardId}) {
//             items_page(query_params: {rules: [{column_id: "name", compare_value: "${address}", operator: contains_text}]}) {
//               cursor
//               items {
//                 id
//                 name
//                 column_values {
//                   id
//                   text
//                   column {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }`
//       );

//       const items = response.data.boards[0]?.items_page.items[0] || [];
//       if (items) {
//         return {
//           id: items.id,
//           name: items.name,
//         };
//       }
//       console.log("No match found for:", address);
//       return null;
//     } catch (error) {
//       console.error("Error fetching data from Monday.com:", error);
//       return null;
//     }
//   };

//   const processAddresses = async () => {
//     for (const address of addressData) {
//       const result = await findAddressInBoard(address, boardId);
//       if (result) {
//         setCurrentCount((prevCount) => prevCount + 1); // Increment count
//         onItemFound((prevItems) => [...prevItems, result]); // Add to found items
//       }
//     }
//     onSearchComplete(); // Notify that the search is complete
//   };

//   useEffect(() => {
//     if (addressData.length > 0 && boardId) {
//       processAddresses();
//     }
//   }, [addressData, boardId]);

//   return (
//     <div>
//       <p>Total number of addresses found in Monday board: {currentCount}</p>
//     </div>
//   );
// };

// export default SearchInMondayBoard;

import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

const SearchInMondayBoard = ({ addressData, boardId, onItemFound, onSearchComplete }) => {
  const [currentCount, setCurrentCount] = useState(0); // For real-time count
  const [searchComplete, setSearchComplete] = useState(false); // To track if search is complete

  const findAddressInBoard = async (address, boardId) => {
    console.log("Address:", address);
    try {
      const response = await monday.api(
        `query {
          boards(ids: ${boardId}) {
            items_page(query_params: {rules: [{column_id: "name", compare_value: "${address}", operator: contains_text}]}) {
              cursor
              items {
                id
                name
                column_values {
                  id
                  text
                  column {
                    title
                  }
                }
              }
            }
          }
        }`
      );

      const items = response.data.boards[0]?.items_page.items || [];
      if (items.length > 0) {
        return {
          id: items[0].id,
          name: items[0].name,
        };
      }
      console.log("No match found for:", address);
      return null;
    } catch (error) {
      console.error("Error fetching data from Monday.com:", error);
      return null;
    }
  };

  const processAddresses = async () => {
    for (const address of addressData) {
      const result = await findAddressInBoard(address, boardId);
      if (result) {
        setCurrentCount((prevCount) => prevCount + 1); // Increment count
        onItemFound((prevItems) => [...prevItems, result]); // Add to found items
      }
    }
    setSearchComplete(true); // Set search as complete after processing all addresses
    onSearchComplete(); // Notify that the search is complete
  };

  useEffect(() => {
    if (addressData.length > 0 && boardId) {
      processAddresses();
    }
  }, [addressData, boardId]);

  return (
    <div>
      <p>
        Total number of addresses found in Monday board: {currentCount}{" "}
        {searchComplete && <span className="status-icon" style={{ color: "green" }}>✓</span>}
      </p>
    </div>
  );
};

export default SearchInMondayBoard;
