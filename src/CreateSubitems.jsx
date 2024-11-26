// import React, { useState, useEffect } from "react";
// import mondaySdk from "monday-sdk-js";
// import config from "./config.json";

// const monday = mondaySdk();

// const CreateSubitems = ({ fileData, parentItemId, onSubitemsCountUpdate }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const mapToMondaySubitems = (fileData, subitemColumnMapping, index) => {
//     const subitemValues = {};
//     const subitemTitleKey = config.subitem_titles[index];
//     const subitemTitle = fileData[subitemTitleKey] || "Unknown";

//     Object.keys(subitemColumnMapping).forEach((columnId) => {
//       const fileKeys = subitemColumnMapping[columnId];
//       if (columnId === "status_1__1") {
//         subitemValues[columnId] = index === 0 ? "Owner" : "Relative";
//       } else if (columnId === "status_18__1") {
//         const statusValue = fileData[fileKeys[index]] || "";
//         subitemValues[columnId] = config.status_mapping[statusValue] || "Other Relative";
//       } else if (Array.isArray(fileKeys)) {
//         if (fileKeys[index] !== undefined && fileData[fileKeys[index]] !== undefined) {
//           subitemValues[columnId] = fileData[fileKeys[index]];
//         }
//       } else if (fileData[fileKeys] !== undefined) {
//         subitemValues[columnId] = fileData[fileKeys];
//       }
//     });

//     return { subitemValues, subitemTitle };
//   };

//   const parseColumnValues = (columnValues) => {
//     const parsedValues = {};
//     for (const [key, value] of Object.entries(columnValues)) {
//       if (key.includes("phone")) {
//         parsedValues[key] = { phone: `+1${value}`, countryShortName: "US" };
//       } else if (key.includes("email")) {
//         parsedValues[key] = { email: value, text: value };
//       } else if (key === "dup__of_deceased__1") {
//         parsedValues[key] = { label: value === "N" ? "No" : value === "Y" ? "Yes" : "Unknown" };
//       } else {
//         parsedValues[key] = value.toString();
//       }
//     }
//     return JSON.stringify(parsedValues);
//   };

//   const createMondaySubitem = async (parentItemId, subitemValues, subitemTitle) => {
//     const columnValues = parseColumnValues(subitemValues);

//     const mutation = `mutation {
//       create_subitem(
//         parent_item_id: "${parentItemId}",
//         item_name: "${subitemTitle}",
//         column_values: ${JSON.stringify(columnValues)}
//       ) {
//         id
//         name
//       }
//     }`;

//     try {
//       await monday.api(mutation);
//       return true; // Indicate successful creation
//     } catch (error) {
//       setError(`Error creating subitem: ${error.message}`);
//       return false; // Indicate failure
//     }
//   };

//   const processFileData = async () => {
//     setIsLoading(true);
//     const subitemColumnMapping = config.monday_subitems_column_mapping;
//     const maxLength = Math.max(
//       ...Object.values(subitemColumnMapping).map((arr) => (Array.isArray(arr) ? arr.length : 0))
//     );

//     for (let index = 0; index < maxLength; index++) {
//       const { subitemValues, subitemTitle } = mapToMondaySubitems(fileData, subitemColumnMapping, index);
//       if (subitemTitle !== "Unknown" && Object.keys(subitemValues).length > 0) {
//         const success = await createMondaySubitem(parentItemId, subitemValues, subitemTitle);
//         if (success) {
//           onSubitemsCountUpdate(1); // Incrementally update the count after each subitem is created
//         }
//       }
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     processFileData();
//   }, [fileData]);

//   return (
//     <div>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default CreateSubitems;

// import React, { useState, useEffect } from "react";
// import mondaySdk from "monday-sdk-js";
// import config from "./config.json";

// const monday = mondaySdk();

// const CreateSubitems = ({ fileData, parentItemId, onSubitemsCountUpdate }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const mapToMondaySubitems = (fileData, subitemColumnMapping, index) => {
//     const subitemValues = {};
//     const subitemTitleKey = config.subitem_titles[index];
//     const subitemTitle = fileData[subitemTitleKey] || "Unknown";

//     Object.keys(subitemColumnMapping).forEach((columnId) => {
//       const fileKeys = subitemColumnMapping[columnId];
//       if (columnId === "status_1__1") {
//         subitemValues[columnId] = index === 0 ? "Owner" : "Relative";
//       } else if (columnId === "status_18__1") {
//         const statusValue = fileData[fileKeys[index]] || "";
//         subitemValues[columnId] = config.status_mapping[statusValue] || "Other Relative";
//       } else if (Array.isArray(fileKeys)) {
//         if (fileKeys[index] !== undefined && fileData[fileKeys[index]] !== undefined) {
//           subitemValues[columnId] = fileData[fileKeys[index]];
//         }
//       } else if (fileData[fileKeys] !== undefined) {
//         subitemValues[columnId] = fileData[fileKeys];
//       }
//     });

//     return { subitemValues, subitemTitle };
//   };

//   const parseColumnValues = (columnValues) => {
//     const parsedValues = {};
//     for (const [key, value] of Object.entries(columnValues)) {
//       if (key.includes("phone")) {
//         parsedValues[key] = { phone: `+1${value}`, countryShortName: "US" };
//       } else if (key.includes("email")) {
//         parsedValues[key] = { email: value, text: value };
//       } else if (key === "dup__of_deceased__1") {
//         parsedValues[key] = { label: value === "N" ? "No" : value === "Y" ? "Yes" : "Unknown" };
//       } else {
//         parsedValues[key] = value.toString();
//       }
//     }
//     return JSON.stringify(parsedValues);
//   };

//   const createMondaySubitem = async (parentItemId, subitemValues, subitemTitle) => {
//     const columnValues = parseColumnValues(subitemValues);

//     const mutation = `mutation {
//       create_subitem(
//         parent_item_id: "${parentItemId}",
//         item_name: "${subitemTitle}",
//         column_values: ${JSON.stringify(columnValues)}
//       ) {
//         id
//         name
//       }
//     }`;

//     try {
//       await monday.api(mutation);
//       return true; // Indicate successful creation
//     } catch (error) {
//       setError(`Error creating subitem: ${error.message}`);
//       return false; // Indicate failure
//     }
//   };

//   const processFileData = async () => {
//     setIsLoading(true);
//     const subitemColumnMapping = config.monday_subitems_column_mapping;
//     const maxLength = Math.max(
//       ...Object.values(subitemColumnMapping).map((arr) => (Array.isArray(arr) ? arr.length : 0))
//     );

//     for (let index = 0; index < maxLength; index++) {
//       const { subitemValues, subitemTitle } = mapToMondaySubitems(fileData, subitemColumnMapping, index);
//       if (subitemTitle !== "Unknown" && Object.keys(subitemValues).length > 0) {
//         const success = await createMondaySubitem(parentItemId, subitemValues, subitemTitle);
//         if (success) {
//           onSubitemsCountUpdate(1); // Increment count for each created subitem
//         }
//       }
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     processFileData();
//   }, [fileData]);

//   return (
//     <div>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default CreateSubitems;

import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import config from "./config.json";

const monday = mondaySdk();

const CreateSubitems = ({ fileData, parentItemId, onSubitemsCountUpdate, onAllSubitemsCreated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapToMondaySubitems = (fileData, subitemColumnMapping, index) => {
    const subitemValues = {};
    const subitemTitleKey = config.subitem_titles[index];
    const subitemTitle = fileData[subitemTitleKey] || "Unknown";

    Object.keys(subitemColumnMapping).forEach((columnId) => {
      const fileKeys = subitemColumnMapping[columnId];
      if (columnId === "status_1__1") {
        subitemValues[columnId] = index === 0 ? "Owner" : "Relative";
      } else if (columnId === "status_18__1") {
        const statusValue = fileData[fileKeys[index]] || "";
        subitemValues[columnId] = config.status_mapping[statusValue] || "Other Relative";
      } else if (Array.isArray(fileKeys)) {
        if (fileKeys[index] !== undefined && fileData[fileKeys[index]] !== undefined) {
          subitemValues[columnId] = fileData[fileKeys[index]];
        }
      } else if (fileData[fileKeys] !== undefined) {
        subitemValues[columnId] = fileData[fileKeys];
      }
    });

    return { subitemValues, subitemTitle };
  };

  const parseColumnValues = (columnValues) => {
    const parsedValues = {};
    for (const [key, value] of Object.entries(columnValues)) {
      if (key.includes("phone")) {
        parsedValues[key] = { phone: `+1${value}`, countryShortName: "US" };
      } else if (key.includes("email")) {
        parsedValues[key] = { email: value, text: value };
      } else if (key === "dup__of_deceased__1") {
        parsedValues[key] = { label: value === "N" ? "No" : value === "Y" ? "Yes" : "Unknown" };
      } else {
        parsedValues[key] = value.toString();
      }
    }
    return JSON.stringify(parsedValues);
  };

  const createMondaySubitem = async (parentItemId, subitemValues, subitemTitle) => {
    const columnValues = parseColumnValues(subitemValues);

    const mutation = `mutation {
      create_subitem(
        parent_item_id: "${parentItemId}",
        item_name: "${subitemTitle}",
        column_values: ${JSON.stringify(columnValues)}
      ) {
        id
        name
      }
    }`;

    try {
      await monday.api(mutation);
      return true; // Indicate successful creation
    } catch (error) {
      setError(`Error creating subitem: ${error.message}`);
      return false; // Indicate failure
    }
  };

  const processFileData = async () => {
    setIsLoading(true);
    const subitemColumnMapping = config.monday_subitems_column_mapping;
    const maxLength = Math.max(
      ...Object.values(subitemColumnMapping).map((arr) => (Array.isArray(arr) ? arr.length : 0))
    );

    let createdSubitemsCount = 0;

    for (let index = 0; index < maxLength; index++) {
      const { subitemValues, subitemTitle } = mapToMondaySubitems(fileData, subitemColumnMapping, index);
      if (subitemTitle !== "Unknown" && Object.keys(subitemValues).length > 0) {
        const success = await createMondaySubitem(parentItemId, subitemValues, subitemTitle);
        if (success) {
          createdSubitemsCount++;
          onSubitemsCountUpdate(1); // Increment count for each created subitem
        }
      }
    }

    setIsLoading(false);

    // Notify the parent component when all subitems are created
    onAllSubitemsCreated();
  };

  useEffect(() => {
    processFileData();
  }, [fileData]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateSubitems;

