// Attach save button event listener
document.getElementById('save-button').addEventListener('click', function () {
    saveValues();
});

// Function to save the values to localStorage
function saveValues() {
    const data = {
        exchangeRate: document.getElementById('exchangeRate').value,

        // Paper cost sheet 360
        '18gsm': {
            value: document.getElementById('18gsm').value,
            paperCost: document.getElementById('18paperCost').value,
            currency: document.getElementById('18paperCostCurrency').value
        },
        '22gsm': {
            value: document.getElementById('22gsm').value,
            paperCost: document.getElementById('22paperCost').value,
            currency: document.getElementById('22paperCostCurrency').value
        },
        '25gsm': {
            value: document.getElementById('25gsm').value,
            paperCost: document.getElementById('25paperCost').value,
            currency: document.getElementById('25paperCostCurrency').value
        },
        '35gsm': {
            value: document.getElementById('35gsm').value,
            paperCost: document.getElementById('35paperCost').value,
            currency: document.getElementById('35paperCostCurrency').value
        },
        '45gsm': {
            value: document.getElementById('45gsm').value,
            paperCost: document.getElementById('45paperCost').value,
            currency: document.getElementById('45paperCostCurrency').value
        },

        // Paper cost sheet 880 / 3000
        '17gsm8803000': {
            value: document.getElementById('17gsm8803000').value,
            paperCost: document.getElementById('17paperCost8803000').value,
            currency: document.getElementById('17paperCostCurrency8803000').value
        },
        '18gsm8803000': {
            value: document.getElementById('18gsm8803000').value,
            paperCost: document.getElementById('18paperCost8803000').value,
            currency: document.getElementById('18paperCostCurrency8803000').value
        },
        '22gsm8803000': {
            value: document.getElementById('22gsm8803000').value,
            paperCost: document.getElementById('22paperCost8803000').value,
            currency: document.getElementById('22paperCostCurrency8803000').value
        },
        '25gsm8803000': {
            value: document.getElementById('25gsm8803000').value,
            paperCost: document.getElementById('25paperCost8803000').value,
            currency: document.getElementById('25paperCostCurrency8803000').value
        },
        '35gsm8803000': {
            value: document.getElementById('35gsm8803000').value,
            paperCost: document.getElementById('35paperCost8803000').value,
            currency: document.getElementById('35paperCostCurrency8803000').value
        },
        '45gsm8803000': {
            value: document.getElementById('45gsm8803000').value,
            paperCost: document.getElementById('45paperCost8803000').value,
            currency: document.getElementById('45paperCostCurrency8803000').value
        },

        // Paper cost sheet 880 / 5000
        '17gsm8805000': {
            value: document.getElementById('17gsm8805000').value,
            paperCost: document.getElementById('17paperCost8805000').value,
            currency: document.getElementById('17paperCostCurrency8805000').value
        },
        '18gsm8805000': {
            value: document.getElementById('18gsm8805000').value,
            paperCost: document.getElementById('18paperCost8805000').value,
            currency: document.getElementById('18paperCostCurrency8805000').value
        },
        '22gsm8805000': {
            value: document.getElementById('22gsm8805000').value,
            paperCost: document.getElementById('22paperCost8805000').value,
            currency: document.getElementById('22paperCostCurrency8805000').value
        },
        '25gsm8805000': {
            value: document.getElementById('25gsm8805000').value,
            paperCost: document.getElementById('25paperCost8805000').value,
            currency: document.getElementById('25paperCostCurrency8805000').value
        },
        '35gsm8805000': {
            value: document.getElementById('35gsm8805000').value,
            paperCost: document.getElementById('35paperCost8805000').value,
            currency: document.getElementById('35paperCostCurrency8805000').value
        },
        '45gsm8805000': {
            value: document.getElementById('45gsm8805000').value,
            paperCost: document.getElementById('45paperCost8805000').value,
            currency: document.getElementById('45paperCostCurrency8805000').value
        },

        // <!-- Paper Cost Sheets 880 / 3000 witout sheet cost -->

        '17gsm880300030': {
            value: document.getElementById('17gsm880300030').value,
            paperCost: document.getElementById('17paperCost880300030').value,
            currency: document.getElementById('17paperCostCurrency880300030').value
        },

        '18gsm880300030': {
            value: document.getElementById('18gsm880300030').value,
            paperCost: document.getElementById('18paperCost880300030').value,
            currency: document.getElementById('18paperCostCurrency880300030').value
        },

        '22gsm880300030': {
            value: document.getElementById('22gsm880300030').value,
            paperCost: document.getElementById('22paperCost880300030').value,
            currency: document.getElementById('22paperCostCurrency880300030').value
        },

        '25gsm880300030': {
            value: document.getElementById('25gsm880300030').value,
            paperCost: document.getElementById('25paperCost880300030').value,
            currency: document.getElementById('25paperCostCurrency880300030').value
        },

        '35gsm880300030': {
            value: document.getElementById('35gsm880300030').value,
            paperCost: document.getElementById('35paperCost880300030').value,
            currency: document.getElementById('35paperCostCurrency880300030').value
        },

        '45gsm880300030': {
            value: document.getElementById('45gsm880300030').value,
            paperCost: document.getElementById('45paperCost880300030').value,
            currency: document.getElementById('45paperCostCurrency880300030').value
        },

        // <!-- Paper Cost Sheets 880 / 5000 witout sheet cost -->

        '17gsm880500050': {
            value: document.getElementById('17gsm880500050').value,
            paperCost: document.getElementById('17paperCost880500050').value,
            currency: document.getElementById('17paperCostCurrency880500050').value
        },

        '18gsm880500050': {
            value: document.getElementById('18gsm880500050').value,
            paperCost: document.getElementById('18paperCost880500050').value,
            currency: document.getElementById('18paperCostCurrency880500050').value
        },

        '22gsm880500050': {
            value: document.getElementById('22gsm880500050').value,
            paperCost: document.getElementById('22paperCost880500050').value,
            currency: document.getElementById('22paperCostCurrency880500050').value
        },

        '25gsm880500050': {
            value: document.getElementById('25gsm880500050').value,
            paperCost: document.getElementById('25paperCost880500050').value,
            currency: document.getElementById('25paperCostCurrency880500050').value
        },

        '35gsm880500050': {
            value: document.getElementById('35gsm880500050').value,
            paperCost: document.getElementById('35paperCost880500050').value,
            currency: document.getElementById('35paperCostCurrency880500050').value
        },

        '45gsm880500050': {
            value: document.getElementById('45gsm880500050').value,
            paperCost: document.getElementById('45paperCost880500050').value,
            currency: document.getElementById('45paperCostCurrency880500050').value
        },


        // Freight Costs
        JebelAli: {
            value: document.getElementById('JebelAli').value,
            freightCost: document.getElementById('JebelAliFreight').value,
            currency: document.getElementById('JebelAliFreightCurrency').value
        },
        sohar: {
            value: document.getElementById('sohar').value,
            freightCost: document.getElementById('soharFreight').value,
            currency: document.getElementById('soharFreightCurrency').value
        },
        dammam: {
            value: document.getElementById('dammam').value,
            freightCost: document.getElementById('dammamFreight').value,
            currency: document.getElementById('dammamFreightCurrency').value
        },
        riyadh: {
            value: document.getElementById('riyadh').value,
            freightCost: document.getElementById('riyadhFreight').value,
            currency: document.getElementById('riyadhFreightCurrency').value
        },
        shuwaikh: {
            value: document.getElementById('shuwaikh').value,
            freightCost: document.getElementById('shuwaikhFreight').value,
            currency: document.getElementById('shuwaikhFreightCurrency').value
        },

        // Miscellaneous
        sheetingCost: document.getElementById('sheetingCost').value,
        boxPrice: document.getElementById('boxPrice').value,
        wrappersPrice: document.getElementById('wrappersPrice').value,
        localFreight: document.getElementById('localFreight').value,
        miscellaneous: document.getElementById('miscellaneous').value,
        margin: document.getElementById('margin').value,
    };

    // Save to localStorage
    localStorage.setItem('paperCostSheet', JSON.stringify(data));
    alert('Data saved successfully!');
}

// Function to load the values from localStorage
function loadValues() {
    const data = JSON.parse(localStorage.getItem('paperCostSheet'));

    if (data) {
        document.getElementById('exchangeRate').value = data.exchangeRate || '';

        // Load values for paper cost sheet 360
        document.getElementById('18gsm').value = data['18gsm'].value || '';
        document.getElementById('18paperCost').value = data['18gsm'].paperCost || '';
        document.getElementById('18paperCostCurrency').value = data['18gsm'].currency || '';

        document.getElementById('22gsm').value = data['22gsm'].value || '';
        document.getElementById('22paperCost').value = data['22gsm'].paperCost || '';
        document.getElementById('22paperCostCurrency').value = data['22gsm'].currency || '';

        document.getElementById('25gsm').value = data['25gsm'].value || '';
        document.getElementById('25paperCost').value = data['25gsm'].paperCost || '';
        document.getElementById('25paperCostCurrency').value = data['25gsm'].currency || '';

        document.getElementById('35gsm').value = data['35gsm'].value || '';
        document.getElementById('35paperCost').value = data['35gsm'].paperCost || '';
        document.getElementById('35paperCostCurrency').value = data['35gsm'].currency || '';

        document.getElementById('45gsm').value = data['45gsm'].value || '';
        document.getElementById('45paperCost').value = data['45gsm'].paperCost || '';
        document.getElementById('45paperCostCurrency').value = data['45gsm'].currency || '';

        // Load values for paper cost sheet 880 / 3000
        document.getElementById('17gsm8803000').value = data['17gsm8803000'].value || '';
        document.getElementById('17paperCost8803000').value = data['17gsm8803000'].paperCost || '';
        document.getElementById('17paperCostCurrency8803000').value = data['17gsm8803000'].currency || '';

        document.getElementById('18gsm8803000').value = data['18gsm8803000'].value || '';
        document.getElementById('18paperCost8803000').value = data['18gsm8803000'].paperCost || '';
        document.getElementById('18paperCostCurrency8803000').value = data['18gsm8803000'].currency || '';

        document.getElementById('22gsm8803000').value = data['22gsm8803000'].value || '';
        document.getElementById('22paperCost8803000').value = data['22gsm8803000'].paperCost || '';
        document.getElementById('22paperCostCurrency8803000').value = data['22gsm8803000'].currency || '';

        document.getElementById('25gsm8803000').value = data['25gsm8803000'].value || '';
        document.getElementById('25paperCost8803000').value = data['25gsm8803000'].paperCost || '';
        document.getElementById('25paperCostCurrency8803000').value = data['25gsm8803000'].currency || '';

        document.getElementById('35gsm8803000').value = data['35gsm8803000'].value || '';
        document.getElementById('35paperCost8803000').value = data['35gsm8803000'].paperCost || '';
        document.getElementById('35paperCostCurrency8803000').value = data['35gsm8803000'].currency || '';

        document.getElementById('45gsm8803000').value = data['45gsm8803000'].value || '';
        document.getElementById('45paperCost8803000').value = data['45gsm8803000'].paperCost || '';
        document.getElementById('45paperCostCurrency8803000').value = data['45gsm8803000'].currency || '';

        // Load values for paper cost sheet 880 / 5000
        document.getElementById('17gsm8805000').value = data['17gsm8805000'].value || '';
        document.getElementById('17paperCost8805000').value = data['17gsm8805000'].paperCost || '';
        document.getElementById('17paperCostCurrency8805000').value = data['17gsm8805000'].currency || '';

        document.getElementById('18gsm8805000').value = data['18gsm8805000'].value || '';
        document.getElementById('18paperCost8805000').value = data['18gsm8805000'].paperCost || '';
        document.getElementById('18paperCostCurrency8805000').value = data['18gsm8805000'].currency || '';

        document.getElementById('22gsm8805000').value = data['22gsm8805000'].value || '';
        document.getElementById('22paperCost8805000').value = data['22gsm8805000'].paperCost || '';
        document.getElementById('22paperCostCurrency8805000').value = data['22gsm8805000'].currency || '';

        document.getElementById('25gsm8805000').value = data['25gsm8805000'].value || '';
        document.getElementById('25paperCost8805000').value = data['25gsm8805000'].paperCost || '';
        document.getElementById('25paperCostCurrency8805000').value = data['25gsm8805000'].currency || '';

        document.getElementById('35gsm8805000').value = data['35gsm8805000'].value || '';
        document.getElementById('35paperCost8805000').value = data['35gsm8805000'].paperCost || '';
        document.getElementById('35paperCostCurrency8805000').value = data['35gsm8805000'].currency || '';

        document.getElementById('45gsm8805000').value = data['45gsm8805000'].value || '';
        document.getElementById('45paperCost8805000').value = data['45gsm8805000'].paperCost || '';
        document.getElementById('45paperCostCurrency8805000').value = data['45gsm8805000'].currency || '';

        // <!-- Paper Cost Sheets 880 / 3000 witout sheet cost -->

        document.getElementById('17gsm880300030').value = data['17gsm880300030'].value || '';
        document.getElementById('17paperCost880300030').value = data['17gsm880300030'].paperCost || '';
        document.getElementById('17paperCostCurrency880300030').value = data['17gsm880300030'].currency || '';

        document.getElementById('18gsm880300030').value = data['18gsm880300030'].value || '';
        document.getElementById('18paperCost880300030').value = data['18gsm880300030'].paperCost || '';
        document.getElementById('18paperCostCurrency880300030').value = data['18gsm880300030'].currency || '';

        document.getElementById('22gsm880300030').value = data['22gsm880300030'].value || '';
        document.getElementById('22paperCost880300030').value = data['22gsm880300030'].paperCost || '';
        document.getElementById('22paperCostCurrency880300030').value = data['22gsm880300030'].currency || '';

        document.getElementById('25gsm880300030').value = data['25gsm880300030'].value || '';
        document.getElementById('25paperCost880300030').value = data['25gsm880300030'].paperCost || '';
        document.getElementById('25paperCostCurrency880300030').value = data['25gsm880300030'].currency || '';

        document.getElementById('35gsm880300030').value = data['35gsm880300030'].value || '';
        document.getElementById('35paperCost880300030').value = data['35gsm880300030'].paperCost || '';
        document.getElementById('35paperCostCurrency880300030').value = data['35gsm880300030'].currency || '';

        document.getElementById('45gsm880300030').value = data['45gsm880300030'].value || '';
        document.getElementById('45paperCost880300030').value = data['45gsm880300030'].paperCost || '';
        document.getElementById('45paperCostCurrency880300030').value = data['45gsm880300030'].currency || '';

        // <!-- Paper Cost Sheets 880 / 5000 witout sheet cost -->

        document.getElementById('17gsm880500050').value = data['17gsm880500050'].value || '';
        document.getElementById('17paperCost880500050').value = data['17gsm880500050'].paperCost || '';
        document.getElementById('17paperCostCurrency880500050').value = data['17gsm880500050'].currency || '';

        document.getElementById('18gsm880500050').value = data['18gsm880500050'].value || '';
        document.getElementById('18paperCost880500050').value = data['18gsm880500050'].paperCost || '';
        document.getElementById('18paperCostCurrency880500050').value = data['18gsm880500050'].currency || '';

        document.getElementById('22gsm880500050').value = data['22gsm880500050'].value || '';
        document.getElementById('22paperCost880500050').value = data['22gsm880500050'].paperCost || '';
        document.getElementById('22paperCostCurrency880500050').value = data['22gsm880500050'].currency || '';

        document.getElementById('25gsm880500050').value = data['25gsm880500050'].value || '';
        document.getElementById('25paperCost880500050').value = data['25gsm880500050'].paperCost || '';
        document.getElementById('25paperCostCurrency880500050').value = data['25gsm880500050'].currency || '';

        document.getElementById('35gsm880500050').value = data['35gsm880500050'].value || '';
        document.getElementById('35paperCost880500050').value = data['35gsm880500050'].paperCost || '';
        document.getElementById('35paperCostCurrency880500050').value = data['35gsm880500050'].currency || '';

        document.getElementById('45gsm880500050').value = data['45gsm880500050'].value || '';
        document.getElementById('45paperCost880500050').value = data['45gsm880500050'].paperCost || '';
        document.getElementById('45paperCostCurrency880500050').value = data['45gsm880500050'].currency || '';

        // Load Freight Costs
        document.getElementById('JebelAli').value = data.JebelAli.value || '';
        document.getElementById('JebelAliFreight').value = data.JebelAli.freightCost || '';
        document.getElementById('JebelAliFreightCurrency').value = data.JebelAli.currency || '';

        document.getElementById('sohar').value = data.sohar.value || '';
        document.getElementById('soharFreight').value = data.sohar.freightCost || '';
        document.getElementById('soharFreightCurrency').value = data.sohar.currency || '';

        document.getElementById('dammam').value = data.dammam.value || '';
        document.getElementById('dammamFreight').value = data.dammam.freightCost || '';
        document.getElementById('dammamFreightCurrency').value = data.dammam.currency || '';

        document.getElementById('riyadh').value = data.riyadh.value || '';
        document.getElementById('riyadhFreight').value = data.riyadh.freightCost || '';
        document.getElementById('riyadhFreightCurrency').value = data.riyadh.currency || '';

        document.getElementById('shuwaikh').value = data.shuwaikh.value || '';
        document.getElementById('shuwaikhFreight').value = data.shuwaikh.freightCost || '';
        document.getElementById('shuwaikhFreightCurrency').value = data.shuwaikh.currency || '';

        // Load miscellaneous values
        document.getElementById('sheetingCost').value = data.sheetingCost || '';
        document.getElementById('boxPrice').value = data.boxPrice || '';
        document.getElementById('wrappersPrice').value = data.wrappersPrice || '';
        document.getElementById('localFreight').value = data.localFreight || '';
        document.getElementById('miscellaneous').value = data.miscellaneous || '';
        document.getElementById('margin').value = data.margin || '';
    }
}

// Load values on page load
window.onload = loadValues;

