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
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Redirect to the login page or perform any other necessary actions
            window.location.href = 'index.html';
        } else {
            // Handle logout error
            console.log('Logout failed');
        }
    } catch (error) {
        console.log(error);
    }
});

let inactivityTimeout;
function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(logoutUser, 5 * 60 * 1000); // 5 menit
}

function logoutUser() {
    console.log('Pengguna telah keluar karena tidak ada aktivitas.');
    fetch('https://be-2-section-jakarta-group-21-production.up.railway.app/api/users/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                // Redirect to the login page or perform any other necessary actions
                window.location.href = 'index.html';
            } else {
                // Handle logout error
                console.log('Logout failed');
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Event listener untuk mengatur waktu ulang timeout saat ada aktivitas pengguna
document.addEventListener('mousemove', resetInactivityTimeout);
document.addEventListener('keypress', resetInactivityTimeout);

// Panggil fungsi resetInactivityTimeout saat aplikasi dimulai atau pengguna login
resetInactivityTimeout();