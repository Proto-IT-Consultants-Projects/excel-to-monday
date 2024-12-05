import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import configForArkansasBoard from "./configForArkansasBoard.json";

const monday = mondaySdk();

const CreateSubitemsInArkansasBoard = ({ foundItems, fileData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdSubitemsCount, setCreatedSubitemsCount] = useState(0);

  const mapToMondaySubitems = (fileData, subitemColumnMapping, index) => {
    const subitemValues = {};
    const subitemTitleKey = configForArkansasBoard.subitem_titles[index];
    const subitemTitle = fileData[subitemTitleKey] || "Unknown";

    Object.keys(subitemColumnMapping).forEach((columnId) => {
      const fileKeys = subitemColumnMapping[columnId];
      if (columnId === "status__1") {
        const statusValue = fileData[fileKeys[index]] || "";
        subitemValues[columnId] = configForArkansasBoard.status_mapping[statusValue] || "Other Relative";
      } else if (columnId === "status_18__1") {
        subitemValues[columnId] = index === 0 ? "Owner" : "Relative";
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
        parsedValues[key] = { label: value === "N" ? "N" : value === "Y" ? "Y" : "U" };
      } else if(key === "status2__1"){
        parsedValues[key] = { label: value === "N" ? "N" : value === "Y" ? "Y" : "U" };
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
      console.log(`Error creating ${subitemTitle}: `, error);
      setError(`Error creating subitem for item: ${subitemTitle}`);
      return false; // Indicate failure
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Helper function for delay

  const processSubitemsCreation = async () => {
    setIsLoading(true);
    const subitemColumnMapping = configForArkansasBoard.monday_subitems_column_mapping;
    const maxLength = Math.max(
      ...Object.values(subitemColumnMapping).map((arr) => (Array.isArray(arr) ? arr.length : 0))
    );

    let apiCalls = []; // Holds promises to be executed in batches

    // Loop through foundItems and create subitems
    for (let item of foundItems) {
      const matchedData = fileData.find((data) =>
        item.name.includes(data["INPUT: Address 1"])
      );

      if (!matchedData) {
        continue; // Skip if no match
      }

      for (let index = 0; index < maxLength; index++) {
        const { subitemValues, subitemTitle } = mapToMondaySubitems(matchedData, subitemColumnMapping, index);
        if (subitemTitle !== "Unknown" && Object.keys(subitemValues).length > 0) {
          const promise = createMondaySubitem(item.id, subitemValues, subitemTitle)
            .then(success => {
              if (success) {
                setCreatedSubitemsCount((prevCount) => prevCount + 1);
              }
            });
          
          apiCalls.push(promise); // Add promise to the array
        }

        // If there are 20 API calls in the batch, wait 4.5 second
        if (apiCalls.length >= 20) {
          await Promise.all(apiCalls); // Execute the 30 promises
          apiCalls = []; // Reset the batch of API calls
          console.log("Batch complete, waiting 4.5 second...");
          await delay(4500); // Delay for 5 second
        }
      }
    }

    // Execute any remaining promises
    if (apiCalls.length > 0) {
      await Promise.all(apiCalls);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (foundItems.length > 0 && fileData) {
      processSubitemsCreation();
    }
  }, [foundItems, fileData]);

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Creating subitems... ({createdSubitemsCount} created so far)</p>
      ) : (
        <p>
          Total subitems created: {createdSubitemsCount}
          <span 
            className="status-icon" 
            style={{ color: "green"}}>
              ✓
          </span>
        </p>
      )}
    </div>
  );
};

export default CreateSubitemsInArkansasBoard;
