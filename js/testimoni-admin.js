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
					<td class="testimonial-delete"><button onclick="deleteTestimonial(${id})">Delete</button></td>
				`;
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

// Function to fetch testimonials
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
            await fetchTestimonials();
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
            const response = await fetch(`https://be-2-section-jakarta-group-21-production.up.railway.app/api/testimoni/${testimonialId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the testimonial from the UI and fetch updated testimonials
                const testimonialElement = document.getElementById(`testimonial-${testimonialId}`);
                testimonialElement.remove();
                await fetchTestimonials();

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