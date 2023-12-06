const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    menuList: `${baseUrl}/api-public/menu`
};

async function getMenuData() {
    try {
        const response = await fetch(apiRoutes.menuList);
        const responseData = await response.json();
        const menuData = responseData.data;

        const menuCategories = {
            // dataset : class html
            "Popular Dishes": "popular",
            "New Menu": "new",
            "Other Menu": "other",
            "Exciting Drinks": "drink"
        };

        console.log(menuData);

        if (Array.isArray(menuData)) {
            menuData.forEach((menuItem) => {
                const { image, name, description, price, category } = menuItem;
                const categoryClass = menuCategories[category] || "other";
                const menuContainer = document.querySelector(`.menu-container.${categoryClass}`);

                let menuElementContent = '';

                if (categoryClass === 'new') {
                    menuElementContent = `
                        <div class="row">
                            <img src="${image}" />
                            <h3>${name}</h3>
                            <p>${description}</p>
                            <div class="in-text">
                                <div class="price">
                                    <h6>Rp ${price}</h6>
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
                            <img src="${image}" />
                            <h3>${name}</h3>
                            <p>${description}</p>
                            <div class="in-text">
                                <div class="price">
                                    <h6>Rp ${price}</h6>
                                </div>
                                <div class="btn-order">
                                    <a href="#">Order</a>
                                </div>
                            </div>
                        </div>
                    `;
                }

                menuContainer.innerHTML += menuElementContent;
            });
        } else {
            console.error("Menu data is not in the expected structure.");
        }
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', getMenuData);