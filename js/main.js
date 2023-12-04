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