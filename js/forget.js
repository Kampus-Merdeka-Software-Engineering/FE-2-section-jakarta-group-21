const loginForm = document.querySelector('.form-container');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Display SweetAlert alert for the feature not yet developed
    Swal.fire({
        title: 'Feature Not Developed',
        text: 'This feature is not yet developed.',
        icon: 'warning',
        confirmButtonText: 'OK'
    });

    // Prevent form submission and keep the page as it is
    return false;
});