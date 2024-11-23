import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import config from "./config.json";

const monday = mondaySdk();

const CreateSubitems = ({ fileData, parentItemId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to map fileData to Monday subitem columns based on the updated config mapping
  const mapToMondaySubitems = (fileData, subitemColumnMapping, index) => {
    const subitemValues = {};

    // Get the subitem title based on the index
    const subitemTitleKey = config.subitem_titles[index];
    const subitemTitle = fileData[subitemTitleKey] || "Unknown";

    // Iterate through each key in the mapping (column ID)
    Object.keys(subitemColumnMapping).forEach((columnId) => {
      const fileKeys = subitemColumnMapping[columnId]; // Get the fileData keys from the mapping

      // Handle the specific case for "status_1__1"
      if (columnId === "status_1__1") {
        if (index === 0) {
          // For 0th index, set "Owner"
          subitemValues[columnId] = "Owner";
        } else {
          // For all other indexes, set "Relative"
          subitemValues[columnId] = "Relative";
        }
      } 
      // Handle the specific case for "status_18__1"
      else if (columnId === "status_18__1") {
        if (index === 0) {
          // For 0th index, set "Owner"
          subitemValues[columnId] = "Owner";
        } else {
          // Map fileData values to Monday's accepted status values
          const statusValue = fileData[fileKeys[index]] || ""; // Get value from fileData or default to empty string
          subitemValues[columnId] = config.status_mapping[statusValue] || "Other Relative"; // Default to "Other Relative" if no match
        }
      } 
      // Handle other cases where the mapping is an array of keys
      else if (Array.isArray(fileKeys)) {
        if (fileKeys[index] !== undefined && fileData[fileKeys[index]] !== undefined) {
          // Map the value to the respective column ID
          subitemValues[columnId] = fileData[fileKeys[index]];
        }
      } else {
        // Handle case for non-array mappings
        if (fileData[fileKeys] !== undefined) {
          subitemValues[columnId] = fileData[fileKeys];
        }
      }
    });

    return { subitemValues, subitemTitle };
  };

  // Function to process fileData and create Monday subitems
  const processFileData = () => {

    const subitemColumnMapping = config.monday_subitems_column_mapping;

    // Find the maximum length of arrays in the config to determine how many subitems we need to create
    const maxLength = Math.max(...Object.values(subitemColumnMapping).map(arr => Array.isArray(arr) ? arr.length : 0));

    // Process for each index (0 to maxLength - 1)
    for (let index = 0; index < maxLength; index++) {
      const { subitemValues, subitemTitle } = mapToMondaySubitems(fileData, subitemColumnMapping, index);

      if (Object.keys(subitemValues).length > 0) {
        createMondaySubitem(parentItemId, subitemValues, subitemTitle, index);
      }
    }

    setIsLoading(false);
  };

  // Function to format column values  
  function parseColumnValues(columnValues) {
    const parsedValues = {};

    for (const [key, value] of Object.entries(columnValues)) {
      if (key.includes("phone")) {
        parsedValues[key] = {
          phone: `+1${value}`,
          countryShortName: "US",
        };
      } else if (key.includes("email")) {
        parsedValues[key] = {
          email: value,
          text: value,
        };
      } else if (key === "dup__of_deceased__1") {
        parsedValues[key] = {
          label: value === "N" ? "No" : value === "Y" ? "Yes" : "Unknown",
        };
      } else {
        parsedValues[key] = value.toString();
      }
    }

    return JSON.stringify(parsedValues);
  }



  // Function to create Monday subitem with the mapped values
  const createMondaySubitem = async (parentItemId, subitemValues, subitemTitle, index) => {
    const columnValues = parseColumnValues(subitemValues);


    const mutation = `mutation {
      create_subitem(
        parent_item_id: "${parentItemId}",
        item_name: "${subitemTitle}",
        column_values: ${JSON.stringify(columnValues)}
      ) {
        id
        name
        column_values {
          id
          value
          text
        }
      }
    }`;

    try {
      const response = await monday.api(mutation);
    } catch (error) {
      setError(`Error creating subitem at index ${index}: ${error.message}`);
      console.error("Error creating subitem:", error);
    }
  };

  useEffect(() => {
    console.log("Process file Data: ", fileData);
    setIsLoading(true);
    processFileData();
  }, [fileData]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>Subitems processed!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateSubitems;
