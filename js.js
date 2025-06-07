// Function to send email using EmailJS
function sendMail() {
    // Collect form input values
    let parms = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Send email via EmailJS service
    emailjs.send('service_upbc2lb', 'template_it0em3b', parms)
        .then(() => {
            // Hide form and show thank-you message on success
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('thenkMessage').style.display = 'block';
        })
        .catch((error) => {
            // Show alert and log error on failure
            alert('Failed to send email: ' + JSON.stringify(error));
            console.error('EmailJS Error:', error);
        });
}

// Form and input element references
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const btn = document.querySelector('button');

// Error message display elements
const messError = document.getElementById('message-error');
const emailError = document.getElementById('email-error');
const nameError = document.getElementById('name-error');

// Audio feedback on click events
const clickSound = new Audio('click.mp3');      // Played on validation error
const clickSend = new Audio('clickSend.mp3');   // Played on successful validation

// Button click event handler
btn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    let hasError = false;

    // Email validation pattern
    const emailCar = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,4})$/;

    // Validate name field
    if (name.value === '') {
        name.style.borderBottom = '1px solid red';
        nameError.innerText = 'name required';
        hasError = true;
    } else {
        name.style.borderBottom = '1px solid green';
        nameError.innerText = '';
    }

    // Validate email field
    if (email.value === '' || !email.value.match(emailCar)) {
        email.style.borderBottom = '1px solid red';
        emailError.innerText = 'email required';
        hasError = true;
    } else {
        email.style.borderBottom = '1px solid green';
        emailError.innerText = '';
    }

    // Validate message field length
    if (message.value.length < 10) {
        message.style.borderBottom = '1px solid red';
        messError.innerText = 'Message must be at least 10 characters long.';
        hasError = true;
    } else {
        message.style.borderBottom = '1px solid green';
        messError.innerText = '';
    }

    // Play error or success sounds and proceed accordingly
    if (hasError) {
        clickSound.play(); // Play error sound
    } else {
        clickSend.play();  // Play send sound
        setTimeout(() => {
            sendMail();     // Call email sending function
            form.reset();   // Clear the form inputs
        }, 100);            // Slight delay to allow audio to finish
    }
});
