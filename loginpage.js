// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // Example validation: replace this with real validation logic.
//     if (email === 'neeraj.kumar@knam.in' && password === 'Knam@1234') {
//         window.location.href = 'cost calculator test.html'; // Redirect to the Cost Calculator Dashboard page.
//     } else {
//         document.getElementById('error-message').style.display = 'block';
//     }
// });

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Array of valid credentials
    const validCredentials = [
        { email: 'neeraj.kumar@knam.in', password: 'Knam@1234' },
        { email: 'gagan@knam.in', password: 'Knam@1234' },
        { email: 'harish@knam.in', password: 'Knam@1234' },
        // Add more credentials as needed
    ];

    // Check if the entered credentials match any in the array
    const isValid = validCredentials.some(cred => cred.email === email && cred.password === password);

    if (isValid) {
        window.location.href = 'Knam-Export-cost-calculator.html'; // Redirect to the Cost Calculator Dashboard page.
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
});

