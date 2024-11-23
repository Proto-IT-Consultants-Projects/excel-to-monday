import { useEffect } from 'react';

const GetAddressColumn = ({ fileData, onAddressesExtracted }) => {
  useEffect(() => {
    if (fileData) {
      // Extract the "INPUT: Address 1" values
      const addresses = fileData.map((row) => row['INPUT: Address 1']).filter(Boolean);
      // Pass the extracted addresses back to App component
      onAddressesExtracted(addresses);
    }
  }, []); // Re-run effect when fileData changes

  return null; // No UI rendering, just extracting and passing data back
};

export default GetAddressColumn;
