const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    menuList: `${baseUrl}/api-public/menu`
};

async function getMenuData() {
    try {
        const response = await fetch(apiRoutes.menuList);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
    
};

const menuCategories = {
    // dataset : class html
    "Popular Dishes": "popular",
    "New Menu": "new",
    "Other Menu": "other",
    "Exciting Drinks": "drink"
};

const menuContainer = document.querySelector('.menu-container');

(async function() {
    try {
        const menuData = await getMenuData();
        const menuItems = menuData.map((menuItem) => ({
            ...menuItem,
            categoryClass: menuCategories[menuItem.category]
        }));

        for (const menuItem of menuData) {
            const categoryClass = menuItem.category;
            const menuElement = document.querySelector(`.${categoryClass}`);

            let menuElementContent;

            if (category === 'new') {
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