function sendMail() {
    let parms = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    emailjs.send('service_upbc2lb', 'template_it0em3b', parms)
        .then(() => {
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('thenkMessage').style.display = 'block';
        })
        .catch((error) => {
            alert('Failed to send email: ' + JSON.stringify(error));
            console.error('EmailJS Error:', error);
        });

}

const form = document.getElementById('form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const btn = document.querySelector('button')
const messError = document.getElementById('message-error')
const emailError = document.getElementById('email-error')
const nameError = document.getElementById('name-error')

const clickSound = new Audio('click.mp3')
const clickSend = new Audio('clickSend.mp3')
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let hasError = false;
    const emailCar = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,4})$/;
    // 
    if (name.value === '') {
        name.style.borderBottom = '1px solid red';
        nameError.innerText = 'name required';
        hasError = true;
    } else {
        name.style.borderBottom = '1px solid green';
        nameError.innerText = '';
    }
    // 
    if (email.value === '' || !email.value.match(emailCar)) {
        email.style.borderBottom = '1px solid red';
        emailError.innerText = 'email required';
        hasError = true;
    } else {
        email.style.borderBottom = '1px solid green';
        emailError.innerText = '';
    }

    // 
    if (message.value.length < 10) {
        message.style.borderBottom = '1px solid red';
        messError.innerText = 'Message must be at least 10 characters long.';
        hasError = true;
    } else {
        message.style.borderBottom = '1px solid green';
        messError.innerText = '';
    }
    //
    if (hasError) {
        clickSound.play();
    } else {
        clickSend.play();
        setTimeout(() => {
            sendMail();
            form.reset(); // Optionally clear the form
        }, 200);
    }

});