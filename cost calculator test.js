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

}

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



