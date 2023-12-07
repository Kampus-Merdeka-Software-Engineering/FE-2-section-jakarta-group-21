const formLogin = document.getElementById('formLogin');
formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value; '';
    try {
        const login = await fetch('https://be-2-section-jakarta-group-21-production.up.railway.app/api-public/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if (login.ok) {        
            Swal.fire({
                icon: 'success',
                title: 'Login berhasil',
                text: 'Mantap bos',
            });
            const data = await login.json();
            localStorage.setItem('token', data.data.token);
            window.location.href = 'admin.html';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login gagal;',
                text: 'Email atau password salah',
            });
        }
    } catch (error) {
        console.error(error);
    }
})

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