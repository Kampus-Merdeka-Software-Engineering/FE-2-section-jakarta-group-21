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
                const menuContainer = document.querySelector('.menu-container');
                const menuRow = document.createElement('tr');
                menuRow.classList.add('menu-row');
                menuRow.innerHTML = `
                    <td class="menu-image"><img src="${image}" alt="Menu Image"></td>
                    <td class="menu-name">${name}</td>
                    <td class="menu-price">${price}</td>
                    <td class="menu-category">${category}</td>
                    <td class="menu-category">${stok}</td>
                    <td class="menu-description">${description}</td>
                    <td class="menu-action">
                        <button id="update-button" onclick="updateMenu(${id})"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="deleteMenu(${id})"><i class="fa-solid fa-trash"></i></button>
                    </td>
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
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            // Clear form inputs and fetch updated menus
            document.getElementById('name-input').value = '';
            document.getElementById('price-input').value = '';
            document.getElementById('category-input').value = '';
            document.getElementById('image-input').value = '';
            document.getElementById('stok-input').value = '';
            document.getElementById('message-input').value = '';
            // Clear existing menu items
            const menuRows = document.querySelectorAll('.menu-row');
            menuRows.forEach((menuRow) => {
                menuRow.innerHTML = '';
            });
            await getMenuData();
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
            const response = await fetch(`${apiRoutes.menuList}/${menuId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const menuRows = document.querySelectorAll('.menu-row');
                menuRows.forEach((menuRow) => {
                    menuRow.innerHTML = '';
                });
                await getMenuData();

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

// Update
async function updateMenu(menuId) {
    // Show the pop-up form
    const updateFormPopup = document.getElementById('update-form-popup');
    updateFormPopup.style.display = 'block';
    // console.log(`${apiRoutes.menuList}/${menuId}`);

    // Fetch the menu item data
    const menuResponse = await fetch(`${apiRoutes.menuList}/${menuId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const menuData = await menuResponse.json();
    const { name, price, category, description, stok } = menuData.data;
    console.log(menuData.data);

    // Set the form inputs with the retrieved menu data
    document.getElementById('update-name-input').value = name;
    document.getElementById('update-price-input').value = price;
    document.getElementById('update-category-input').value = category;
    document.getElementById('update-stok-input').value = stok;
    document.getElementById('update-message-input').value = description;

    // Handle form submission for menu update
    const updateMenuForm = document.getElementById('update-menu-form');
    updateMenuForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedName = document.getElementById('update-name-input').value;
        const updatedImage = document.getElementById('update-image-input').files[0];
        const updatedPrice = document.getElementById('update-price-input').value;
        const updatedCategory = document.getElementById('update-category-input').value;
        const updatedStok = document.getElementById('update-stok-input').value;
        const updatedDescription = document.getElementById('update-message-input').value;

        const updatedFormData = new FormData();
        updatedFormData.append('name', updatedName);
        updatedFormData.append('price', updatedPrice);
        updatedFormData.append('category', updatedCategory);
        updatedFormData.append('stok', updatedStok);
        updatedFormData.append('description', updatedDescription);
        if (updatedImage) {
            updatedFormData.append('image', updatedImage);
        }

        try {
            // Make API request to update the menu item
            const response = await fetch(`${apiRoutes.menuList}/${menuId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: updatedFormData
            });

            if (response.ok) {
                // Hide the update form popup
                updateFormPopup.style.display = 'none';
                // Clear form inputs and fetch 0updated menus
                document.getElementById('update-name-input').value = '';
                document.getElementById('update-image-input').value = '';
                document.getElementById('update-price-input').value = '';
                document.getElementById('update-category-input').value = '';
                document.getElementById('update-stok-input').value = '';
                document.getElementById('update-message-input').value = '';
                const menuRows = document.querySelectorAll('.menu-row');
                menuRows.forEach((menuRow) => {
                    menuRow.innerHTML = '';
                });
                await getMenuData();
            }
        } catch (error) {
            console.log(error);
        }
    });
}

document.getElementById('cancel-button').addEventListener('click', () => {
    const updateFormPopup = document.getElementById('update-form-popup');
    updateFormPopup.style.display = 'none';
    document.getElementById('update-menu-form').reset();
});