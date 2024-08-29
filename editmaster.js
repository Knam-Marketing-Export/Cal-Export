// Function to populate the saved values
function populateSavedData() {
    // Get the selected values from the dropdowns
    const selectedGSM = document.getElementById('gsmSelect').value;
    const selectedMill = document.getElementById('paperMill').value;
    const selectedCode = document.getElementById('paperCode').value;

    // Construct the key based on the selections
    let key = '';
    if (selectedMill === '360') {
        key = `${selectedGSM}gsm`;
    } else if (selectedMill === '880' && selectedCode === '3000') {
        key = `${selectedGSM}gsm8803000`;
    } else if (selectedMill === '880' && selectedCode === '5000') {
        key = `${selectedGSM}gsm8805000`;
    }

    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostData'));

    // Check if the key exists in the data
    if (data && data[key]) {
        // Populate the fields with saved data
        document.getElementById('papulateGSM').value = data[key].value || '';
        document.getElementById('paperCostEditMaster').value = data[key].paperCost || '';
        document.getElementById('paperCostCurrencyEditMaster').value = data[key].currency || '';
    } else {
        // Clear the fields if no saved data is found
        document.getElementById('papulateGSM').value = '';
        document.getElementById('paperCostEditMaster').value = '';
        document.getElementById('paperCostCurrencyEditMaster').value = 'USD'; // Default to USD
    }
}

// Attach event listeners to the dropdowns
document.getElementById('gsm').addEventListener('change', populateSavedData);
document.getElementById('paperMill').addEventListener('change', populateSavedData);
document.getElementById('paperCode').addEventListener('change', populateSavedData);

// Call the function once on page load to populate any pre-selected values
window.onload = populateSavedData;
