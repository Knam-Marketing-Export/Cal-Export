// Configure AWS SDK
AWS.config.update({
    region: 'ap-south-1', // Your AWS region
    credentials: new AWS.Credentials('AKIAQYEI4VYJEIHQVM2P', '5ygTZyKziHWPbQL2Y5b2jGPwP6KRcaM8+XvrtqTy') // Replace with your credentials
});

// Create DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

// Define parameters to get the data
const params = {
    TableName: 'masterDataExportCal',
    Key: {
        "GSM_PaperMill_PaperCode": "184536088030005000",
        "Date": "03-09-2024" // Use the date format as per your table schema
    }
};

// Function to fetch other Value data from DynamoDB
function getOtherValues() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const exchangeRate = data.Item ? data.Item['ExchangeRate'] : 'Not Found';
            const sheetingCost = data.Item ? data.Item['SheetingCost'] : 'Not Found';
            const BoxPrice = data.Item ? data.Item['BoxPrice'] : 'Not Found';
            const wrapperCost = data.Item ? data.Item['WrapperCost'] : 'Not Found';
            const LocalFreight = data.Item ? data.Item['LocalFreight'] : 'Not Found';
            const MiscellaneousCost = data.Item ? data.Item['Miscellaneous '] : 'Not Found';
            const MarginValue = data.Item ? data.Item['Margin'] : 'Not Found';
            const exchangeRateInput = document.getElementById('exchangeRate');
            const sheetingCostInput = document.getElementById('sheetingCost');
            const boxPriceInput = document.getElementById('boxPrice');
            const wrapperCostInput = document.getElementById('wrappersPrice');
            const LocalFreightInput = document.getElementById('localFreight');
            const MiscellaneousCostInput = document.getElementById('miscellaneous');
            const MarginValueInput = document.getElementById('margin');
            if (exchangeRateInput && sheetingCostInput && boxPriceInput && wrapperCostInput && LocalFreightInput && MiscellaneousCostInput && MarginValueInput) {
                exchangeRateInput.value = typeof exchangeRate === 'number' || !isNaN(parseFloat(exchangeRate)) ? parseFloat(exchangeRate) : '';
                sheetingCostInput.value = typeof sheetingCost === 'number' || !isNaN(parseFloat(sheetingCost)) ? parseFloat(sheetingCost) : '';
                boxPriceInput.value = typeof BoxPrice === 'number' || !isNaN(parseFloat(BoxPrice)) ? parseFloat(BoxPrice) : '';
                wrapperCostInput.value = typeof wrapperCost === 'number' || !isNaN(parseFloat(wrapperCost)) ? parseFloat(wrapperCost) : '';
                LocalFreightInput.value = typeof LocalFreight === 'number' || !isNaN(parseFloat(LocalFreight)) ? parseFloat(LocalFreight) : '';
                MiscellaneousCostInput.value = typeof MiscellaneousCost === 'number' || !isNaN(parseFloat(MiscellaneousCost)) ? parseFloat(MiscellaneousCost) : '';
                MarginValueInput.value = typeof MarginValue === 'number' || !isNaN(parseFloat(MarginValue)) ? parseFloat(MarginValue) : '';
            } else {
                console.error("Element with ID 'exchangeRate' not found.");
            }

            // console.log("Exchange Rate =",exchangeRate);
            // console.log("Sheeting Cost =",sheetingCost);
            // console.log("Box Price =",BoxPrice);
            // console.log("Wrapper Cost =",wrapperCost);
            // console.log("Local Freight =" ,LocalFreight)
            // console.log("Miscellaneous Cost =" ,MiscellaneousCost)
            // console.log("Margin Value =" ,MarginValue)

        }
    });
}

// Function to update the other values in DynamoDB
function updateOtherValues() {
    const exchangeRateInput = document.getElementById('exchangeRate');
    const sheetingCostInput = document.getElementById('sheetingCost');
    const boxPriceInput = document.getElementById('boxPrice');
    const wrapperCostInput = document.getElementById('wrappersPrice');
    const localFreightInput = document.getElementById('localFreight');
    const miscellaneousCostInput = document.getElementById('miscellaneous');
    const marginValueInput = document.getElementById('margin');

    const updateParams = {
        TableName: 'masterDataExportCal',
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024"
        },
        UpdateExpression: `set ExchangeRate = :exchangeRate, 
                            SheetingCost = :sheetingCost, 
                            BoxPrice = :boxPrice, 
                            WrapperCost = :wrapperCost, 
                            LocalFreight = :localFreight, 
                            Miscellaneous = :miscellaneousCost, 
                            Margin = :marginValue`,
        ExpressionAttributeValues: {
            ":exchangeRate": parseFloat(exchangeRateInput.value) || null,
            ":sheetingCost": parseFloat(sheetingCostInput.value) || null,
            ":boxPrice": parseFloat(boxPriceInput.value) || null,
            ":wrapperCost": parseFloat(wrapperCostInput.value) || null,
            ":localFreight": parseFloat(localFreightInput.value) || null,
            ":miscellaneousCost": parseFloat(miscellaneousCostInput.value) || null,
            ":marginValue": parseFloat(marginValueInput.value) || null
        }
    };

    docClient.update(updateParams, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

// Function to fetch data of paper cost 360 from DynamoDB
function getPaperCost360() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const paperCostData = data.Item ? data.Item['CostSheets'] : null;
            if (paperCostData) {
                const paper360 = paperCostData['PaperCostSheets360'];
                if (paper360) {
                    // 18GSM
                    const costDetails18 = paper360['18GSM'];
                    if (costDetails18) {
                        const gsm18 = costDetails18['GSM'] || 'Not Found';
                        const cost18 = costDetails18['Cost'] || 'Not Found';
                        const currency18 = costDetails18['Currency'] || 'Not Found';
                        const paper18InputGsm = document.getElementById('18gsm');
                        const paper18Input = document.getElementById('18paperCost');
                        const currencySelect18 = document.getElementById('18paperCostCurrency');

                        if (paper18InputGsm && paper18Input && currencySelect18) {
                            paper18InputGsm.value = !isNaN(parseFloat(gsm18)) ? parseFloat(gsm18) : '';
                            paper18Input.value = !isNaN(parseFloat(cost18)) ? parseFloat(cost18) : '';
                            currencySelect18.value = currency18 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm' '18paperCost', '18paperCostCurrency', not found.");
                        }
                    }
                    // 22GSM
                    const costDetails22 = paper360['22GSM'];
                    if (costDetails22) {
                        const gsm22 = costDetails22['GSM'] || 'Not Found';
                        const cost22 = costDetails22['Cost'] || 'Not Found';
                        const currency22 = costDetails22['Currency'] || 'Not Found';
                        const paper22InputGsm = document.getElementById('22gsm');
                        const paper22Input = document.getElementById('22paperCost');
                        const currencySelect22 = document.getElementById('22paperCostCurrency');

                        if (paper22InputGsm && paper22Input && currencySelect22) {
                            paper22InputGsm.value = !isNaN(parseFloat(gsm22)) ? parseFloat(gsm22) : '';
                            paper22Input.value = !isNaN(parseFloat(cost22)) ? parseFloat(cost22) : '';
                            currencySelect22.value = currency22 || 'INR';
                        } else {
                            console.error("Element with ID '22gsm', '22paperCost', '22paperCostCurrency' not found.");
                        }
                    }
                    // 25GSM
                    const costDetails25 = paper360['25GSM'];
                    if (costDetails25) {
                        const gsm25 = costDetails25['GSM'] || 'Not Found';
                        const cost25 = costDetails25['Cost'] || 'Not Found';
                        const currency25 = costDetails25['Currency'] || 'Not Found';
                        const paper25InputGsm = document.getElementById('25gsm');
                        const paper25Input = document.getElementById('25paperCost');
                        const currencySelect25 = document.getElementById('25paperCostCurrency');

                        if (paper25InputGsm && paper25Input && currencySelect25) {
                            paper25InputGsm.value = !isNaN(parseFloat(gsm25)) ? parseFloat(gsm25) : '';
                            paper25Input.value = !isNaN(parseFloat(cost25)) ? parseFloat(cost25) : '';
                            currencySelect25.value = currency25 || 'INR';
                        } else {
                            console.error("Element with ID '25gsm', '25paperCost', '25paperCostCurrency' not found.");
                        }
                    }

                    // 35GSM
                    const costDetails35 = paper360['35GSM'];
                    if (costDetails35) {
                        const gsm35 = costDetails35['GSM'] || 'Not Found';
                        const cost35 = costDetails35['Cost'] || 'Not Found';
                        const currency35 = costDetails35['Currency'] || 'Not Found';
                        const paper35InputGsm = document.getElementById('35gsm');
                        const paper35Input = document.getElementById('35paperCost');
                        const currencySelect35 = document.getElementById('35paperCostCurrency');

                        if (paper35InputGsm && paper35Input && currencySelect35) {
                            paper35InputGsm.value = !isNaN(parseFloat(gsm35)) ? parseFloat(gsm35) : '';
                            paper35Input.value = !isNaN(parseFloat(cost35)) ? parseFloat(cost35) : '';
                            currencySelect35.value = currency35 || 'INR';
                        } else {
                            console.error("Element with ID '35gsm', '35paperCost', '35paperCostCurrency' not found.");
                        }
                    }

                    // 45GSM
                    const costDetails45 = paper360['45GSM'];
                    if (costDetails45) {
                        const gsm45 = costDetails45['GSM'] || 'Not Found';
                        const cost45 = costDetails45['Cost'] || 'Not Found';
                        const currency45 = costDetails45['Currency'] || 'Not Found';
                        const paper45InputGsm = document.getElementById('45gsm');
                        const paper45Input = document.getElementById('45paperCost');
                        const currencySelect45 = document.getElementById('45paperCostCurrency');

                        if (paper45InputGsm && paper45Input && currencySelect45) {
                            paper45InputGsm.value = !isNaN(parseFloat(gsm45)) ? parseFloat(gsm45) : '';
                            paper45Input.value = !isNaN(parseFloat(cost45)) ? parseFloat(cost45) : '';
                            currencySelect45.value = currency45 || 'INR';
                        } else {
                            console.error("Element with ID '45gsm', '45paperCost', '45paperCostCurrency' not found.");
                        }
                    }
                }
            }
        }
    });
}

// Function to update PaperCost360 in DynamoDB
function updatePaperCost360() {
    const paper18InputGsm = document.getElementById('18gsm').value;
    const paper18Input = document.getElementById('18paperCost').value;
    const currencySelect18 = document.getElementById('18paperCostCurrency').value;

    const paper22InputGsm = document.getElementById('22gsm').value;
    const paper22Input = document.getElementById('22paperCost').value;
    const currencySelect22 = document.getElementById('22paperCostCurrency').value;

    const paper25InputGsm = document.getElementById('25gsm').value;
    const paper25Input = document.getElementById('25paperCost').value;
    const currencySelect25 = document.getElementById('25paperCostCurrency').value;

    const paper35InputGsm = document.getElementById('35gsm').value;
    const paper35Input = document.getElementById('35paperCost').value;
    const currencySelect35 = document.getElementById('35paperCostCurrency').value;

    const paper45InputGsm = document.getElementById('45gsm').value;
    const paper45Input = document.getElementById('45paperCost').value;
    const currencySelect45 = document.getElementById('45paperCostCurrency').value;

    const params = {
        TableName: 'masterDataExportCal',
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Use the date format as per your table schema
        },
        UpdateExpression: `
            set #cs.#pcs360.#gsm18.#cost = :cost18, 
                #cs.#pcs360.#gsm18.#currency = :curr18, 
                #cs.#pcs360.#gsm18.#gsm = :gsm18,
                #cs.#pcs360.#gsm22.#cost = :cost22, 
                #cs.#pcs360.#gsm22.#currency = :curr22, 
                #cs.#pcs360.#gsm22.#gsm = :gsm22,
                #cs.#pcs360.#gsm25.#cost = :cost25, 
                #cs.#pcs360.#gsm25.#currency = :curr25, 
                #cs.#pcs360.#gsm25.#gsm = :gsm25,
                #cs.#pcs360.#gsm35.#cost = :cost35, 
                #cs.#pcs360.#gsm35.#currency = :curr35, 
                #cs.#pcs360.#gsm35.#gsm = :gsm35,
                #cs.#pcs360.#gsm45.#cost = :cost45, 
                #cs.#pcs360.#gsm45.#currency = :curr45, 
                #cs.#pcs360.#gsm45.#gsm = :gsm45
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#pcs360": "PaperCostSheets360",
            "#gsm18": "18GSM",
            "#gsm22": "22GSM",
            "#gsm25": "25GSM",
            "#gsm35": "35GSM",
            "#gsm45": "45GSM",
            "#cost": "Cost",
            "#currency": "Currency",
            "#gsm": "GSM"
        },
        ExpressionAttributeValues: {
            ":cost18": parseFloat(paper18Input) || 0,
            ":curr18": currencySelect18 || 'INR',
            ":gsm18": parseFloat(paper18InputGsm) || 0,
            ":cost22": parseFloat(paper22Input) || 0,
            ":curr22": currencySelect22 || 'INR',
            ":gsm22": parseFloat(paper22InputGsm) || 0,
            ":cost25": parseFloat(paper25Input) || 0,
            ":curr25": currencySelect25 || 'INR',
            ":gsm25": parseFloat(paper25InputGsm) || 0,
            ":cost35": parseFloat(paper35Input) || 0,
            ":curr35": currencySelect35 || 'INR',
            ":gsm35": parseFloat(paper35InputGsm) || 0,
            ":cost45": parseFloat(paper45Input) || 0,
            ":curr45": currencySelect45 || 'INR',
            ":gsm45": parseFloat(paper45InputGsm) || 0
        },
        ReturnValues: "UPDATED_NEW"
    };


    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

// Function to fetch data of paper cost 800/3000 from DynamoDB
function getPaperCost8803000() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const paperCostData = data.Item ? data.Item['CostSheets'] : null;
            if (paperCostData) {
                const paper8803000 = paperCostData['PaperCostSheets8803000'];
                if (paper8803000) {
                    // 17GSM
                    const costDetails17 = paper8803000['17GSM'];
                    if (costDetails17) {
                        const gsm17 = costDetails17['GSM'] || 'Not Found';
                        const cost17 = costDetails17['Cost'] || 'Not Found';
                        const currency17 = costDetails17['Currency'] || 'Not Found';
                        const paper17InputGsm = document.getElementById('17gsm8803000');
                        const paper17Input = document.getElementById('17paperCost8803000');
                        const currencySelect17 = document.getElementById('17paperCostCurrency8803000');

                        if (paper17InputGsm && paper17Input && currencySelect17) {
                            paper17InputGsm.value = !isNaN(parseFloat(gsm17)) ? parseFloat(gsm17) : '';
                            paper17Input.value = !isNaN(parseFloat(cost17)) ? parseFloat(cost17) : '';
                            currencySelect17.value = currency17 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm' '18paperCost', '18paperCostCurrency', not found.");
                        }
                    }
                    // 18GSM
                    const costDetails18 = paper8803000['18GSM'];
                    if (costDetails18) {
                        const gsm18 = costDetails18['GSM'] || 'Not Found';
                        const cost18 = costDetails18['Cost'] || 'Not Found';
                        const currency18 = costDetails18['Currency'] || 'Not Found';
                        const paper18InputGsm = document.getElementById('18gsm8803000');
                        const paper18Input = document.getElementById('18paperCost8803000');
                        const currencySelect18 = document.getElementById('18paperCostCurrency8803000');

                        if (paper18InputGsm && paper18Input && currencySelect18) {
                            paper18InputGsm.value = !isNaN(parseFloat(gsm18)) ? parseFloat(gsm18) : '';
                            paper18Input.value = !isNaN(parseFloat(cost18)) ? parseFloat(cost18) : '';
                            currencySelect18.value = currency18 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm8803000' '18paperCost8803000', '18paperCostCurrency8803000', not found.");
                        }
                    }
                    // 22GSM
                    const costDetails22 = paper8803000['22GSM'];
                    if (costDetails22) {
                        const gsm22 = costDetails22['GSM'] || 'Not Found';
                        const cost22 = costDetails22['Cost'] || 'Not Found';
                        const currency22 = costDetails22['Currency'] || 'Not Found';
                        const paper22InputGsm = document.getElementById('22gsm8803000');
                        const paper22Input = document.getElementById('22paperCost8803000');
                        const currencySelect22 = document.getElementById('22paperCostCurrency8803000');

                        if (paper22InputGsm && paper22Input && currencySelect22) {
                            paper22InputGsm.value = !isNaN(parseFloat(gsm22)) ? parseFloat(gsm22) : '';
                            paper22Input.value = !isNaN(parseFloat(cost22)) ? parseFloat(cost22) : '';
                            currencySelect22.value = currency22 || 'INR';
                        } else {
                            console.error("Element with ID '22gsm', '22paperCost', '22paperCostCurrency' not found.");
                        }
                    }
                    // 25GSM
                    const costDetails25 = paper8803000['25GSM'];
                    if (costDetails25) {
                        const gsm25 = costDetails25['GSM'] || 'Not Found';
                        const cost25 = costDetails25['Cost'] || 'Not Found';
                        const currency25 = costDetails25['Currency'] || 'Not Found';
                        const paper25InputGsm = document.getElementById('25gsm8803000');
                        const paper25Input = document.getElementById('25paperCost8803000');
                        const currencySelect25 = document.getElementById('25paperCostCurrency8803000');

                        if (paper25InputGsm && paper25Input && currencySelect25) {
                            paper25InputGsm.value = !isNaN(parseFloat(gsm25)) ? parseFloat(gsm25) : '';
                            paper25Input.value = !isNaN(parseFloat(cost25)) ? parseFloat(cost25) : '';
                            currencySelect25.value = currency25 || 'INR';
                        } else {
                            console.error("Element with ID '25gsm', '25paperCost', '25paperCostCurrency' not found.");
                        }
                    }

                    // 35GSM
                    const costDetails35 = paper8803000['35GSM'];
                    if (costDetails35) {
                        const gsm35 = costDetails35['GSM'] || 'Not Found';
                        const cost35 = costDetails35['Cost'] || 'Not Found';
                        const currency35 = costDetails35['Currency'] || 'Not Found';
                        const paper35InputGsm = document.getElementById('35gsm8803000');
                        const paper35Input = document.getElementById('35paperCost8803000');
                        const currencySelect35 = document.getElementById('35paperCostCurrency8803000');

                        if (paper35InputGsm && paper35Input && currencySelect35) {
                            paper35InputGsm.value = !isNaN(parseFloat(gsm35)) ? parseFloat(gsm35) : '';
                            paper35Input.value = !isNaN(parseFloat(cost35)) ? parseFloat(cost35) : '';
                            currencySelect35.value = currency35 || 'INR';
                        } else {
                            console.error("Element with ID '35gsm', '35paperCost', '35paperCostCurrency' not found.");
                        }
                    }

                    // 45GSM
                    const costDetails45 = paper8803000['45GSM'];
                    if (costDetails45) {
                        const gsm45 = costDetails45['GSM'] || 'Not Found';
                        const cost45 = costDetails45['Cost'] || 'Not Found';
                        const currency45 = costDetails45['Currency'] || 'Not Found';
                        const paper45InputGsm = document.getElementById('45gsm8803000');
                        const paper45Input = document.getElementById('45paperCost8803000');
                        const currencySelect45 = document.getElementById('45paperCostCurrency8803000');

                        if (paper45InputGsm && paper45Input && currencySelect45) {
                            paper45InputGsm.value = !isNaN(parseFloat(gsm45)) ? parseFloat(gsm45) : '';
                            paper45Input.value = !isNaN(parseFloat(cost45)) ? parseFloat(cost45) : '';
                            currencySelect45.value = currency45 || 'INR';
                        } else {
                            console.error("Element with ID '45gsm', '45paperCost', '45paperCostCurrency' not found.");
                        }
                    }
                }
            }
        }
    });
}
// Function to update PaperCost880/3000 in DynamoDB
function updatePaperCost8803000() {
    // Fetching values from HTML elements
    const paper17InputGsm = document.getElementById('17gsm8803000').value;
    const paper17Input = document.getElementById('17paperCost8803000').value;
    const currencySelect17 = document.getElementById('17paperCostCurrency8803000').value;

    const paper18InputGsm = document.getElementById('18gsm8803000').value;
    const paper18Input = document.getElementById('18paperCost8803000').value;
    const currencySelect18 = document.getElementById('18paperCostCurrency8803000').value;

    const paper22InputGsm = document.getElementById('22gsm8803000').value;
    const paper22Input = document.getElementById('22paperCost8803000').value;
    const currencySelect22 = document.getElementById('22paperCostCurrency8803000').value;

    const paper25InputGsm = document.getElementById('25gsm8803000').value;
    const paper25Input = document.getElementById('25paperCost8803000').value;
    const currencySelect25 = document.getElementById('25paperCostCurrency8803000').value;

    const paper35InputGsm = document.getElementById('35gsm8803000').value;
    const paper35Input = document.getElementById('35paperCost8803000').value;
    const currencySelect35 = document.getElementById('35paperCostCurrency8803000').value;

    const paper45InputGsm = document.getElementById('45gsm8803000').value;
    const paper45Input = document.getElementById('45paperCost8803000').value;
    const currencySelect45 = document.getElementById('45paperCostCurrency8803000').value;

    const params = {
        TableName: "masterDataExportCal", // Replace with your actual table name
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Include other keys if necessary
        },
        UpdateExpression: `
            set #cs.#pcs8803000.#gsm17.#cost = :cost17, 
                #cs.#pcs8803000.#gsm17.#currency = :curr17, 
                #cs.#pcs8803000.#gsm17.#gsm = :gsm17,
                #cs.#pcs8803000.#gsm18.#cost = :cost18, 
                #cs.#pcs8803000.#gsm18.#currency = :curr18, 
                #cs.#pcs8803000.#gsm18.#gsm = :gsm18,
                #cs.#pcs8803000.#gsm22.#cost = :cost22, 
                #cs.#pcs8803000.#gsm22.#currency = :curr22, 
                #cs.#pcs8803000.#gsm22.#gsm = :gsm22,
                #cs.#pcs8803000.#gsm25.#cost = :cost25, 
                #cs.#pcs8803000.#gsm25.#currency = :curr25, 
                #cs.#pcs8803000.#gsm25.#gsm = :gsm25,
                #cs.#pcs8803000.#gsm35.#cost = :cost35, 
                #cs.#pcs8803000.#gsm35.#currency = :curr35, 
                #cs.#pcs8803000.#gsm35.#gsm = :gsm35,
                #cs.#pcs8803000.#gsm45.#cost = :cost45, 
                #cs.#pcs8803000.#gsm45.#currency = :curr45, 
                #cs.#pcs8803000.#gsm45.#gsm = :gsm45
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#pcs8803000": "PaperCostSheets8803000",
            "#gsm17": "17GSM",
            "#gsm18": "18GSM",
            "#gsm22": "22GSM",
            "#gsm25": "25GSM",
            "#gsm35": "35GSM",
            "#gsm45": "45GSM",
            "#cost": "Cost",
            "#currency": "Currency",
            "#gsm": "GSM"
        },
        ExpressionAttributeValues: {
            ":cost17": parseFloat(paper17Input) || 0,
            ":curr17": currencySelect17 || 'INR',
            ":gsm17": parseFloat(paper17InputGsm) || 0,
            ":cost18": parseFloat(paper18Input) || 0,
            ":curr18": currencySelect18 || 'INR',
            ":gsm18": parseFloat(paper18InputGsm) || 0,
            ":cost22": parseFloat(paper22Input) || 0,
            ":curr22": currencySelect22 || 'INR',
            ":gsm22": parseFloat(paper22InputGsm) || 0,
            ":cost25": parseFloat(paper25Input) || 0,
            ":curr25": currencySelect25 || 'INR',
            ":gsm25": parseFloat(paper25InputGsm) || 0,
            ":cost35": parseFloat(paper35Input) || 0,
            ":curr35": currencySelect35 || 'INR',
            ":gsm35": parseFloat(paper35InputGsm) || 0,
            ":cost45": parseFloat(paper45Input) || 0,
            ":curr45": currencySelect45 || 'INR',
            ":gsm45": parseFloat(paper45InputGsm) || 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

// Function to fetch data of paper cost 800/5000 from DynamoDB
function getPaperCost8805000() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const paperCostData = data.Item ? data.Item['CostSheets'] : null;
            if (paperCostData) {
                const paper8805000 = paperCostData['PaperCostSheets8805000'];
                if (paper8805000) {
                    // 17GSM
                    const costDetails17 = paper8805000['17GSM'];
                    if (costDetails17) {
                        const gsm17 = costDetails17['GSM'] || 'Not Found';
                        const cost17 = costDetails17['Cost'] || 'Not Found';
                        const currency17 = costDetails17['Currency'] || 'Not Found';
                        const paper17InputGsm = document.getElementById('17gsm8805000');
                        const paper17Input = document.getElementById('17paperCost8805000');
                        const currencySelect17 = document.getElementById('17paperCostCurrency8805000');

                        if (paper17InputGsm && paper17Input && currencySelect17) {
                            paper17InputGsm.value = !isNaN(parseFloat(gsm17)) ? parseFloat(gsm17) : '';
                            paper17Input.value = !isNaN(parseFloat(cost17)) ? parseFloat(cost17) : '';
                            currencySelect17.value = currency17 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm' '18paperCost', '18paperCostCurrency', not found.");
                        }
                    }
                    // 18GSM
                    const costDetails18 = paper8805000['18GSM'];
                    if (costDetails18) {
                        const gsm18 = costDetails18['GSM'] || 'Not Found';
                        const cost18 = costDetails18['Cost'] || 'Not Found';
                        const currency18 = costDetails18['Currency'] || 'Not Found';
                        const paper18InputGsm = document.getElementById('18gsm8805000');
                        const paper18Input = document.getElementById('18paperCost8805000');
                        const currencySelect18 = document.getElementById('18paperCostCurrency8805000');

                        if (paper18InputGsm && paper18Input && currencySelect18) {
                            paper18InputGsm.value = !isNaN(parseFloat(gsm18)) ? parseFloat(gsm18) : '';
                            paper18Input.value = !isNaN(parseFloat(cost18)) ? parseFloat(cost18) : '';
                            currencySelect18.value = currency18 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm8803000' '18paperCost8803000', '18paperCostCurrency8803000', not found.");
                        }
                    }
                    // 22GSM
                    const costDetails22 = paper8805000['22GSM'];
                    if (costDetails22) {
                        const gsm22 = costDetails22['GSM'] || 'Not Found';
                        const cost22 = costDetails22['Cost'] || 'Not Found';
                        const currency22 = costDetails22['Currency'] || 'Not Found';
                        const paper22InputGsm = document.getElementById('22gsm8805000');
                        const paper22Input = document.getElementById('22paperCost8805000');
                        const currencySelect22 = document.getElementById('22paperCostCurrency8805000');

                        if (paper22InputGsm && paper22Input && currencySelect22) {
                            paper22InputGsm.value = !isNaN(parseFloat(gsm22)) ? parseFloat(gsm22) : '';
                            paper22Input.value = !isNaN(parseFloat(cost22)) ? parseFloat(cost22) : '';
                            currencySelect22.value = currency22 || 'INR';
                        } else {
                            console.error("Element with ID '22gsm', '22paperCost', '22paperCostCurrency' not found.");
                        }
                    }
                    // 25GSM
                    const costDetails25 = paper8805000['25GSM'];
                    if (costDetails25) {
                        const gsm25 = costDetails25['GSM'] || 'Not Found';
                        const cost25 = costDetails25['Cost'] || 'Not Found';
                        const currency25 = costDetails25['Currency'] || 'Not Found';
                        const paper25InputGsm = document.getElementById('25gsm8805000');
                        const paper25Input = document.getElementById('25paperCost8805000');
                        const currencySelect25 = document.getElementById('25paperCostCurrency8805000');

                        if (paper25InputGsm && paper25Input && currencySelect25) {
                            paper25InputGsm.value = !isNaN(parseFloat(gsm25)) ? parseFloat(gsm25) : '';
                            paper25Input.value = !isNaN(parseFloat(cost25)) ? parseFloat(cost25) : '';
                            currencySelect25.value = currency25 || 'INR';
                        } else {
                            console.error("Element with ID '25gsm', '25paperCost', '25paperCostCurrency' not found.");
                        }
                    }

                    // 35GSM
                    const costDetails35 = paper8805000['35GSM'];
                    if (costDetails35) {
                        const gsm35 = costDetails35['GSM'] || 'Not Found';
                        const cost35 = costDetails35['Cost'] || 'Not Found';
                        const currency35 = costDetails35['Currency'] || 'Not Found';
                        const paper35InputGsm = document.getElementById('35gsm8805000');
                        const paper35Input = document.getElementById('35paperCost8805000');
                        const currencySelect35 = document.getElementById('35paperCostCurrency8805000');

                        if (paper35InputGsm && paper35Input && currencySelect35) {
                            paper35InputGsm.value = !isNaN(parseFloat(gsm35)) ? parseFloat(gsm35) : '';
                            paper35Input.value = !isNaN(parseFloat(cost35)) ? parseFloat(cost35) : '';
                            currencySelect35.value = currency35 || 'INR';
                        } else {
                            console.error("Element with ID '35gsm', '35paperCost', '35paperCostCurrency' not found.");
                        }
                    }

                    // 45GSM
                    const costDetails45 = paper8805000['45GSM'];
                    if (costDetails45) {
                        const gsm45 = costDetails45['GSM'] || 'Not Found';
                        const cost45 = costDetails45['Cost'] || 'Not Found';
                        const currency45 = costDetails45['Currency'] || 'Not Found';
                        const paper45InputGsm = document.getElementById('45gsm8805000');
                        const paper45Input = document.getElementById('45paperCost8805000');
                        const currencySelect45 = document.getElementById('45paperCostCurrency8805000');

                        if (paper45InputGsm && paper45Input && currencySelect45) {
                            paper45InputGsm.value = !isNaN(parseFloat(gsm45)) ? parseFloat(gsm45) : '';
                            paper45Input.value = !isNaN(parseFloat(cost45)) ? parseFloat(cost45) : '';
                            currencySelect45.value = currency45 || 'INR';
                        } else {
                            console.error("Element with ID '45gsm', '45paperCost', '45paperCostCurrency' not found.");
                        }
                    }
                }
            }
        }
    });
}

// Function to update PaperCost880/5000 in DynamoDB
function updatePaperCost8805000() {
    const paper17InputGsm = document.getElementById('17gsm8805000').value;
    const paper17Input = document.getElementById('17paperCost8805000').value;
    const currencySelect17 = document.getElementById('17paperCostCurrency8805000').value;

    const paper18InputGsm = document.getElementById('18gsm8805000').value;
    const paper18Input = document.getElementById('18paperCost8805000').value;
    const currencySelect18 = document.getElementById('18paperCostCurrency8805000').value;

    const paper22InputGsm = document.getElementById('22gsm8805000').value;
    const paper22Input = document.getElementById('22paperCost8805000').value;
    const currencySelect22 = document.getElementById('22paperCostCurrency8805000').value;

    const paper25InputGsm = document.getElementById('25gsm8805000').value;
    const paper25Input = document.getElementById('25paperCost8805000').value;
    const currencySelect25 = document.getElementById('25paperCostCurrency8805000').value;

    const paper35InputGsm = document.getElementById('35gsm8805000').value;
    const paper35Input = document.getElementById('35paperCost8805000').value;
    const currencySelect35 = document.getElementById('35paperCostCurrency8805000').value;

    const paper45InputGsm = document.getElementById('45gsm8805000').value;
    const paper45Input = document.getElementById('45paperCost8805000').value;
    const currencySelect45 = document.getElementById('45paperCostCurrency8805000').value;

    const params = {
        TableName: "masterDataExportCal", // Replace with your actual table name
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Include other keys if necessary
        },
        UpdateExpression: `
            set #cs.#pcs8805000.#gsm17.#cost = :cost17, 
                #cs.#pcs8805000.#gsm17.#currency = :curr17, 
                #cs.#pcs8805000.#gsm17.#gsm = :gsm17,
                #cs.#pcs8805000.#gsm18.#cost = :cost18, 
                #cs.#pcs8805000.#gsm18.#currency = :curr18, 
                #cs.#pcs8805000.#gsm18.#gsm = :gsm18,
                #cs.#pcs8805000.#gsm22.#cost = :cost22, 
                #cs.#pcs8805000.#gsm22.#currency = :curr22, 
                #cs.#pcs8805000.#gsm22.#gsm = :gsm22,
                #cs.#pcs8805000.#gsm25.#cost = :cost25, 
                #cs.#pcs8805000.#gsm25.#currency = :curr25, 
                #cs.#pcs8805000.#gsm25.#gsm = :gsm25,
                #cs.#pcs8805000.#gsm35.#cost = :cost35, 
                #cs.#pcs8805000.#gsm35.#currency = :curr35, 
                #cs.#pcs8805000.#gsm35.#gsm = :gsm35,
                #cs.#pcs8805000.#gsm45.#cost = :cost45, 
                #cs.#pcs8805000.#gsm45.#currency = :curr45, 
                #cs.#pcs8805000.#gsm45.#gsm = :gsm45
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#pcs8805000": "PaperCostSheets8805000",
            "#gsm17": "17GSM",
            "#gsm18": "18GSM",
            "#gsm22": "22GSM",
            "#gsm25": "25GSM",
            "#gsm35": "35GSM",
            "#gsm45": "45GSM",
            "#cost": "Cost",
            "#currency": "Currency",
            "#gsm": "GSM"
        },
        ExpressionAttributeValues: {
            ":cost17": parseFloat(paper17Input) || 0,
            ":curr17": currencySelect17 || 'INR',
            ":gsm17": parseFloat(paper17InputGsm) || 0,
            ":cost18": parseFloat(paper18Input) || 0,
            ":curr18": currencySelect18 || 'INR',
            ":gsm18": parseFloat(paper18InputGsm) || 0,
            ":cost22": parseFloat(paper22Input) || 0,
            ":curr22": currencySelect22 || 'INR',
            ":gsm22": parseFloat(paper22InputGsm) || 0,
            ":cost25": parseFloat(paper25Input) || 0,
            ":curr25": currencySelect25 || 'INR',
            ":gsm25": parseFloat(paper25InputGsm) || 0,
            ":cost35": parseFloat(paper35Input) || 0,
            ":curr35": currencySelect35 || 'INR',
            ":gsm35": parseFloat(paper35InputGsm) || 0,
            ":cost45": parseFloat(paper45Input) || 0,
            ":curr45": currencySelect45 || 'INR',
            ":gsm45": parseFloat(paper45InputGsm) || 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

// Function to fetch data of paper cost 800/300030 from DynamoDB
function getPaperCost880300030() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const paperCostData = data.Item ? data.Item['CostSheets'] : null;
            if (paperCostData) {
                const paper880300030 = paperCostData['PaperCostSheets880300030'];
                if (paper880300030) {
                    // 17GSM
                    const costDetails17 = paper880300030['17GSM'];
                    if (costDetails17) {
                        const gsm17 = costDetails17['GSM'] || 'Not Found';
                        const cost17 = costDetails17['Cost'] || 'Not Found';
                        const currency17 = costDetails17['Currency'] || 'Not Found';
                        const paper17InputGsm = document.getElementById('17gsm880300030');
                        const paper17Input = document.getElementById('17paperCost880300030');
                        const currencySelect17 = document.getElementById('17paperCostCurrency880300030');

                        if (paper17InputGsm && paper17Input && currencySelect17) {
                            paper17InputGsm.value = !isNaN(parseFloat(gsm17)) ? parseFloat(gsm17) : '';
                            paper17Input.value = !isNaN(parseFloat(cost17)) ? parseFloat(cost17) : '';
                            currencySelect17.value = currency17 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm' '18paperCost', '18paperCostCurrency', not found.");
                        }
                    }
                    // 18GSM
                    const costDetails18 = paper880300030['18GSM'];
                    if (costDetails18) {
                        const gsm18 = costDetails18['GSM'] || 'Not Found';
                        const cost18 = costDetails18['Cost'] || 'Not Found';
                        const currency18 = costDetails18['Currency'] || 'Not Found';
                        const paper18InputGsm = document.getElementById('18gsm880300030');
                        const paper18Input = document.getElementById('18paperCost880300030');
                        const currencySelect18 = document.getElementById('18paperCostCurrency880300030');

                        if (paper18InputGsm && paper18Input && currencySelect18) {
                            paper18InputGsm.value = !isNaN(parseFloat(gsm18)) ? parseFloat(gsm18) : '';
                            paper18Input.value = !isNaN(parseFloat(cost18)) ? parseFloat(cost18) : '';
                            currencySelect18.value = currency18 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm8803000' '18paperCost8803000', '18paperCostCurrency8803000', not found.");
                        }
                    }
                    // 22GSM
                    const costDetails22 = paper880300030['22GSM'];
                    if (costDetails22) {
                        const gsm22 = costDetails22['GSM'] || 'Not Found';
                        const cost22 = costDetails22['Cost'] || 'Not Found';
                        const currency22 = costDetails22['Currency'] || 'Not Found';
                        const paper22InputGsm = document.getElementById('22gsm880300030');
                        const paper22Input = document.getElementById('22paperCost880300030');
                        const currencySelect22 = document.getElementById('22paperCostCurrency880300030');

                        if (paper22InputGsm && paper22Input && currencySelect22) {
                            paper22InputGsm.value = !isNaN(parseFloat(gsm22)) ? parseFloat(gsm22) : '';
                            paper22Input.value = !isNaN(parseFloat(cost22)) ? parseFloat(cost22) : '';
                            currencySelect22.value = currency22 || 'INR';
                        } else {
                            console.error("Element with ID '22gsm', '22paperCost', '22paperCostCurrency' not found.");
                        }
                    }
                    // 25GSM
                    const costDetails25 = paper880300030['25GSM'];
                    if (costDetails25) {
                        const gsm25 = costDetails25['GSM'] || 'Not Found';
                        const cost25 = costDetails25['Cost'] || 'Not Found';
                        const currency25 = costDetails25['Currency'] || 'Not Found';
                        const paper25InputGsm = document.getElementById('25gsm880300030');
                        const paper25Input = document.getElementById('25paperCost880300030');
                        const currencySelect25 = document.getElementById('25paperCostCurrency880300030');

                        if (paper25InputGsm && paper25Input && currencySelect25) {
                            paper25InputGsm.value = !isNaN(parseFloat(gsm25)) ? parseFloat(gsm25) : '';
                            paper25Input.value = !isNaN(parseFloat(cost25)) ? parseFloat(cost25) : '';
                            currencySelect25.value = currency25 || 'INR';
                        } else {
                            console.error("Element with ID '25gsm', '25paperCost', '25paperCostCurrency' not found.");
                        }
                    }

                    // 35GSM
                    const costDetails35 = paper880300030['35GSM'];
                    if (costDetails35) {
                        const gsm35 = costDetails35['GSM'] || 'Not Found';
                        const cost35 = costDetails35['Cost'] || 'Not Found';
                        const currency35 = costDetails35['Currency'] || 'Not Found';
                        const paper35InputGsm = document.getElementById('35gsm880300030');
                        const paper35Input = document.getElementById('35paperCost880300030');
                        const currencySelect35 = document.getElementById('35paperCostCurrency880300030');

                        if (paper35InputGsm && paper35Input && currencySelect35) {
                            paper35InputGsm.value = !isNaN(parseFloat(gsm35)) ? parseFloat(gsm35) : '';
                            paper35Input.value = !isNaN(parseFloat(cost35)) ? parseFloat(cost35) : '';
                            currencySelect35.value = currency35 || 'INR';
                        } else {
                            console.error("Element with ID '35gsm', '35paperCost', '35paperCostCurrency' not found.");
                        }
                    }

                    // 45GSM
                    const costDetails45 = paper880300030['45GSM'];
                    if (costDetails45) {
                        const gsm45 = costDetails45['GSM'] || 'Not Found';
                        const cost45 = costDetails45['Cost'] || 'Not Found';
                        const currency45 = costDetails45['Currency'] || 'Not Found';
                        const paper45InputGsm = document.getElementById('45gsm880300030');
                        const paper45Input = document.getElementById('45paperCost880300030');
                        const currencySelect45 = document.getElementById('45paperCostCurrency880300030');

                        if (paper45InputGsm && paper45Input && currencySelect45) {
                            paper45InputGsm.value = !isNaN(parseFloat(gsm45)) ? parseFloat(gsm45) : '';
                            paper45Input.value = !isNaN(parseFloat(cost45)) ? parseFloat(cost45) : '';
                            currencySelect45.value = currency45 || 'INR';
                        } else {
                            console.error("Element with ID '45gsm', '45paperCost', '45paperCostCurrency' not found.");
                        }
                    }
                }
            }
        }
    });
}
// Function to update PaperCost880/300030 in DynamoDB
function updatePaperCost880300030() {
    // Fetching values from HTML elements
    const paper17InputGsm = document.getElementById('17gsm880300030').value;
    const paper17Input = document.getElementById('17paperCost880300030').value;
    const currencySelect17 = document.getElementById('17paperCostCurrency880300030').value;

    const paper18InputGsm = document.getElementById('18gsm880300030').value;
    const paper18Input = document.getElementById('18paperCost880300030').value;
    const currencySelect18 = document.getElementById('18paperCostCurrency880300030').value;

    const paper22InputGsm = document.getElementById('22gsm880300030').value;
    const paper22Input = document.getElementById('22paperCost880300030').value;
    const currencySelect22 = document.getElementById('22paperCostCurrency880300030').value;

    const paper25InputGsm = document.getElementById('25gsm880300030').value;
    const paper25Input = document.getElementById('25paperCost880300030').value;
    const currencySelect25 = document.getElementById('25paperCostCurrency880300030').value;

    const paper35InputGsm = document.getElementById('35gsm880300030').value;
    const paper35Input = document.getElementById('35paperCost880300030').value;
    const currencySelect35 = document.getElementById('35paperCostCurrency880300030').value;

    const paper45InputGsm = document.getElementById('45gsm880300030').value;
    const paper45Input = document.getElementById('45paperCost880300030').value;
    const currencySelect45 = document.getElementById('45paperCostCurrency880300030').value;

    const params = {
        TableName: "masterDataExportCal", // Replace with your actual table name
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Include other keys if necessary
        },
        UpdateExpression: `
            set #cs.#pcs880300030.#gsm17.#cost = :cost17, 
                #cs.#pcs880300030.#gsm17.#currency = :curr17, 
                #cs.#pcs880300030.#gsm17.#gsm = :gsm17,
                #cs.#pcs880300030.#gsm18.#cost = :cost18, 
                #cs.#pcs880300030.#gsm18.#currency = :curr18, 
                #cs.#pcs880300030.#gsm18.#gsm = :gsm18,
                #cs.#pcs880300030.#gsm22.#cost = :cost22, 
                #cs.#pcs880300030.#gsm22.#currency = :curr22, 
                #cs.#pcs880300030.#gsm22.#gsm = :gsm22,
                #cs.#pcs880300030.#gsm25.#cost = :cost25, 
                #cs.#pcs880300030.#gsm25.#currency = :curr25, 
                #cs.#pcs880300030.#gsm25.#gsm = :gsm25,
                #cs.#pcs880300030.#gsm35.#cost = :cost35, 
                #cs.#pcs880300030.#gsm35.#currency = :curr35, 
                #cs.#pcs880300030.#gsm35.#gsm = :gsm35,
                #cs.#pcs880300030.#gsm45.#cost = :cost45, 
                #cs.#pcs880300030.#gsm45.#currency = :curr45, 
                #cs.#pcs880300030.#gsm45.#gsm = :gsm45
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#pcs880300030": "PaperCostSheets880300030",
            "#gsm17": "17GSM",
            "#gsm18": "18GSM",
            "#gsm22": "22GSM",
            "#gsm25": "25GSM",
            "#gsm35": "35GSM",
            "#gsm45": "45GSM",
            "#cost": "Cost",
            "#currency": "Currency",
            "#gsm": "GSM"
        },
        ExpressionAttributeValues: {
            ":cost17": parseFloat(paper17Input) || 0,
            ":curr17": currencySelect17 || 'INR',
            ":gsm17": parseFloat(paper17InputGsm) || 0,
            ":cost18": parseFloat(paper18Input) || 0,
            ":curr18": currencySelect18 || 'INR',
            ":gsm18": parseFloat(paper18InputGsm) || 0,
            ":cost22": parseFloat(paper22Input) || 0,
            ":curr22": currencySelect22 || 'INR',
            ":gsm22": parseFloat(paper22InputGsm) || 0,
            ":cost25": parseFloat(paper25Input) || 0,
            ":curr25": currencySelect25 || 'INR',
            ":gsm25": parseFloat(paper25InputGsm) || 0,
            ":cost35": parseFloat(paper35Input) || 0,
            ":curr35": currencySelect35 || 'INR',
            ":gsm35": parseFloat(paper35InputGsm) || 0,
            ":cost45": parseFloat(paper45Input) || 0,
            ":curr45": currencySelect45 || 'INR',
            ":gsm45": parseFloat(paper45InputGsm) || 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {

        }
    });
}

// Function to fetch data of paper cost 800/500050 from DynamoDB
function getPaperCost880500050() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const paperCostData = data.Item ? data.Item['CostSheets'] : null;
            if (paperCostData) {
                const paper880500050 = paperCostData['PaperCostSheets880300050'];
                if (paper880500050) {
                    // 17GSM
                    const costDetails17 = paper880500050['17GSM'];
                    if (costDetails17) {
                        const gsm17 = costDetails17['GSM'] || 'Not Found';
                        const cost17 = costDetails17['Cost'] || 'Not Found';
                        const currency17 = costDetails17['Currency'] || 'Not Found';
                        const paper17InputGsm = document.getElementById('17gsm880500050');
                        const paper17Input = document.getElementById('17paperCost880500050');
                        const currencySelect17 = document.getElementById('17paperCostCurrency880500050');

                        if (paper17InputGsm && paper17Input && currencySelect17) {
                            paper17InputGsm.value = !isNaN(parseFloat(gsm17)) ? parseFloat(gsm17) : '';
                            paper17Input.value = !isNaN(parseFloat(cost17)) ? parseFloat(cost17) : '';
                            currencySelect17.value = currency17 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm' '18paperCost', '18paperCostCurrency', not found.");
                        }
                    }
                    // 18GSM
                    const costDetails18 = paper880500050['18GSM'];
                    if (costDetails18) {
                        const gsm18 = costDetails18['GSM'] || 'Not Found';
                        const cost18 = costDetails18['Cost'] || 'Not Found';
                        const currency18 = costDetails18['Currency'] || 'Not Found';
                        const paper18InputGsm = document.getElementById('18gsm880500050');
                        const paper18Input = document.getElementById('18paperCost880500050');
                        const currencySelect18 = document.getElementById('18paperCostCurrency880500050');

                        if (paper18InputGsm && paper18Input && currencySelect18) {
                            paper18InputGsm.value = !isNaN(parseFloat(gsm18)) ? parseFloat(gsm18) : '';
                            paper18Input.value = !isNaN(parseFloat(cost18)) ? parseFloat(cost18) : '';
                            currencySelect18.value = currency18 || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID '18gsm8803000' '18paperCost8803000', '18paperCostCurrency8803000', not found.");
                        }
                    }
                    // 22GSM
                    const costDetails22 = paper880500050['22GSM'];
                    if (costDetails22) {
                        const gsm22 = costDetails22['GSM'] || 'Not Found';
                        const cost22 = costDetails22['Cost'] || 'Not Found';
                        const currency22 = costDetails22['Currency'] || 'Not Found';
                        const paper22InputGsm = document.getElementById('22gsm880500050');
                        const paper22Input = document.getElementById('22paperCost880500050');
                        const currencySelect22 = document.getElementById('22paperCostCurrency880500050');

                        if (paper22InputGsm && paper22Input && currencySelect22) {
                            paper22InputGsm.value = !isNaN(parseFloat(gsm22)) ? parseFloat(gsm22) : '';
                            paper22Input.value = !isNaN(parseFloat(cost22)) ? parseFloat(cost22) : '';
                            currencySelect22.value = currency22 || 'INR';
                        } else {
                            console.error("Element with ID '22gsm', '22paperCost', '22paperCostCurrency' not found.");
                        }
                    }
                    // 25GSM
                    const costDetails25 = paper880500050['25GSM'];
                    if (costDetails25) {
                        const gsm25 = costDetails25['GSM'] || 'Not Found';
                        const cost25 = costDetails25['Cost'] || 'Not Found';
                        const currency25 = costDetails25['Currency'] || 'Not Found';
                        const paper25InputGsm = document.getElementById('25gsm880500050');
                        const paper25Input = document.getElementById('25paperCost880500050');
                        const currencySelect25 = document.getElementById('25paperCostCurrency880500050');

                        if (paper25InputGsm && paper25Input && currencySelect25) {
                            paper25InputGsm.value = !isNaN(parseFloat(gsm25)) ? parseFloat(gsm25) : '';
                            paper25Input.value = !isNaN(parseFloat(cost25)) ? parseFloat(cost25) : '';
                            currencySelect25.value = currency25 || 'INR';
                        } else {
                            console.error("Element with ID '25gsm', '25paperCost', '25paperCostCurrency' not found.");
                        }
                    }

                    // 35GSM
                    const costDetails35 = paper880500050['35GSM'];
                    if (costDetails35) {
                        const gsm35 = costDetails35['GSM'] || 'Not Found';
                        const cost35 = costDetails35['Cost'] || 'Not Found';
                        const currency35 = costDetails35['Currency'] || 'Not Found';
                        const paper35InputGsm = document.getElementById('35gsm880500050');
                        const paper35Input = document.getElementById('35paperCost880500050');
                        const currencySelect35 = document.getElementById('35paperCostCurrency880500050');

                        if (paper35InputGsm && paper35Input && currencySelect35) {
                            paper35InputGsm.value = !isNaN(parseFloat(gsm35)) ? parseFloat(gsm35) : '';
                            paper35Input.value = !isNaN(parseFloat(cost35)) ? parseFloat(cost35) : '';
                            currencySelect35.value = currency35 || 'INR';
                        } else {
                            console.error("Element with ID '35gsm', '35paperCost', '35paperCostCurrency' not found.");
                        }
                    }

                    // 45GSM
                    const costDetails45 = paper880500050['45GSM'];
                    if (costDetails45) {
                        const gsm45 = costDetails45['GSM'] || 'Not Found';
                        const cost45 = costDetails45['Cost'] || 'Not Found';
                        const currency45 = costDetails45['Currency'] || 'Not Found';
                        const paper45InputGsm = document.getElementById('45gsm880500050');
                        const paper45Input = document.getElementById('45paperCost880500050');
                        const currencySelect45 = document.getElementById('45paperCostCurrency880500050');

                        if (paper45InputGsm && paper45Input && currencySelect45) {
                            paper45InputGsm.value = !isNaN(parseFloat(gsm45)) ? parseFloat(gsm45) : '';
                            paper45Input.value = !isNaN(parseFloat(cost45)) ? parseFloat(cost45) : '';
                            currencySelect45.value = currency45 || 'INR';
                        } else {
                            console.error("Element with ID '45gsm', '45paperCost', '45paperCostCurrency' not found.");
                        }
                    }
                }
            }
        }
    });
}
// Function to update PaperCost880/300050 in DynamoDB
function updatePaperCost880300050() {
    // Fetching values from HTML elements
    const paper17InputGsm = document.getElementById('17gsm880500050').value;
    const paper17Input = document.getElementById('17paperCost880500050').value;
    const currencySelect17 = document.getElementById('17paperCostCurrency880500050').value;

    const paper18InputGsm = document.getElementById('18gsm880500050').value;
    const paper18Input = document.getElementById('18paperCost880500050').value;
    const currencySelect18 = document.getElementById('18paperCostCurrency880500050').value;

    const paper22InputGsm = document.getElementById('22gsm880500050').value;
    const paper22Input = document.getElementById('22paperCost880500050').value;
    const currencySelect22 = document.getElementById('22paperCostCurrency880500050').value;

    const paper25InputGsm = document.getElementById('25gsm880500050').value;
    const paper25Input = document.getElementById('25paperCost880500050').value;
    const currencySelect25 = document.getElementById('25paperCostCurrency880500050').value;

    const paper35InputGsm = document.getElementById('35gsm880500050').value;
    const paper35Input = document.getElementById('35paperCost880500050').value;
    const currencySelect35 = document.getElementById('35paperCostCurrency880500050').value;

    const paper45InputGsm = document.getElementById('45gsm880500050').value;
    const paper45Input = document.getElementById('45paperCost880500050').value;
    const currencySelect45 = document.getElementById('45paperCostCurrency880500050').value;

    const params = {
        TableName: "masterDataExportCal", // Replace with your actual table name
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Include other keys if necessary
        },
        UpdateExpression: `
            set #cs.#pcs880300050.#gsm17.#cost = :cost17, 
                #cs.#pcs880300050.#gsm17.#currency = :curr17, 
                #cs.#pcs880300050.#gsm17.#gsm = :gsm17,
                #cs.#pcs880300050.#gsm18.#cost = :cost18, 
                #cs.#pcs880300050.#gsm18.#currency = :curr18, 
                #cs.#pcs880300050.#gsm18.#gsm = :gsm18,
                #cs.#pcs880300050.#gsm22.#cost = :cost22, 
                #cs.#pcs880300050.#gsm22.#currency = :curr22, 
                #cs.#pcs880300050.#gsm22.#gsm = :gsm22,
                #cs.#pcs880300050.#gsm25.#cost = :cost25, 
                #cs.#pcs880300050.#gsm25.#currency = :curr25, 
                #cs.#pcs880300050.#gsm25.#gsm = :gsm25,
                #cs.#pcs880300050.#gsm35.#cost = :cost35, 
                #cs.#pcs880300050.#gsm35.#currency = :curr35, 
                #cs.#pcs880300050.#gsm35.#gsm = :gsm35,
                #cs.#pcs880300050.#gsm45.#cost = :cost45, 
                #cs.#pcs880300050.#gsm45.#currency = :curr45, 
                #cs.#pcs880300050.#gsm45.#gsm = :gsm45
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#pcs880300050": "PaperCostSheets880300050",
            "#gsm17": "17GSM",
            "#gsm18": "18GSM",
            "#gsm22": "22GSM",
            "#gsm25": "25GSM",
            "#gsm35": "35GSM",
            "#gsm45": "45GSM",
            "#cost": "Cost",
            "#currency": "Currency",
            "#gsm": "GSM"
        },
        ExpressionAttributeValues: {
            ":cost17": parseFloat(paper17Input) || 0,
            ":curr17": currencySelect17 || 'INR',
            ":gsm17": parseFloat(paper17InputGsm) || 0,
            ":cost18": parseFloat(paper18Input) || 0,
            ":curr18": currencySelect18 || 'INR',
            ":gsm18": parseFloat(paper18InputGsm) || 0,
            ":cost22": parseFloat(paper22Input) || 0,
            ":curr22": currencySelect22 || 'INR',
            ":gsm22": parseFloat(paper22InputGsm) || 0,
            ":cost25": parseFloat(paper25Input) || 0,
            ":curr25": currencySelect25 || 'INR',
            ":gsm25": parseFloat(paper25InputGsm) || 0,
            ":cost35": parseFloat(paper35Input) || 0,
            ":curr35": currencySelect35 || 'INR',
            ":gsm35": parseFloat(paper35InputGsm) || 0,
            ":cost45": parseFloat(paper45Input) || 0,
            ":curr45": currencySelect45 || 'INR',
            ":gsm45": parseFloat(paper45InputGsm) || 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
        }
    });
}

// Function to get freight costs from DynamoDB
function getFreightData() {
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            const freightCostData = data.Item ? data.Item['CostSheets'] : null;
            if (freightCostData) {
                const freightCostDataPort = freightCostData['FreightCosts'];
                if (freightCostDataPort) {
                    // Jebel Ali
                    const freightDetailsJebelAli = freightCostDataPort['JebelAliPort'];
                    if (freightDetailsJebelAli) {
                        const JebelAliPort = freightDetailsJebelAli['Port'] || 'Not Found';
                        const JebelAliCost = freightDetailsJebelAli['Freight'] || 'Not Found';
                        const JebelAliCurrency = freightDetailsJebelAli['Currency'] || 'Not Found';
                        const JebelAliPortInput = document.getElementById('JebelAli');
                        const JebelAliCostInput = document.getElementById('JebelAliFreight');
                        const JebelAliCurrencyInput = document.getElementById('JebelAliFreightCurrency');

                        if (JebelAliPortInput && JebelAliCostInput && JebelAliCurrencyInput) {
                            JebelAliPortInput.value = JebelAliPort !== 'Not Found' ? JebelAliPort : '';
                            JebelAliCostInput.value = !isNaN(parseFloat(JebelAliCost)) ? parseFloat(JebelAliCost) : '';
                            JebelAliCurrencyInput.value = JebelAliCurrency || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID 'JebelAli' 'JebelAliFreight', 'JebelAliFreightCurrency', not found.");
                        }
                    }
                    // Sohar
                    const freightDetailsSohar = freightCostDataPort['SoharPort'];
                    if (freightDetailsSohar) {
                        const soharPort = freightDetailsSohar['Port'] || 'Not Found';
                        const soharCost = freightDetailsSohar['Freight'] || 'Not Found';
                        const soharCurrency = freightDetailsSohar['Currency'] || 'Not Found';
                        const soharPortInput = document.getElementById('sohar');
                        const soharCostInput = document.getElementById('soharFreight');
                        const soharCurrencyInput = document.getElementById('soharFreightCurrency');

                        if (soharPortInput && soharCostInput && soharCurrencyInput) {
                            soharPortInput.value = soharPort !== 'Not Found' ? soharPort : '';
                            soharCostInput.value = !isNaN(parseFloat(soharCost)) ? parseFloat(soharCost) : '';
                            soharCurrencyInput.value = soharCurrency || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID 'JebelAli' 'JebelAliFreight', 'JebelAliFreightCurrency', not found.");
                        }
                    }
                    // Dammam dammam
                    const freightDetailsDammam = freightCostDataPort['DammamPort'];
                    if (freightDetailsDammam) {
                        const dammamPort = freightDetailsDammam['Port'] || 'Not Found';
                        const dammamCost = freightDetailsDammam['Freight'] || 'Not Found';
                        const dammamCurrency = freightDetailsDammam['Currency'] || 'Not Found';
                        const dammamPortInput = document.getElementById('dammam');
                        const dammamCostInput = document.getElementById('dammamFreight');
                        const dammamCurrencyInput = document.getElementById('dammamFreightCurrency');

                        if (dammamPortInput && dammamCostInput && dammamCurrencyInput) {
                            dammamPortInput.value = dammamPort !== 'Not Found' ? dammamPort : '';
                            dammamCostInput.value = !isNaN(parseFloat(dammamCost)) ? parseFloat(dammamCost) : '';
                            dammamCurrencyInput.value = dammamCurrency || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID 'JebelAli' 'JebelAliFreight', 'JebelAliFreightCurrency', not found.");
                        }
                    }
                    // riyadh
                    const freightDetailsRiyadh = freightCostDataPort['RiyadhPort'];
                    if (freightDetailsRiyadh) {
                        const riyadhPort = freightDetailsRiyadh['Port'] || 'Not Found';
                        const riyadhCost = freightDetailsRiyadh['Freight'] || 'Not Found';
                        const riyadhCurrency = freightDetailsRiyadh['Currency'] || 'Not Found';
                        const riyadhPortInput = document.getElementById('riyadh');
                        const riyadhCostInput = document.getElementById('riyadhFreight');
                        const riyadhCurrencyInput = document.getElementById('riyadhFreightCurrency');

                        if (riyadhPortInput && riyadhCostInput && riyadhCurrencyInput) {
                            riyadhPortInput.value = riyadhPort !== 'Not Found' ? riyadhPort : '';
                            riyadhCostInput.value = !isNaN(parseFloat(riyadhCost)) ? parseFloat(riyadhCost) : '';
                            riyadhCurrencyInput.value = riyadhCurrency || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID 'JebelAli' 'JebelAliFreight', 'JebelAliFreightCurrency', not found.");
                        }
                    }
                    // shuwaikh
                    const freightDetailsShuwaikh = freightCostDataPort['ShuwaikhPort'];
                    if (freightDetailsShuwaikh) {
                        const shuwaikhPort = freightDetailsShuwaikh['Port'] || 'Not Found';
                        const shuwaikhCost = freightDetailsShuwaikh['Freight'] || 'Not Found';
                        const shuwaikhCurrency = freightDetailsShuwaikh['Currency'] || 'Not Found';
                        const shuwaikhPortInput = document.getElementById('shuwaikh');
                        const shuwaikhCostInput = document.getElementById('shuwaikhFreight');
                        const shuwaikhCurrencyInput = document.getElementById('shuwaikhFreightCurrency');

                        if (shuwaikhPortInput && shuwaikhCostInput && shuwaikhCurrencyInput) {
                            shuwaikhPortInput.value = shuwaikhPort !== 'Not Found' ? shuwaikhPort : '';
                            shuwaikhCostInput.value = !isNaN(parseFloat(shuwaikhCost)) ? parseFloat(shuwaikhCost) : '';
                            shuwaikhCurrencyInput.value = shuwaikhCurrency || 'INR'; // Default to INR if currency not found
                        } else {
                            console.error("Element with ID 'JebelAli' 'JebelAliFreight', 'JebelAliFreightCurrency', not found.");
                        }
                    }
                }
            }
        }
    });
}
// Function to update freight
function updateFreightData() {
    // Fetching values from HTML elements
    const jebelAliPort = document.getElementById('JebelAli').value || 'Not Found';
    const jebelAliCost = parseFloat(document.getElementById('JebelAliFreight').value) || 0;
    const jebelAliCurrency = document.getElementById('JebelAliFreightCurrency').value || 'INR';

    const soharPort = document.getElementById('sohar').value || 'Not Found';
    const soharCost = parseFloat(document.getElementById('soharFreight').value) || 0;
    const soharCurrency = document.getElementById('soharFreightCurrency').value || 'INR';

    const dammamPort = document.getElementById('dammam').value || 'Not Found';
    const dammamCost = parseFloat(document.getElementById('dammamFreight').value) || 0;
    const dammamCurrency = document.getElementById('dammamFreightCurrency').value || 'INR';

    const riyadhPort = document.getElementById('riyadh').value || 'Not Found';
    const riyadhCost = parseFloat(document.getElementById('riyadhFreight').value) || 0;
    const riyadhCurrency = document.getElementById('riyadhFreightCurrency').value || 'INR';

    const shuwaikhPort = document.getElementById('shuwaikh').value || 'Not Found';
    const shuwaikhCost = parseFloat(document.getElementById('shuwaikhFreight').value) || 0;
    const shuwaikhCurrency = document.getElementById('shuwaikhFreightCurrency').value || 'INR';

    const params = {
        TableName: "masterDataExportCal", // Replace with your actual table name
        Key: {
            "GSM_PaperMill_PaperCode": "184536088030005000",
            "Date": "03-09-2024" // Include other keys if necessary
        },
        UpdateExpression: `
            set #cs.#fc.JebelAliPort.Port = :jebelAliPort, 
                #cs.#fc.JebelAliPort.Freight = :jebelAliCost,
                #cs.#fc.JebelAliPort.Currency = :jebelAliCurrency,
                #cs.#fc.SoharPort.Port = :soharPort, 
                #cs.#fc.SoharPort.Freight = :soharCost,
                #cs.#fc.SoharPort.Currency = :soharCurrency,
                #cs.#fc.DammamPort.Port = :dammamPort, 
                #cs.#fc.DammamPort.Freight = :dammamCost,
                #cs.#fc.DammamPort.Currency = :dammamCurrency,
                #cs.#fc.RiyadhPort.Port = :riyadhPort, 
                #cs.#fc.RiyadhPort.Freight = :riyadhCost,
                #cs.#fc.RiyadhPort.Currency = :riyadhCurrency,
                #cs.#fc.ShuwaikhPort.Port = :shuwaikhPort, 
                #cs.#fc.ShuwaikhPort.Freight = :shuwaikhCost,
                #cs.#fc.ShuwaikhPort.Currency = :shuwaikhCurrency
        `,
        ExpressionAttributeNames: {
            "#cs": "CostSheets",
            "#fc": "FreightCosts"
        },
        ExpressionAttributeValues: {
            ":jebelAliPort": jebelAliPort,
            ":jebelAliCost": jebelAliCost.toString(),
            ":jebelAliCurrency": jebelAliCurrency,
            ":soharPort": soharPort,
            ":soharCost": soharCost.toString(),
            ":soharCurrency": soharCurrency,
            ":dammamPort": dammamPort,
            ":dammamCost": dammamCost.toString(),
            ":dammamCurrency": dammamCurrency,
            ":riyadhPort": riyadhPort,
            ":riyadhCost": riyadhCost.toString(),
            ":riyadhCurrency": riyadhCurrency,
            ":shuwaikhPort": shuwaikhPort,
            ":shuwaikhCost": shuwaikhCost.toString(),
            ":shuwaikhCurrency": shuwaikhCurrency
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            alert("Freight data updated successfully!");
        }
    });
}

// Add event listener to the save button
document.getElementById('save-button').addEventListener('click', updateFreightData);


// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the initial data
    getOtherValues();
    getPaperCost360();
    getPaperCost8803000();
    getPaperCost8805000();
    getPaperCost880300030();
    getPaperCost880500050();
    getFreightData();

    const updateButton = document.getElementById('save-button');
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            updateOtherValues();
            updatePaperCost360();
            updatePaperCost8803000();
            updatePaperCost8805000();
            updatePaperCost880300030();
            updatePaperCost880300050();
            updateFreightData();

            alert('Data saved successfully!');
        });
    }



});

