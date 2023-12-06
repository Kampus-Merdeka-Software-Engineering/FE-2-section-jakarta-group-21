const token = localStorage.getItem('token');
// console.log(token);

if (!token) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Anda belum login!',
	});
	setTimeout(function () {
		window.location.href = 'login.html';
	}, 3000);
}

const logoutLink = document.getElementById('logout-link');
logoutLink.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        // Make API request to logout the user
        const response = await fetch('https://be-2-section-jakarta-group-21-production.up.railway.app/api/users/logout', {
            method: 'GET'
        });

        if (response.ok) {
            // Redirect to the login page or perform any other necessary actions
            window.location.href = 'index.html';
        } else {
            // Handle logout error
            console.error('Logout failed');
        }
    } catch (error) {
        console.error(error);
    }
});