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
            setTimeout(function () {
                window.location.href = 'admin.html';
            }, 3000);
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