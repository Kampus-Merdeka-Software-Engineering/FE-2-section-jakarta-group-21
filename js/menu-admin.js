const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    menuList: `${baseUrl}/api/menu`,
};

async function getMenuData() {
    try {
        const response = await fetch(apiRoutes.menuList, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        const menuData = responseData.data;
        console.log(menuData);

        if (Array.isArray(menuData)) {
            menuData.forEach((menuItem) => {
                const { id, image, name, price, category, description, stok } = menuItem;
                const menuContainer = document.querySelector('.testimoni-container');
                const menuRow = document.createElement('tr');
                menuRow.classList.add('menu-row');
                menuRow.innerHTML = `
					<td class="menu-image"><img src="${image}" alt="Menu Image"></td>
					<td class="menu-name">${name}</td>
					<td class="menu-price">${price}</td>
					<td class="menu-category">${category}</td>
					<td class="menu-category">${stok}</td>
					<td class="menu-description">${description}</td>
					<td class="menu-delete"><button onclick="deleteMenu(${id})">Delete</button></td>
				`;
                menuContainer.appendChild(menuRow);
            });
        } else {
            console.error("Menu data is not in the expected structure.");
        }
    } catch (error) {
        console.error(error);
    }
}
window.addEventListener('DOMContentLoaded', getMenuData);

async function fetchTestimonials() {
    try {
        const response = await fetch(apiRoutes.testimonials);
        if (response.ok) {
            const testimonials = await response.json();
            // Process the fetched testimonials
            // Update the UI or perform any necessary actions
            console.log(testimonials);
        } else {
            throw new Error('Unable to fetch testimonials');
        }
    } catch (error) {
        console.log(error);
    }
}

// Handle form submission
async function submitMenu(event) {
    event.preventDefault();

    const name = document.getElementById('name-input').value;
    const imageInput = document.getElementById('image-input');
    const price = document.getElementById('price-input').value;
    const category = document.getElementById('category-input').value;
    const stok = document.getElementById('stok-input').value;
    const description = document.getElementById('message-input').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageInput.files[0]);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stok', stok);
    formData.append('description', description);

    try {
        // Make API request to create a new menu item
        const response = await fetch(apiRoutes.menuList, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            body: formData
        });

        if (response.ok) {
            // Clear form inputs and fetch updated testimonials
            document.getElementById('name-input').value = '';
            document.getElementById('price-input').value = '';
            document.getElementById('category-input').value = '';
            document.getElementById('image-input').value = '';
            document.getElementById('stok-input').value = '';
            document.getElementById('message-input').value = '';
            await fetchTestimonials();
        }
    } catch (error) {
        console.log(error);
    }
}

const menuForm = document.getElementById('menu-form');
menuForm.addEventListener('submit', submitMenu);

// Delete
async function deleteMenu(menuId) {
    try {
        // Display SweetAlert confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this menu.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            // Make API request to delete the menu
            const response = await fetch(`https://be-2-section-jakarta-group-21-production.up.railway.app/api/menu/${menuId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the testimonial from the UI and fetch updated menu
                const testimonialElement = document.getElementById(`testimonial-${menuId}`);
                testimonialElement.remove();
                await fetchTestimonials();

                // Display success message with SweetAlert
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'The menu has been successfully deleted.',
                    icon: 'success'
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}