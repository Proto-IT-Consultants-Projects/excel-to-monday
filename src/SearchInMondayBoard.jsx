// import React, { useEffect, useState } from "react";
// import mondaySdk from "monday-sdk-js";

// const monday = mondaySdk();

// const SearchInMondayBoard = ({ addressData, boardId, onItemFound, onSearchComplete }) => {
//   const [currentCount, setCurrentCount] = useState(0); // For real-time count
//   const [searchComplete, setSearchComplete] = useState(false); // To track if search is complete

//   const findAddressInBoard = async (address, boardId) => {
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

//       const items = response.data.boards[0]?.items_page.items || [];
//       if (items.length > 0) {
//         return {
//           id: items[0].id,
//           name: items[0].name,
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
//     setSearchComplete(true); // Set search as complete after processing all addresses
//     onSearchComplete(); // Notify that the search is complete
//   };

//   useEffect(() => {
//     if (addressData.length > 0 && boardId) {
//       processAddresses();
//     }
//   }, [addressData, boardId]);

//   return (
//     <div>
//       <p>
//         Total number of addresses found in Monday board: {currentCount}{" "}
//         {searchComplete && <span className="status-icon" style={{ color: "green", fontSize: "18px"}}>✓</span>}
//       </p>
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

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Helper function for delay

  const processAddresses = async () => {
    let apiCalls = []; // Holds promises to be executed in batches

    for (const address of addressData) {
      const promise = findAddressInBoard(address, boardId)
        .then((result) => {
          if (result) {
            setCurrentCount((prevCount) => prevCount + 1); // Increment count
            onItemFound((prevItems) => [...prevItems, result]); // Add to found items
          }
        });

      apiCalls.push(promise); // Add promise to the array

      // If there are 20 API calls in the batch, wait 2 seconds
      if (apiCalls.length >= 20) {
        await Promise.all(apiCalls); // Execute the 20 promises
        apiCalls = []; // Reset the batch of API calls
        console.log("Batch complete, waiting 2 seconds...");
        await delay(2000); // Delay for 2 seconds
      }
    }

    // Execute any remaining promises after the loop
    if (apiCalls.length > 0) {
      await Promise.all(apiCalls);
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
        {searchComplete && <span className="status-icon" style={{ color: "green", fontSize: "18px"}}>✓</span>}
      </p>
    </div>
  );
};

export default SearchInMondayBoard;
