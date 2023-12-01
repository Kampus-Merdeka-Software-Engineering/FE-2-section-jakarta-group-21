// Script Group 21
// handle the menu toggle
const checkbox = document.getElementById('check');
checkbox.addEventListener('change', function () {
    const menu = document.querySelector('.main-nav ul');
    if (this.checked) {
        menu.style.right = '0';
    } else {
        menu.style.right = '-100%';
    }
});

// toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// toggle class active untuk cart btn
const buttonCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    buttonCart.classList.toggle('active');
    e.preventDefault();
};

// remove active di luar elemen untuk seacrh dan cart
const searchbtn = document.querySelector('#search-button');
const cartbtn = document.querySelector('#shopping-cart-button');
document.addEventListener('click', function (e) {
    if (!searchbtn.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

    if (!cartbtn.contains(e.target) && !buttonCart.contains(e.target)) {
        buttonCart.classList.remove('active');
    }
});

// our team
let imgBox = document.querySelectorAll('.imgBox');
let contentBox = document.querySelectorAll('.contentBox');

for (let i = 0; i < imgBox.length; i++) {
    imgBox[i].addEventListener('mouseover', function () {
        for (let i = 0; i < contentBox.length; i++) {
            contentBox[i].className = 'contentBox';
        }
        document.getElementById(this.dataset.id).className = 'contentBox active';

        for (let i = 0; i < imgBox.length; i++) {
            imgBox[i].className = 'imgBox';
        }
        this.className = 'imgBox active';
    })
}

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

// ****** API ******
const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    menuList: '${baseUrl}/api-public/menu'
};

async function getMenuData() {
    try {
        const response = await fetch(apiRoutes.menuList);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
    
};

const menuCategories = {
    "Popular Dishes": ".popular",
    "New Menu": ".new",
    "Other Menu": ".other",
    "Exciting Drinks": ".drink"
};

const menuContainer = document.querySelector('.menu-container');

(async function() {
    try {
        const menuData = await getMenuData();

        for (const menuItem of menuData) {
            const category = menuItem.category;
            const categoryClass = menuCategories[category];
            const menuElement = document.querySelector(`.${categoryClass}`);

            let menuElementContent;

            if (category === 'New Menu') {
                console.log();
                menuElementContent = `
                    <div class="row">
                        <img src="${menuItem.image}" />
                        <h3>${menuItem.name}</h3>
                        <p>${menuItem.description}</p>
                        <div class="in-text">
                            <div class="price">
                                <h6>Rp ${menuItem.price}</h6>
                            </div>
                            <div class="btn-order">
                                <a href="#">Order</a>
                            </div>
                        </div>
                        <div class="top-icon">
                            <h5>NEW</h5>
                        </div>
                    </div>
                `;
            } else {
                menuElementContent = `
                    <div class="row">
                        <img src="${menuItem.image}" />
                        <h3>${menuItem.name}</h3>
                        <p>${menuItem.description}</p>
                        <div class="in-text">
                            <div class="price">
                                <h6>Rp ${menuItem.price}</h6>
                            </div>
                            <div class="btn-order">
                                <a href="#">Order</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        
            menuElement.innerHTML += menuElementContent;
        }
    } catch (error) {
        console.error();
    }
})();