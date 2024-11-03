document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;

    // Fetch branch data
    fetch('data/branches.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'text/xml');
            const branches = xml.getElementsByTagName('branch');
            const branchInfoDiv = document.getElementById('branch-info');

            let branchesHTML = '';

            for (let branch of branches) {
                const address = branch.getElementsByTagName('address')[0].textContent;
                const contact = branch.getElementsByTagName('contact')[0].textContent;
                const hours = branch.getElementsByTagName('hours')[0].textContent;
                const mapUrl = branch.getElementsByTagName('mapUrl')[0].textContent;

                branchesHTML += `
                    <div class="branch-container">
                        <div class="branch-details">
                            <h3>${address}</h3>
                            <p>Contact: ${contact}</p>
                            <p>Opening Hours: ${hours}</p>
                        </div>
                        <div class="map-container">
                            <iframe 
                                src="${mapUrl}" 
                                width="50%" 
                                height="300" 
                                style="border:0;" 
                                allowfullscreen="" 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                `;
            }

            branchInfoDiv.innerHTML = branchesHTML;
        });

    // Fetch menu data
    fetch('data/menu.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'text/xml');
            const meals = xml.getElementsByTagName('meal');
            const beverages = xml.getElementsByTagName('beverage');
            const menuContainer = document.getElementById('menu-container');

            let menuHTML = '<h2>Meals</h2><div class="menu-container">';

            // Create meal cards
            for (let meal of meals) {
                const name = meal.getElementsByTagName('name')[0].textContent;
                const price = meal.getElementsByTagName('price')[0].textContent;
                const description = meal.getElementsByTagName('description')[0].textContent;
                const imageUrl = meal.getElementsByTagName('image')[0].textContent;

                menuHTML += `
                    <div class="meal-card">
                        <img src="${imageUrl}" alt="${name}">
                        <h3>${name}</h3>
                        <p>Price: ${price}</p>
                        <p>${description}</p>
                    </div>
                `;
            }

            menuHTML += '</div>'; // Closing meal container

            // Create beverage tables
            

            // Coffee and Hot Chocolates
            menuHTML += '<h2>Coffee and Chocolate</h2>';
            menuHTML += '<div class="table-container"><table><thead><tr><th>Size</th><th>Price</th><th>Description</th></tr></thead><tbody>';
            for (let beverage of beverages) {
                if (beverage.getElementsByTagName('type')[0].textContent === 'coffee') {
                    const size = beverage.getElementsByTagName('size')[0].textContent;
                    const price = beverage.getElementsByTagName('price')[0].textContent;
                    const description = beverage.getElementsByTagName('description')[0].textContent;

                    menuHTML += `
                        <tr>
                            <td>${size}</td>
                            <td>${price}</td>
                            <td>${description}</td>
                        </tr>
                    `;
                }
            }
            menuHTML += '</tbody></table></div>'; // Closing coffee table

            // Other Beverages
            menuHTML += '<h2>Other Beverages</h2>';
            menuHTML += '<div class="table-container"><table><thead><tr><th>Name</th><th>Price</th></tr></thead><tbody>';
            for (let beverage of beverages) {
                if (beverage.getElementsByTagName('type')[0].textContent === 'other') {
                    const name = beverage.getElementsByTagName('name')[0].textContent;
                    const price = beverage.getElementsByTagName('price')[0].textContent;

                    menuHTML += `
                        <tr>
                            <td>${name}</td>
                            <td>${price}</td>
                        </tr>
                    `;
                }
            }
            menuHTML += '</tbody></table></div>'; // Closing other beverages table

            menuContainer.innerHTML = menuHTML;
        });
});

function submitForm() {
    alert("Your message has been sent!");
    return false; // Prevent actual form submission
}
