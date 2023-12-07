// register page
// macth password
function validate_password() {
    const password = document.getElementById('pass').value;
    const confirmPassword = document.getElementById('confirm_pass').value;
    const confirmPassElement = document.getElementById('confirm_pass');
    const confirmPassErrorElement = document.getElementById('confirm_pass_error');

    if (password !== confirmPassword) {
        confirmPassElement.classList.add('error');
        confirmPassElement.classList.remove('valid');
        confirmPassErrorElement.textContent = 'Passwords do not match';
    } else {
        confirmPassElement.classList.remove('error');
        confirmPassElement.classList.add('valid');
        confirmPassErrorElement.textContent = '';
    }
}

// show/hide password
function toggle() {
    const passwordInput = document.getElementById('pass');
    const showPassIcon = document.querySelector('.show-pass i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPassIcon.classList.remove('fa-eye');
        showPassIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        showPassIcon.classList.remove('fa-eye-slash');
        showPassIcon.classList.add('fa-eye');
    }
}

// password strength meter
function checkStrength(password) {
    let strength = 0;
    const popover = document.getElementById("popover-password");
    const lowUpperCase = document.querySelector(".low-upper-case i");
    const number = document.querySelector(".one-number i");
    const specialChar = document.querySelector(".one-special-char i");
    const eightChar = document.querySelector(".eight-character i");
    const passwordStrength = document.getElementById("password-strength");

    // If password is empty, hide the popover
    if (password === "") {
        popover.style.display = "none";
        return;
    }

    // If password contains both lower and uppercase characters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
        lowUpperCase.classList.remove('fa-circle');
        lowUpperCase.classList.add('fa-check');
    } else {
        lowUpperCase.classList.add('fa-circle');
        lowUpperCase.classList.remove('fa-check');
    }

    // If it has numbers and characters
    if (password.match(/([0-9])/)) {
        strength += 1;
        number.classList.remove('fa-circle');
        number.classList.add('fa-check');
    } else {
        number.classList.add('fa-circle');
        number.classList.remove('fa-check');
    }

    // If it has one special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
        specialChar.classList.remove('fa-circle');
        specialChar.classList.add('fa-check');
    } else {
        specialChar.classList.add('fa-circle');
        specialChar.classList.remove('fa-check');
    }

    // If password is greater than 7
    if (password.length > 7) {
        strength += 1;
        eightChar.classList.remove('fa-circle');
        eightChar.classList.add('fa-check');
    } else {
        eightChar.classList.add('fa-circle');
        eightChar.classList.remove('fa-check');
    }

    // If strength is less than 2
    if (strength < 2) {
        passwordStrength.style.width = '10%';
        passwordStrength.style.backgroundColor = 'red';
    } else if (strength == 3) {
        passwordStrength.style.width = '60%';
        passwordStrength.style.backgroundColor = 'orange';
    } else if (strength == 4) {
        passwordStrength.style.width = '100%';
        passwordStrength.style.backgroundColor = 'green';
    }

    // Show the popover
    popover.style.display = "block";
}

// input validation
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const agreeTermsInput = document.getElementById('agree_terms');

emailInput.addEventListener('input', function () {
    validateEmail(emailInput.value);
});

phoneInput.addEventListener('input', function () {
    validatePhone(phoneInput.value);
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        emailInput.classList.remove('error');
    } else {
        emailInput.classList.add('error');
    }
}

function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    if (regex.test(phone)) {
        phoneInput.classList.remove('error');
    } else {
        phoneInput.classList.add('error');
    }
}

// submit form
const form = document.getElementById('register');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('pass').value;
    const confirm_pass = document.getElementById('confirm_pass').value;
    const phone = document.getElementById('phone').value;

    fetch('https://be-2-section-jakarta-group-21-production.up.railway.app/api-public/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            no_telp: phone,
            confirm_pass: confirm_pass,
        })
    })
        .then(response => response.json())
        .then((data) => {
            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
            }).then(() => {
                window.location.href = 'login.html';
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal'
            });
        });
})
