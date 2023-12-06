
const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    testimoniList: `${baseUrl}/api-public/testimoni`
};

async function getTestimoniData() {
    try {
        const response = await fetch(apiRoutes.testimoniList);
        const responseData = await response.json();

        const testimoniData = responseData.data;

        console.log(testimoniData);

        if (Array.isArray(testimoniData)) {
            testimoniData.forEach((testimoniItem) => {
                const { name, description, image, rating } = testimoniItem;
                const swiperContainer = document.querySelector('.swiper.mySwiper2');
                const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

                let stars = '';

                if (rating === "lima") {
                    stars = `
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                    `;
                } else if (rating === "empat") {
                    stars = `
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                    `;
                } else if (rating === "tiga") {
                    stars = `
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                    `;
                } else if (rating === "dua") {
                    stars = `
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                    `;
                } else if (rating === "satu") {
                    stars = `
                        <a href="#"><i class="fa-solid fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                    `;
                } else {
                    stars = `
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                        <a href="#"><i class="fa-regular fa-star"></i></a>
                    `;
                }

                let swiperSlideContent = `
                    <div class="swiper-slide">
                        <div class="box">
                            <div class="in-box">
                                <div class="bx-img">
                                    <img src="${image}" />
                                </div>
                                <div class="bx-text">
                                    <h4>${name}</h4>
                                    <p>${description}</p>
                                </div>
                                <div class="bx-rate">
                                    ${stars}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.insertAdjacentHTML('beforeend', swiperSlideContent);
            });
        } else {
            console.error("Testimoni data is not in the expected structure.");
        }
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', getTestimoniData);