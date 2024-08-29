// Master password
document.getElementById('master-section-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default button behavior

    // Define the correct password
    const correctPassword = '123456'; // Change this to your desired password

    // Prompt the user for a password
    const userPassword = prompt('Please enter the password to access the Master section:');

    // Check if the password is correct
    if (userPassword === correctPassword) {
        // Redirect to master.html if password is correct
        window.location.href = 'master.html';
    } else {
        alert('Incorrect password. Access denied.');
    }
});


document.getElementById('logout-button').addEventListener('click', function () {
    const logoutConfirmation = confirm("Are you sure you want to Logout?");
    if (logoutConfirmation) {
        window.location.href = 'loginpage.html';  // Redirect to login page
    }
});


document.getElementById('noOfSheetInReam').addEventListener('input', function () {
    if (this.value === '') {
        resetField('weightOfReam');
    } else {
        updateValues('noOfSheetInReam');
    }
});

document.getElementById('weightOfReam').addEventListener('input', function () {
    if (this.value === '') {
        resetField('noOfSheetInReam');
    } else {
        updateValues('weightOfReam');
    }
});

function updateValues(changedField) {
    const noOfSheetInReam = parseFloat(document.getElementById('noOfSheetInReam').value);
    const weightOfReam = parseFloat(document.getElementById('weightOfReam').value);
    const gsmOfPaper = parseFloat(document.getElementById('gsmSelect').value);
    const lengthOfPaper = parseFloat(document.getElementById('length').value);
    const widthOfPaper = parseFloat(document.getElementById('width').value);
    const areaOfSheet = (lengthOfPaper * widthOfPaper) / 10000;
    const weightPerSheet = (areaOfSheet * gsmOfPaper) / 1000;

    if (changedField === 'noOfSheetInReam' && !isNaN(noOfSheetInReam)) {
        document.getElementById('weightOfReam').value = (noOfSheetInReam * weightPerSheet).toFixed(3);
    } else if (changedField === 'weightOfReam' && !isNaN(weightOfReam)) {
        document.getElementById('noOfSheetInReam').value = (weightOfReam / weightPerSheet).toFixed(2);
    }

    saveToLocalStorage(); // Save updated values

}

function saveToLocalStorage() {
    const data = {
        noOfSheetInReam: document.getElementById('noOfSheetInReam').value,
        weightOfReam: document.getElementById('weightOfReam').value,
        gsmOfPaper: document.getElementById('gsmSelect').value,
        lengthOfPaper: document.getElementById('length').value,
        widthOfPaper: document.getElementById('width').value,
        // Add any other fields you want to save
    };

    localStorage.setItem('formData', JSON.stringify(data));
}


// document.addEventListener('DOMContentLoaded', function () {

document.getElementById('convert-button').addEventListener('click', calculateCost);

function calculateCost() {
    const data = JSON.parse(localStorage.getItem('paperCostData'));

    const exchangeRate = parseFloat(document.getElementById('exchangeRateeditmaster').value);
    const selectedGSM = document.getElementById('gsmSelect').value;


    console.log(exchangeRate);


    const reamsPerCarton = parseFloat(document.getElementById('reamsPerCarton').value);
    const weightOfReam = parseFloat(document.getElementById('weightOfReam').value);
    const noOfSheetInReam = parseFloat(document.getElementById('noOfSheetInReam').value);
    const gsmOfPaper = parseFloat(selectedGSM); // Ensure GSM is a number
    const lengthOfPaper = parseFloat(document.getElementById('length').value);
    const widthOfPaper = parseFloat(document.getElementById('width').value);
    const areaOfSheet = (lengthOfPaper * widthOfPaper) / 10000;
    const weightPerSheet = (areaOfSheet * gsmOfPaper) / 1000;

    // Weight of ream
    const weightOfReamCalc = noOfSheetInReam * weightPerSheet;
    document.getElementById('WeightOfReam').innerText = weightOfReamCalc.toFixed(3) + ' Kg';

    // Weight of Carton
    const weightOfCarton = weightOfReam * reamsPerCarton;
    document.getElementById('weightOfCarton').innerText = weightOfCarton.toFixed(2) + ' Kg';

    // No. of Wrappers per Ton
    const wrappersPerTon = 1000 / weightOfReamCalc;
    document.getElementById('wrappersPerTon').innerText = wrappersPerTon.toFixed(2) + ' NOS';

    // No. of Cartons per Ton
    const cartonsPerTon = 1000 / weightOfCarton;
    document.getElementById('cartonsPerTon').innerText = cartonsPerTon.toFixed(2) + ' NOS';



    const paperPrice = parseFloat(document.getElementById('paperCostEditMaster').value);
    const freightCost = parseFloat(document.getElementById('selectFreightEditMaster').value);
    const sheetingCost = parseFloat(document.getElementById('sheettingPriceEditMaster').value) * 1000 / exchangeRate;
    const boxPrice = parseFloat(document.getElementById('boxPriceEditMaster').value) * cartonsPerTon / exchangeRate;
    const wrappersPrice = parseFloat(document.getElementById('wrapperPriceEditMaster').value) * wrappersPerTon / exchangeRate;
    const localFreight = parseFloat(document.getElementById('localFreightEditMaster').value) / exchangeRate;
    const miscellaneous = parseFloat(document.getElementById('miscellaneousEditMaster').value);
    const margin = parseFloat(document.getElementById('marginEditMaster').value);

    // console.log(paperPrice); // Check if paperPrice is retrieved correctly
    // console.log(freightCost); // Check if freightCost is retrieved correctly
    // console.log(sheetingCost); // Check if sheetingCost is retrieved correctly
    // console.log(boxPrice); // Check if boxPrice is retrieved correctly
    // console.log(wrappersPrice); // Check if wrappersPrice is retrieved correctly
    // console.log(localFreight); // Check if localFreight is retrieved correctly
    // console.log(miscellaneous); // Check if miscellaneous is retrieved correctly
    // console.log(margin); // Check if margin is retrieved correctly

    // Get currency values
    const paperCurrency = document.getElementById('paperCostCurrencyEditMaster').value;
    const freightCurrency = document.getElementById('selectFreightCurrencyEditMaster').value;

    console.log(paperCurrency);
    console.log(freightCurrency);

    // Convert paper cost and freight cost to USD if they are in INR
    let paperCostInUSD = paperCurrency === 'INR' ? paperPrice / exchangeRate : paperPrice;
    let freightCostInUSD = freightCurrency === 'INR' ? freightCost / exchangeRate / 23.5 : freightCost;

    console.log(paperCostInUSD);
    console.log(freightCostInUSD);


    // Total Cost
    const totalCost = paperCostInUSD + freightCostInUSD + sheetingCost + boxPrice + wrappersPrice + localFreight + miscellaneous;
    document.getElementById('totalCost').innerText = totalCost.toFixed(2) + ' $ USD';

    // Price per MT
    const pricePerMT = totalCost + margin;
    document.getElementById('pricePerMT').innerText = pricePerMT.toFixed(2) + ' $ USD';

    // Price per Box
    const pricePerBox = pricePerMT / cartonsPerTon;
    document.getElementById('pricePerBox').innerText = pricePerBox.toFixed(2) + ' $ USD';

    // Save the calculated values to localStorage
    saveCalculationResults(totalCost, pricePerMT, pricePerBox);
}

function saveCalculationResults(totalCost, pricePerMT, pricePerBox) {
    const calculationData = {
        totalCost,
        pricePerMT,
        pricePerBox,
    };

    localStorage.setItem('calculationResults', JSON.stringify(calculationData));
}

const selectFreight1 = document.getElementById('freightSelection');
const selectFreight2 = document.getElementById('selectPortEditMaster');
selectFreight1.addEventListener('change', function () {
    selectFreight2.value = selectFreight1.value;
});

selectFreight2.addEventListener('change', function () {
    selectFreight1.value = selectFreight2.value;
});

const selectprice1 = document.getElementById('gsmSelect');
const selectprice2 = document.getElementById('selectGsmEditMaster');
selectFreight1.addEventListener('change', function () {
    selectprice2.value = selectprice1.value;
});

selectFreight2.addEventListener('change', function () {
    selectprice1.value = selectprice2.value;
});

// Attach event listeners to the dropdowns and button

document.getElementById('costCalculatorForm').addEventListener('reset', function () {
    document.getElementById('WeightOfReam').innerText = '';
    document.getElementById('weightOfCarton').innerText = '';
    document.getElementById('wrappersPerTon').innerText = '';
    document.getElementById('cartonsPerTon').innerText = '';
    document.getElementById('totalCost').innerText = '';
    document.getElementById('pricePerMT').innerText = '';
    document.getElementById('pricePerBox').innerText = '';
    document.getElementById('sheettingPriceEditMaster').value = 0;
    document.getElementById('wrapperPriceEditMaster').value = 0;
    document.getElementById('boxPriceEditMaster').value = 0;
    document.getElementById('marginEditMaster').value = 0;
    document.getElementById('paperCostEditMaster').value = '';
    document.getElementById('paperCostCurrencyEditMaster').value = INR;
});

// Edit master hide and visible and section
function editMaster() {
    document.getElementById('quoteForm').style.display = 'block';
};

document.getElementById('closeQuoteFormBtn').addEventListener('click', function () {
    document.getElementById('quoteForm').style.display = 'none';
});

// paper mill and paper code section
document.getElementById('paperMill').addEventListener('change', function () {
    const paperCodeDiv = document.querySelector('.Select-paper-code');

    if (this.value === '880') {
        paperCodeDiv.style.display = 'block';
    } else {
        paperCodeDiv.style.display = 'none';
    }
});

// Bahl hide section 

document.getElementById('paperCode').addEventListener('change', function () {
    const paperMillDiv = document.querySelector('.paperMillCheckBox');

    if (this.value === '3000' || this.value === '5000') {
        paperMillDiv.style.display = 'block';
    } else {
        paperMillDiv.style.display = 'none';
    }
});

// Dashboard paper mill hide section

document.getElementById('paperMillCheckBox').addEventListener('change', function () {
    const editPaperCodeDive = document.querySelector('.Select-mill');

    if (this.value === '88080') {
        editPaperCodeDive.style.display = 'none';
    }
});

// Edit master check box section
document.getElementById('millCheckBox').addEventListener('change', function () {
    // var millSelectDiv = document.querySelector('.Select-mill-check-box');
    // var paperCodeDiv = document.querySelector('.Select-paper-code-check-box');
    // const editPaperCodeDive = document.querySelector('.Select-mill');


    if (this.checked) {

        document.getElementById('localFreightEditMaster').value = '0';
        document.getElementById('sheettingPriceEditMaster').value = '0';
        populateSavedDataCheckBox();

    } else {
        populateSavedData();
        populateCosts();
    };

});


// ------------------------------------------------------------------------------------------------------------------

// Function to populate the saved values
function populateSavedData() {
    // Get the selected values from the dropdowns
    const selectedGSM = document.getElementById('gsmSelect').value;
    const editSelectedGSM = document.getElementById('selectGsmEditMaster').value;
    const selectedMill = document.getElementById('paperMill').value;
    const selectedCode = document.getElementById('paperCode').value;
    const selectedLocation = document.getElementById('freightSelection').value;
    // const editSelectedLocation = document.getElementById('selectPortEditMaster').value;

    // Construct the dashboard key based on the selections
    let key = '';
    if (selectedMill === '360') {
        key = `${selectedGSM}gsm`;
    } else if (selectedMill === '880' && selectedCode === '3000') {
        key = `${selectedGSM}gsm8803000`;
    } else if (selectedMill === '880' && selectedCode === '5000') {
        key = `${selectedGSM}gsm8805000`;
    }


    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));

    // Check if the key exists in the data dashboard
    if (data && data[key]) {
        // Populate the fields with saved data
        document.getElementById('selectGsmEditMaster').value = data[key].value || '';
        document.getElementById('paperCostEditMaster').value = data[key].paperCost || '';
        document.getElementById('paperCostCurrencyEditMaster').value = data[key].currency || '';
    } else {
        // Clear the fields if no saved data is found
        document.getElementById('selectGsmEditMaster').value = '';
        document.getElementById('paperCostEditMaster').value = '';
        document.getElementById('paperCostCurrencyEditMaster').value = 'USD'; // Default to USD
    }

    // Populate the freight data fields
    if (data && data[selectedLocation]) {
        document.getElementById('selectFreightEditMaster').value = data[selectedLocation].freightCost || '';
        document.getElementById('selectFreightCurrencyEditMaster').value = data[selectedLocation].currency || '';
    } else {
        document.getElementById('selectFreightEditMaster').value = '';
        document.getElementById('selectFreightCurrencyEditMaster').value = 'USD'; // Default to USD
    }

};

// Attach event listeners to the dropdowns
document.getElementById('gsmSelect').addEventListener('change', populateSavedData);
document.getElementById('paperMill').addEventListener('change', populateSavedData);
document.getElementById('paperCode').addEventListener('change', populateSavedData);
document.getElementById('freightSelection').addEventListener('change', populateSavedData);
document.getElementById('selectGsmEditMaster').addEventListener('change', populateSavedData);
document.getElementById('selectPortEditMaster').addEventListener('change', populateSavedData);


// Call the function once on page load to populate any pre-selected values
window.onload = populateSavedData;

// document.addEventListener('DOMContentLoaded', function () {
const exchangeRateInput = document.getElementById('exchangeRateeditmaster');
const gsmDropdown = document.getElementById('gsmSelect');
const sheetingCostInput = document.getElementById('sheettingPriceEditMaster');
const wrapperCostInput = document.getElementById('wrapperPriceEditMaster');
const boxCostInput = document.getElementById('boxPriceEditMaster');
const marginInput = document.getElementById('marginEditMaster');
const localFreightInput = document.getElementById('localFreightEditMaster');
const miscellaneousInput = document.getElementById('miscellaneousEditMaster');
const checkbox = document.getElementById('millCheckBox');

// Function to populate the costs based on selected GSM
function populateCosts() {

    const selectedGSM = gsmDropdown.value;

    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));

    // Fetch the saved sheetingCost and wrapperCost from localStorage
    const savedExchangeRate = data.exchangeRate;
    const savedSheetingCost = data.sheetingCost;
    const savedWrapperCost = data.wrappersPrice;
    const savedBoxCost = data.boxPrice;
    const savedMargin = data.margin;
    const savedLocalFreight = data.localFreight;
    const savedMiscellaneous = data.miscellaneous;

    console.log(savedSheetingCost);

    // Set the values in the respective input fields if they exist
    if (selectedGSM !== "select") {
        exchangeRateInput.value = savedExchangeRate ? savedExchangeRate : '';
        sheetingCostInput.value = savedSheetingCost ? savedSheetingCost : '';
        wrapperCostInput.value = savedWrapperCost ? savedWrapperCost : '';
        boxCostInput.value = savedBoxCost ? savedBoxCost : '';
        marginInput.value = savedMargin ? savedMargin : '';
        localFreightInput.value = savedLocalFreight ? savedLocalFreight : '';
        miscellaneousInput.value = savedMiscellaneous ? savedMiscellaneous : '';

    } else {
        sheetingCostInput.value = ''; // Clear input if no data is found
        wrapperCostInput.value = ''; // Clear input if no data is found
    }
}

function handleGSMChange() {
    const selectedGSM = gsmDropdown.value;

    // Define your condition here
    // Example: Uncheck checkbox only if GSM is not "25"
    if (selectedGSM !== "select") {
        checkbox.checked = false;

    }
}


gsmDropdown.addEventListener('change', handleGSMChange);

// Event listener for GSM dropdown change
gsmDropdown.addEventListener('change', populateCosts);
// });



function populateSavedDataCheckBox() {
    // Get the selected values from the dropdowns
    const selectedGSM = document.getElementById('gsmSelect').value;
    const selectedMill = document.getElementById('paperMill').value;
    const selectedCode = document.getElementById('paperCode').value;

    // Construct the key based on the selections
    let paperkey = '';
    if (selectedMill === '880' && selectedCode === '3000') {
        paperkey = `${selectedGSM}gsm880300030`;
    } else if (selectedMill === '880' && selectedCode === '5000') {
        paperkey = `${selectedGSM}gsm880500050`;
    }

    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));

    // Check if the key exists in the data
    if (data && data[paperkey]) {
        // Populate the fields with saved data
        document.getElementById('selectGsmEditMaster').value = data[paperkey].value || '';
        document.getElementById('paperCostEditMaster').value = data[paperkey].paperCost || '';
        document.getElementById('paperCostCurrencyEditMaster').value = data[paperkey].currency || '';
    } else {

    }


}

// Attach event listeners to the dropdowns
document.getElementById('gsmSelect').addEventListener('change', populateSavedDataCheckBox);
document.getElementById('paperCostEditMaster').addEventListener('change', populateSavedDataCheckBox);
document.getElementById('paperCostCurrencyEditMaster').addEventListener('change', populateSavedDataCheckBox);

// Call the function once on page load to populate any pre-selected values
document.getElementById('millCheckBox').addEventListener('click', populateSavedDataCheckBox);


document.getElementById("save-button").addEventListener("click", function () {
    // Show a confirmation alert before saving
    if (confirm("Are you sure you want to save this data?")) {
        // Collect input values and results
        const gsm = document.getElementById("gsmSelect").value;
        const paperMill = document.getElementById("paperMill").value;
        const paperCode = document.getElementById("paperCode").value;
        const length = document.getElementById("length").value;
        const width = document.getElementById("width").value;
        const noOfSheetInReam = document.getElementById("noOfSheetInReam").value;
        const reamsPerCarton = document.getElementById("reamsPerCarton").value;
        const weightOfReam = document.getElementById("weightOfReam").value;
        const paperCost = document.getElementById("paperCostEditMaster").value;
        const freight = document.getElementById("freightSelection").value;
        const freightCost = document.getElementById("selectFreightEditMaster").value;
        const weightOfCarton = document.getElementById("weightOfCarton").textContent;
        const wrappersPerTon = document.getElementById("wrappersPerTon").textContent;
        const cartonsPerTon = document.getElementById("cartonsPerTon").textContent;
        const totalCost = document.getElementById("totalCost").textContent;
        const pricePerMT = document.getElementById("pricePerMT").textContent;
        const pricePerBox = document.getElementById("pricePerBox").textContent;
        const sheetingPlace = document.getElementById("sheetingPlace").textContent;
        const salesPerson = document.getElementById("salesPersonDropdown").value;
        const sheetingCost = document.getElementById("sheettingPriceEditMaster").value;
        const wrapperCost = document.getElementById("wrapperPriceEditMaster").value;
        const boxCost = document.getElementById("boxPriceEditMaster").value;
        const marginCost = document.getElementById("marginEditMaster").value;
        const exchangeCost = document.getElementById("exchangeRateeditmaster").value;
        const localFreightCost = document.getElementById("localFreightEditMaster").value;
        const miscellaneoustCost = document.getElementById("miscellaneousEditMaster").value;
        
        // Get the checkbox status
        const checkboxes = document.getElementById('millCheckBox').checked ? 'checked' : 'unchecked';


        // Get currency values
        const paperCurrency = document.getElementById('paperCostCurrencyEditMaster').value;
        const freightCurrency = document.getElementById('selectFreightCurrencyEditMaster').value;

        console.log(paperCurrency);
        console.log(freightCurrency);

        // Convert paper cost and freight cost to USD if they are in INR
        const paperCostInUSD = paperCurrency === 'USD' ? paperCost * exchangeCost : paperCost;
        const freightCostInUSD = freightCurrency === 'USD' ? freightCost * exchangeCost * 23.5 : freightCost;

        // Generate save date in dd/mm/yyyy format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        const saveDate = `${day}/${month}/${year}`;

        let lastQuotationNumber = localStorage.getItem('lastQuotationNumber') || '0';
        const newQuotationNumber = 'QN-' + (parseInt(lastQuotationNumber, 10) + 1); // or use any other method to generate unique numbers
        localStorage.setItem('lastQuotationNumber', newQuotationNumber.split('-')[1]); // Save the latest number for next use

        // Create an object to hold the data
        const formData = {
            saveDate, quotationNumber: newQuotationNumber, salesPerson, exchangeCost, gsm, paperMill, paperCode, length, width, noOfSheetInReam, reamsPerCarton,
            weightOfReam, paperCostInUSD, freight, freightCostInUSD, weightOfCarton, wrappersPerTon, cartonsPerTon,
            totalCost, pricePerMT, pricePerBox, sheetingPlace, sheetingCost, wrapperCost, boxCost, localFreightCost, miscellaneoustCost, marginCost, checkboxes,
        };

        // Get existing data from localStorage
        let savedData = JSON.parse(localStorage.getItem("costCalculatorData")) || [];

        // Add new data to the existing array
        savedData.push(formData);

        // Save back to localStorage
        localStorage.setItem("costCalculatorData", JSON.stringify(savedData));

        // Alert that the data has been saved
        alert("Data has been saved successfully!");

        // Redirect to the saveDataPage.html
        // window.location.href = "saveDataPage.html";
    }
});

document.getElementById("millCheckBox").addEventListener("change", function () {
    var resultText = this.checked ? "Bahl" : "Other";
    document.getElementById("sheetingPlace").textContent = resultText;
});



