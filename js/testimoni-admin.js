const baseUrl = "https://be-2-section-jakarta-group-21-production.up.railway.app";
const apiRoutes = {
    testimoniList: `${baseUrl}/api/testimoni`,
};

async function getTestimoniData() {
    try {
        const response = await fetch(apiRoutes.testimoniList, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        const testimoniData = responseData.data;
        console.log(testimoniData);

        if (Array.isArray(testimoniData)) {
            testimoniData.forEach((testimoniItem) => {
                const { id, name, description, image, rating } = testimoniItem;
                const testimoniContainer = document.querySelector('.testimoni-container');
                const testimonialRow = document.createElement('tr');
                testimonialRow.classList.add('testimonial-row');
                testimonialRow.innerHTML = `
					<td class="testimonial-image"><img src="${image}" alt="Testimonial Image"></td>
					<td class="testimonial-name">${name}</td>
					<td class="testimonial-rating">${rating}</td>
					<td class="testimonial-description">${description}</td>
					<td class="testimoni-action">
                        <button onclick="deleteTestimonial(${id})"><i class="fa-solid fa-trash"></i></button>
                    </td>
				`;
                // ditambahkan jika fungsi get by id telah berjalan
                // <button id="update-button" onclick="updateTestimonial(${id})"><i class="fa-solid fa-pen"></i></button>
                testimoniContainer.appendChild(testimonialRow);
            });
        } else {
            console.error("Testimoni data is not in the expected structure.");
        }
    } catch (error) {
        console.error(error);
    }
}
window.addEventListener('DOMContentLoaded', getTestimoniData);

// Handle form submission
async function submitTestimonial(event) {
    event.preventDefault();

    const name = document.getElementById('name-input').value;
    const imageInput = document.getElementById('image-input');
    const rating = document.getElementById('rate-input').value;
    const description = document.getElementById('message-input').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageInput.files[0]);
    formData.append('rating', rating);
    formData.append('description', description);

    try {
        // Make API request to create a new testimonial
        const response = await fetch(apiRoutes.testimoniList, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            // Clear form inputs and fetch updated testimonials
            document.getElementById('name-input').value = '';
            document.getElementById('rate-input').value = '';
            document.getElementById('image-input').value = '';
            document.getElementById('message-input').value = '';
            const testimonialRows = document.querySelectorAll('.testimonial-row');
            testimonialRows.forEach((testimonialRows) => {
                testimonialRows.innerHTML = '';
            });
            await getTestimoniData();
        }
    } catch (error) {
        console.log(error);
    }
}

const testimonialForm = document.getElementById('testimonial-form');
testimonialForm.addEventListener('submit', submitTestimonial);

// Delete
async function deleteTestimonial(testimonialId) {
    try {
        // Display SweetAlert confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this testimonial.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            // Make API request to delete the testimonial
            const response = await fetch(`${apiRoutes.testimoniList}/${testimonialId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the testimonial from the UI and fetch updated testimonials
                const testimonialRows = document.querySelectorAll('.testimonial-row');
                testimonialRows.forEach((testimonialRows) => {
                    testimonialRows.innerHTML = '';
                });
                await getTestimoniData();

                // Display success message with SweetAlert
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'The testimonial has been successfully deleted.',
                    icon: 'success'
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// Update untuk get testimoni by id
// async function updateTestimonial(testimonialId) {
//     // Show the pop-up form
//     const updateFormPopup = document.getElementById('update-form-popup');
//     updateFormPopup.style.display = 'block';

//     try {
//         // Fetch the testimonial data
//         const response = await fetch(`${apiRoutes.testimoniList}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             const testimonialData = await response.json();
//             const testimonialToUpdate = testimonialData.find(testimonial => testimonial.id === testimonialId);

//             if (testimonialToUpdate) {
//                 const { name, description, rating } = testimonialToUpdate;

//                 // Set the form inputs with the retrieved testimonial data
//                 document.getElementById('update-name-input').value = name;
//                 document.getElementById('update-rate-input').value = rating;
//                 document.getElementById('update-message-input').value = description;
//             } else {
//                 // Handle error if testimonial is not found
//                 console.log('Testimonial not found');
//             }
//         } else {
//             // Handle error if testimonial data retrieval fails
//             console.log('Failed to fetch testimonial data');
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     // Handle form submission for testimonial update
//     const updateMenuForm = document.getElementById('update-testimonial-form');
//     updateMenuForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const updatedName = document.getElementById('update-name-input').value;
//         const updatedImage = document.getElementById('update-image-input').files[0];
//         const updatedRate = document.getElementById('update-rate-input').value;
//         const updatedDescription = document.getElementById('update-message-input').value;

//         const updatedFormData = new FormData();
//         updatedFormData.append('name', updatedName);
//         updatedFormData.append('rate', updatedRate);
//         updatedFormData.append('description', updatedDescription);
//         if (updatedImage) {
//             updatedFormData.append('image', updatedImage);
//         }

//         try {
//             // Make API request to update the testimonial
//             const response = await fetch(`${apiRoutes.testimoniList}/${testimonialId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: updatedFormData
//             });

//             if (response.ok) {
//                 // Hide the update form popup
//                 updateFormPopup.style.display = 'none';
//                 // Clear form inputs and fetch updated testimonials
//                 document.getElementById('update-name-input').value = '';
//                 document.getElementById('update-image-input').value = '';
//                 document.getElementById('update-rate-input').value = '';
//                 document.getElementById('update-message-input').value = '';
//                 const testimonialRows = document.querySelectorAll('.testimonial-row');
//                 testimonialRows.forEach((testimonialRow) => {
//                     testimonialRow.innerHTML = '';
//                 });
//                 await getTestimoniData();
//             } else {
//                 // Handle error if testimonial update fails
//                 console.log('Failed to update testimonial');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     });
// }

// Handle cancel button click
// document.getElementById('cancel-button').addEventListener('click', () => {
//     const updateFormPopup = document.getElementById('update-form-popup');
//     updateFormPopup.style.display = 'none';
//     document.getElementById('update-testimonial-form').reset();
// });