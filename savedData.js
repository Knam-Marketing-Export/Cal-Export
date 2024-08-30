
document.addEventListener("DOMContentLoaded", function () {
    const savedData = JSON.parse(localStorage.getItem("costCalculatorData")) || [];
    const tableBody = document.getElementById("tableBody");

    // Function to populate the table with saved data
    function populateTable() {
        tableBody.innerHTML = ""; // Clear existing rows

        savedData.forEach((data, index) => {
            const row = document.createElement("tr");

            for (const key in data) {
                const cell = document.createElement("td");
                cell.textContent = data[key];
                row.appendChild(cell);
            }

            // Create edit button
            const editCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", function () {
                editRow(index);
            });
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            // Create delete button
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", function () {
                if (confirm("Are you sure you want to delete this row?")) {
                    deleteRow(index);
                }
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }

    // Function to edit a row
    function editRow(index) {
        const data = savedData[index];
        document.getElementById('quoteForm').style.display = 'block';

        // Populate form fields with the selected data
        document.getElementById('editQuatationNumber').innerText = data.quotationNumber;
        document.getElementById('salesPersonDropdown').value = data.salesPerson;
        document.getElementById('editExchangeRate').value = data.exchangeCost;
        document.getElementById('editGsmSelect').value = data.gsm;
        document.getElementById('editPaperMillSelect').value = data.paperMill;
        document.getElementById('editPapercodeSelect').value = data.paperCode;
        document.getElementById('editSheetingLocationCheckBox').checked = data.checkboxes === 'checked';
        document.getElementById('editSheetsizelength').value = data.length;
        document.getElementById('editSheetsizewidth').value = data.width;
        document.getElementById('editSheetInReam').value = data.noOfSheetInReam;
        document.getElementById('editReamPerCarton').value = data.reamsPerCarton;
        document.getElementById('editReamWeight').value = data.weightOfReam;
        document.getElementById('editPaperCost').value = data.paperCostInUSD;
        document.getElementById('editMasterEditfreightSelect').value = data.freight;
        document.getElementById('editFreightCost').value = data.freightCostInUSD;
        document.getElementById('editWeightOfCarton').innerText = data.weightOfCarton;
        document.getElementById('editwrappersPerTon').innerText = data.wrappersPerTon;
        document.getElementById('editCartonsPerTon').innerText = data.cartonsPerTon;
        document.getElementById('editTotalCost').innerText = data.totalCost;
        document.getElementById('editPricePerMT').innerText = data.pricePerMT;
        document.getElementById('editPricePerBox').innerText = data.pricePerBox;
        document.getElementById('editSheetingPlace').innerText = data.sheetingPlace;
        document.getElementById('editEditMastersheettingPrice').value = data.sheetingCost;
        document.getElementById('editEditMasterwrapperPrice').value = data.wrapperCost;
        document.getElementById('editEditMasterboxPrice').value = data.boxCost;
        document.getElementById('editEditMasterLocalFreight').value = data.localFreightCost;
        document.getElementById('editEditMasterMiscellaneous').value = data.miscellaneoustCost;
        document.getElementById('editEditMastermarginPrice').value = data.marginCost;
        document.getElementById('editfreightSelect').value = data.freight;
        document.getElementById('editWeightOfReam').innerText = data.weightOfReam + ' Kg';

        // // Mark the row as being edited
        savedData[index].isBeingEdited = true;
    }

    // Function to delete a row
    function deleteRow(index) {
        // Remove the row data
        savedData.splice(index, 1);

        // Save updated data back to localStorage
        localStorage.setItem("costCalculatorData", JSON.stringify(savedData));

        // Repopulate the table after deletion
        populateTable();

    }


    // Close quote form functionality
    document.getElementById('closeQuoteFormBtn').addEventListener('click', function () {
        document.getElementById('quoteForm').style.display = 'none';
    });

    // Save changes functionality
    document.getElementById('edit-save-button').addEventListener('click', function () {
        // Get the index of the currently edited row
        const index = savedData.findIndex(data => data.isBeingEdited);

        // Update the data in the array
        const currentDate = new Date();
        const formattedDate = ("0" + currentDate.getDate()).slice(-2) + "/" +
            ("0" + (currentDate.getMonth() + 1)).slice(-2) + "/" +
            currentDate.getFullYear();

        savedData[index] = {
            lastUpdated: formattedDate, // Save the current date as lastUpdated
            quotationNumber: document.getElementById('editQuatationNumber').innerText,
            salesPerson: document.getElementById('salesPersonDropdown').value,
            exchangeCost: document.getElementById('editExchangeRate').value,
            gsm: document.getElementById('editGsmSelect').value,
            paperMill: document.getElementById('editPaperMillSelect').value,
            paperCode: document.getElementById('editPapercodeSelect').value,
            length: document.getElementById('editSheetsizelength').value,
            width: document.getElementById('editSheetsizewidth').value,
            noOfSheetInReam: document.getElementById('editSheetInReam').value,
            reamsPerCarton: document.getElementById('editReamPerCarton').value,
            weightOfReam: document.getElementById('editReamWeight').value,
            paperCostInUSD: document.getElementById('editPaperCost').value,
            freight: document.getElementById('editfreightSelect').value,
            freightCostInUSD: document.getElementById('editFreightCost').value,
            weightOfCarton: document.getElementById('editWeightOfCarton').innerText,
            wrappersPerTon: document.getElementById('editwrappersPerTon').innerText,
            cartonsPerTon: document.getElementById('editCartonsPerTon').innerText,
            totalCost: document.getElementById('editTotalCost').innerText,
            pricePerMT: document.getElementById('editPricePerMT').innerText,
            pricePerBox: document.getElementById('editPricePerBox').innerText,
            sheetingPlace: document.getElementById('editSheetingPlace').innerText,
            sheetingCost: document.getElementById('editEditMastersheettingPrice').value,
            wrapperCost: document.getElementById('editEditMasterwrapperPrice').value,
            boxCost: document.getElementById('editEditMasterboxPrice').value,
            localFreightCost: document.getElementById('editEditMasterLocalFreight').value,
            miscellaneoustCost: document.getElementById('editEditMasterMiscellaneous').value,
            marginCost: document.getElementById('editEditMastermarginPrice').value,
            checkboxes: document.getElementById('editSheetingLocationCheckBox').checked ? 'checked' : 'unchecked'

        };

        // Mark the row as no longer being edited
        // delete savedData[index].isBeingEdited;

        // Save the updated data back to localStorage
        localStorage.setItem("costCalculatorData", JSON.stringify(savedData));

        // Close the form
        document.getElementById('quoteForm').style.display = 'none';

        // Repopulate the table with the updated data
        populateTable();
    });

    // Initially populate the table
    populateTable();

});

// Function to toggle the visibility of columns based on the checkbox state
function toggleColumnVisibility(checkbox) {
    const columnClass = checkbox.getAttribute('data-column');
    const columnElements = document.querySelectorAll(`.${columnClass}`);

    columnElements.forEach(element => {
        if (checkbox.checked) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.column-toggle input[type="checkbox"]');

    // Load saved states from localStorage
    checkboxes.forEach(checkbox => {
        const column = checkbox.getAttribute('data-column');
        const savedState = localStorage.getItem(`columnVisibility-${column}`);

        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }

        toggleColumnVisibility(checkbox);
    });

    // Save state and apply changes when a checkbox is toggled
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            toggleColumnVisibility(this);
            const column = this.getAttribute('data-column');
            localStorage.setItem(`columnVisibility-${column}`, this.checked);
        });
    });
});


function toggleColumnVisibility(checkbox) {
    const column = checkbox.getAttribute('data-column');
    const cells = document.querySelectorAll(`#savedDataTable th:nth-child(${column}), #savedDataTable td:nth-child(${column})`);
    cells.forEach(cell => {
        cell.style.display = checkbox.checked ? '' : 'none';
    });

    // location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('savedDataTable');
    const headers = table.querySelectorAll('thead input[type="text"]');
    const tbody = document.getElementById('tableBody');

    function applyFilters() {
        const rows = tbody.getElementsByTagName('tr');

        for (let row of rows) {
            let isVisible = true;

            headers.forEach((header, i) => {
                const filter = header.value.toLowerCase();
                const cell = row.getElementsByTagName('td')[i];

                if (cell) {
                    const textValue = cell.textContent || cell.innerText;
                    if (filter && textValue.toLowerCase().indexOf(filter) === -1) {
                        isVisible = false;
                    }
                }
            });

            row.style.display = isVisible ? '' : 'none';
        }
    }

    headers.forEach(header => {
        header.addEventListener('input', applyFilters);
    });
});



// function toggleColumnSection() {
//     const section = document.getElementById('columnToggleSection');
//     section.classList.toggle('hidden');
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const checkboxes = document.querySelectorAll('.column-toggle input[type="checkbox"]');

//     // Load saved states from localStorage
//     checkboxes.forEach(checkbox => {
//         const column = checkbox.getAttribute('data-column');
//         const savedState = localStorage.getItem(`columnVisibility-${column}`);

//         if (savedState !== null) {
//             checkbox.checked = savedState === 'true';
//         }

//         toggleColumnVisibility(checkbox);
//     });

//     // Save state and apply changes when a checkbox is toggled
//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', function () {
//             toggleColumnVisibility(this);
//             const column = this.getAttribute('data-column');
//             localStorage.setItem(`columnVisibility-${column}`, this.checked);
//         });
//     });
// });

// Function to toggle the visibility of the column toggle section
function toggleColumnSection() {
    const section = document.getElementById('columnToggleSection');
    section.classList.toggle('hidden');  // Toggles the 'hidden' class to show/hide the section
}





document.addEventListener('DOMContentLoaded', function () {
    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));
    const exchangeRate = parseFloat(data.exchangeRate); // Example conversion rate from INR to USD (1 INR = 0.012 USD)

    const tableBody = document.getElementById('tableBody');

    tableBody.addEventListener('mouseover', function (event) {
        if (event.target.tagName === 'TD') {
            const columnIndex = event.target.cellIndex;
            const originalValue = parseFloat(event.target.textContent.replace(/[^0-9.]/g, ''));

            if (!isNaN(originalValue)) {
                let convertedValue = '';

                // Determine which column we are dealing with and calculate accordingly
                switch (columnIndex) {
                    case 12: // Paper Cost column
                        convertedValue = (originalValue / exchangeRate).toFixed(2);
                        event.target.setAttribute('title', `Paper Cost in USD: $${convertedValue}`);
                        break;
                    case 14: // Freight Cost column
                        convertedValue = (originalValue / exchangeRate / 23.5).toFixed(2);
                        event.target.setAttribute('title', `Freight Cost in USD: $${convertedValue}`);
                        break;
                    case 22: // Sheeting Cost column
                        sheetingConvertedValue = (originalValue * 1000 / exchangeRate).toFixed(2);
                        event.target.setAttribute('title', `Sheeting Cost in USD: $${sheetingConvertedValue}`);
                        break;
                    case 23: // Wrapper Cost column
                        convertedValue = (originalValue / exchangeRate).toFixed(2);
                        event.target.setAttribute('title', `Wrapper Cost in USD: $${convertedValue}`);
                        break;
                    case 25: // local freight Cost column
                        convertedValue = (originalValue / exchangeRate).toFixed(2);
                        event.target.setAttribute('title', `Local freight in USD: $${convertedValue}`);
                        break;
                    default:
                        event.target.removeAttribute('title');
                        break;
                }
            }
        }
    });

    tableBody.addEventListener('mouseout', function (event) {
        if (event.target.tagName === 'TD') {
            event.target.removeAttribute('title');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));
    const exchangeRate = parseFloat(data.exchangeRate);


    const tableBody = document.getElementById('tableBody');

    tableBody.addEventListener('mouseover', function (event) {
        if (event.target.tagName === 'TD') {
            const columnIndex = event.target.cellIndex;
            const columnIndexCode = event.target.cellIndex;

            // Assuming these are the correct column indices:
            const QNIndex = 1;  // Paper Cost column index
            const SPIndex = 2;  // Paper Cost column index
            const GsmIndex = 4;  // GSM column index
            const paperCodeIndex = 6;  // GSM column index
            const paperCostIndex = 12;  // Paper Cost column index
            const freightCostIndex = 14;  // Freight Cost column index
            const pricePerBoxIndex = 20;  // Total Cost column index
            const sheetingCostIndex = 22;  // Sheeting Cost column index
            const wrapperCostIndex = 23;  // Wrapper Cost column index
            const boxCostIndex = 24;  // Box Cost column index
            const localFreightCostIndex = 25;  // local freight Cost column index
            const miscellaneousCostIndex = 26;  // Total Cost column index
            const marginCostIndex = 27;  // Total Cost column index

            if (columnIndex === pricePerBoxIndex) {
                const row = event.target.parentElement;
                const QNOne = parseFloat(row.cells[QNIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const SPThree = parseFloat(row.cells[SPIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const paperCost = parseFloat(row.cells[paperCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const freightCost = parseFloat(row.cells[freightCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const sheetingCost = parseFloat(row.cells[sheetingCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const wrapperCost = parseFloat(row.cells[wrapperCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const boxCost = parseFloat(row.cells[boxCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const localFreightCost = parseFloat(row.cells[localFreightCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const miscellaneousCost = parseFloat(row.cells[miscellaneousCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const marginCost = parseFloat(row.cells[marginCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;

                const paperCostUSD = (paperCost / exchangeRate).toFixed(2);
                const freightCostUSD = (freightCost / exchangeRate / 23.5).toFixed(2);
                const sheetingCostUSD = (sheetingCost * 1000 / exchangeRate).toFixed(2);
                const wrapperCostUSD = (wrapperCost * 1000 / exchangeRate).toFixed(2);


                const tooltipText = `
                    BreakUp of Total Cost\n
                    Quotation No : ${QNOne}\n
                    Paper Cost (USD): $${paperCostUSD}
                    Paper Cost (INR): ₹${paperCost}\n
                    Freight Cost (USD): $${freightCostUSD}
                    Freight Cost (INR): ₹${freightCost}\n
                    Sheeting Cost / MT (USD): $${sheetingCostUSD}
                    Sheeting Cost / Kg (INR): $${sheetingCost}\n
                    Wrapper Cost / MT (USD): $${wrapperCostUSD}
                    Wrapper Cost / Kg (INR): ₹${wrapperCost}\n
                    Box Cost / Box (INR): ₹${boxCost}\n
                    Local Freight (INR): ₹${localFreightCost}\n
                    miscellaneous (INR): ₹${miscellaneousCost}\n
                    Code: ${marginCost}\n
                `;
                event.target.setAttribute('title', tooltipText.trim());
            }

            if (columnIndexCode === GsmIndex) {
                const row = event.target.parentElement;
                const paperCodeValue = parseFloat(row.cells[paperCodeIndex].textContent.replace(/[^0-9.]/g, '')) || 0;

                const tooltipText = `
                    Paper Code\n
                    Paper Code : ${paperCodeValue}\n
                `;
                event.target.setAttribute('title', tooltipText.trim());
            }
        }


    });

    tableBody.addEventListener('mouseout', function (event) {
        if (event.target.tagName === 'TD') {
            event.target.removeAttribute('title');
        }
    });
});

//Tootip for mobile start
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve saved data from localStorage
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));
    const exchangeRate = parseFloat(data.exchangeRate);

    const tableBody = document.getElementById('tableBody');

    // Event listener for touchstart on mobile devices
    tableBody.addEventListener('touchstart', function (event) {
        if (event.target.tagName === 'TD') {
            const columnIndex = event.target.cellIndex;
            const columnIndexCode = event.target.cellIndex;

            // Assuming these are the correct column indices:
            const QNIndex = 1;
            const SPIndex = 2;
            const GsmIndex = 4;
            const paperCodeIndex = 6;
            const paperCostIndex = 12;
            const freightCostIndex = 14;
            const pricePerBoxIndex = 20;
            const sheetingCostIndex = 22;
            const wrapperCostIndex = 23;
            const boxCostIndex = 24;
            const localFreightCostIndex = 25;
            const miscellaneousCostIndex = 26;
            const marginCostIndex = 27;

            if (columnIndex === pricePerBoxIndex) {
                const row = event.target.parentElement;
                const QNOne = parseFloat(row.cells[QNIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const SPThree = parseFloat(row.cells[SPIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const paperCost = parseFloat(row.cells[paperCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const freightCost = parseFloat(row.cells[freightCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const sheetingCost = parseFloat(row.cells[sheetingCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const wrapperCost = parseFloat(row.cells[wrapperCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const boxCost = parseFloat(row.cells[boxCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const localFreightCost = parseFloat(row.cells[localFreightCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const miscellaneousCost = parseFloat(row.cells[miscellaneousCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;
                const marginCost = parseFloat(row.cells[marginCostIndex].textContent.replace(/[^0-9.]/g, '')) || 0;

                const paperCostUSD = (paperCost / exchangeRate).toFixed(2);
                const freightCostUSD = (freightCost / exchangeRate / 23.5).toFixed(2);
                const sheetingCostUSD = (sheetingCost * 1000 / exchangeRate).toFixed(2);
                const wrapperCostUSD = (wrapperCost * 1000 / exchangeRate).toFixed(2);

                const tooltipText = `
                    BreakUp of Total Cost\n
                    Quotation No : ${QNOne}\n
                    Paper Cost (USD): $${paperCostUSD}
                    Paper Cost (INR): ₹${paperCost}\n
                    Freight Cost (USD): $${freightCostUSD}
                    Freight Cost (INR): ₹${freightCost}\n
                    Sheeting Cost / MT (USD): $${sheetingCostUSD}
                    Sheeting Cost / Kg (INR): $${sheetingCost}\n
                    Wrapper Cost / MT (USD): $${wrapperCostUSD}
                    Wrapper Cost / Kg (INR): ₹${wrapperCost}\n
                    Box Cost / Box (INR): ₹${boxCost}\n
                    Local Freight (INR): ₹${localFreightCost}\n
                    miscellaneous (INR): ₹${miscellaneousCost}\n
                    Code: ${marginCost}\n
                `;
                event.target.setAttribute('title', tooltipText.trim());
            }

            if (columnIndexCode === GsmIndex) {
                const row = event.target.parentElement;
                const paperCodeValue = parseFloat(row.cells[paperCodeIndex].textContent.replace(/[^0-9.]/g, '')) || 0;

                const tooltipText = `
                    Paper Code\n
                    Paper Code : ${paperCodeValue}\n
                `;
                event.target.setAttribute('title', tooltipText.trim());
            }
        }
    });

    // Event listener for touchend to remove tooltip on mobile devices
    tableBody.addEventListener('touchend', function (event) {
        if (event.target.tagName === 'TD') {
            event.target.removeAttribute('title');
        }
    });
});

//Tootip for mobile end


// edit calculation section
document.addEventListener('DOMContentLoaded', function () {
    const editExchangeRate = document.getElementById('editExchangeRate');
    const editPaperCost = document.getElementById('editPaperCost');
    const editFreightCost = document.getElementById('editFreightCost');
    const editReamPerCarton = document.getElementById('editReamPerCarton');
    const editWeightOfReam = document.getElementById('editReamWeight');
    const editSheettingPrice = document.getElementById('editEditMastersheettingPrice');
    const editWrapperPrice = document.getElementById('editEditMasterwrapperPrice');
    const editBoxPrice = document.getElementById('editEditMasterboxPrice');
    const editMarginPrice = document.getElementById('editEditMastermarginPrice');
    const editLocalFreight = document.getElementById('editEditMasterLocalFreight');
    const editMiscellaneous = document.getElementById('editEditMasterMiscellaneous');




    // Example calculation formula
    function EditcalculateResults() {
        const exRate = parseFloat(editExchangeRate.value) || 0;
        const paperCost = parseFloat(editPaperCost.value) || 0;
        const freightCost = parseFloat(editFreightCost.value) || 0;
        const EditRpc = parseFloat(editReamPerCarton.value) || 0;
        const EditRw = parseFloat(editWeightOfReam.value) || 0;

        // console.log(paperCost);
        // console.log(freightCost);

        const weightOfCartonEdit = EditRw * EditRpc;
        const onOfwrapperPerTonEdit = 1000 / EditRw;
        const onOfCartonPerTonEdit = 1000 / weightOfCartonEdit;

        const sheetingPrice = (parseFloat(editSheettingPrice.value) * 1000) / exRate || 0;
        const wrapperPrice = (parseFloat(editWrapperPrice.value) * onOfwrapperPerTonEdit) / exRate || 0;
        const boxPrice = (parseFloat(editBoxPrice.value) * onOfCartonPerTonEdit) / exRate || 0;
        const marginPrice = parseFloat(editMarginPrice.value) || 0;
        const localFreight = parseFloat(editLocalFreight.value) / exRate || 0;
        const miscellaneous = parseFloat(editMiscellaneous.value) || 0;

        // Get currency values
        const editPaperCurrency = document.getElementById('editpaperCostCurrency').value;
        const editFreightCurrency = document.getElementById('editfreightCostCurrency').value;

        // Convert paper cost and freight cost to USD if they are in INR
        const editPaperCostInUSD = editPaperCurrency === 'INR' ? paperCost / exRate : paperCost;
        const editFreightCostInUSD = editFreightCurrency === 'INR' ? freightCost / exRate / 23.5 : freightCost;

        console.log(editPaperCostInUSD);
        console.log(editFreightCostInUSD);


        // Calculate the result based on your formula
        const totalCost = editPaperCostInUSD + editFreightCostInUSD + sheetingPrice + wrapperPrice + boxPrice + localFreight + miscellaneous;
        const pricePerMtEdit = totalCost + marginPrice;
        const pricePerBoxEdit = pricePerMtEdit / onOfCartonPerTonEdit;
        // console.log(editPaperCostInUSD);
        // console.log(editFreightCostInUSD);
        // console.log(sheetingPrice);
        // console.log(wrapperPrice);
        // console.log(boxPrice);
        // console.log(marginPrice);
        // console.log(localFreight);
        // console.log(miscellaneous);


        // Update the results in the DOM
        document.getElementById('editTotalCost').innerText = totalCost.toFixed(2) + ' $ USD';
        // Add more calculations and updates as needed
        document.getElementById('editPricePerMT').innerText = pricePerMtEdit.toFixed(2) + ' $ USD';
        document.getElementById('editPricePerBox').innerText = pricePerBoxEdit.toFixed(2) + ' $ USD';
    }

    // Add event listeners to trigger the calculation when any input changes
    [editExchangeRate, editPaperCost, editFreightCost, editReamPerCarton, editWeightOfReam, editSheettingPrice, editWrapperPrice, editBoxPrice, editMarginPrice, editLocalFreight, editMiscellaneous].forEach(input => {
        input.addEventListener('input', EditcalculateResults);
    });

    // Initial calculation
    EditcalculateResults();

    // Function to populate the saved values
    function editPopulateSavedData() {
        // Get the selected values from the dropdowns
        const selectedGSM = document.getElementById('editGsmSelect').value;
        const selectedMill = document.getElementById('editPaperMillSelect').value;
        const selectedCode = document.getElementById('editPapercodeSelect').value;

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
            document.getElementById('editPaperCost').value = data[key].paperCost || '';
            document.getElementById('editpaperCostCurrency').value = data[key].currency || '';
        } else {
            // Clear the fields if no saved data is found
            document.getElementById('editPaperCost').value = '';
            document.getElementById('editpaperCostCurrency').value = 'INR'; // Default to USD
        }

        // Trigger calculation after populating the data
        EditcalculateResults();
    }

    // Attach event listeners to the dropdowns
    document.getElementById('editGsmSelect').addEventListener('change', editPopulateSavedData);
    document.getElementById('editPaperMillSelect').addEventListener('change', editPopulateSavedData);
    document.getElementById('editPapercodeSelect').addEventListener('change', editPopulateSavedData);

    // Call the function once on page load to populate any pre-selected values
    editPopulateSavedData();


});



// Function to populate data when the checkbox is unchecked
function editPopulateSavedData() {
    // Get the selected values from the dropdowns
    const selectedGSM = document.getElementById('editGsmSelect').value;
    const selectedMill = document.getElementById('editPaperMillSelect').value;
    const selectedCode = document.getElementById('editPapercodeSelect').value;

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
        document.getElementById('editPaperCost').value = data[key].paperCost || '';
        document.getElementById('editpaperCostCurrency').value = data[key].currency || '';
    } else {
        // Clear the fields if no saved data is found
        document.getElementById('editPaperCost').value = '';
        document.getElementById('editpaperCostCurrency').value = 'INR'; // Default to INR
    }

    // Trigger calculation after populating the data
    EditcalculateResults();
}

// Function to populate data when the checkbox is checked
function editPopulateSavedDataCheckBox() {
    // Get the selected values from the dropdowns
    const selectedGSM = document.getElementById('editGsmSelect').value;
    const selectedMill = document.getElementById('editPaperMillSelect').value;
    const selectedCode = document.getElementById('editPapercodeSelect').value;

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
        document.getElementById('editPaperCost').value = data[paperkey].paperCost || '';
        document.getElementById('editpaperCostCurrency').value = data[paperkey].currency || '';
    } else {
        document.getElementById('editPaperCost').value = '';
        document.getElementById('editpaperCostCurrency').value = 'INR'; // Default to INR
    }

    // Trigger calculation after populating the data
    EditcalculateResults();
}

// Function to check the checkbox status and call the appropriate function
function checkAndPopulateData() {
    const checkbox = document.getElementById('editSheetingLocationCheckBox');

    if (checkbox.checked) {
        editPopulateSavedDataCheckBox();
    } else {
        editPopulateSavedData();
    }
}

// Attach event listeners to the dropdowns and checkbox
document.getElementById('editGsmSelect').addEventListener('change', checkAndPopulateData);
document.getElementById('editPaperMillSelect').addEventListener('change', checkAndPopulateData);
document.getElementById('editPapercodeSelect').addEventListener('change', checkAndPopulateData);
document.getElementById('editSheetingLocationCheckBox').addEventListener('click', checkAndPopulateData);

// Call the function once on page load to populate any pre-selected values
document.addEventListener('DOMContentLoaded', checkAndPopulateData);






