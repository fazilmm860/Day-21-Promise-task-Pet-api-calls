const reload = document.getElementById('reloadButton').addEventListener('click', function () {
    location.reload();
})
function fetchData(apiUrl) {
    return fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    });
}

function fetchDogData() {
    const apiUrl = 'https://api.thedogapi.com/v1/images/search';
    return fetchData(apiUrl);
}

function fetchCatData() {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search';
    return fetchData(apiUrl);
}

function fetchFoxData() {
    const apiUrl = 'https://randomfox.ca/floof/';
    return fetchData(apiUrl);
}

function displayData(data, containerId) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const itemInfo = document.createElement('div');
        itemInfo.innerHTML = `
    <h2>${item.name}</h2>
    <img src="${item.image}" alt="${item.name}" height="100">
        <hr>
            `;
        container.appendChild(itemInfo);
    });
}

Promise.all([fetchDogData(), fetchCatData(), fetchFoxData()])
    .then(([dogData, catData, foxData]) => {
        const dogs = dogData.map(dog => ({
            name: 'Dog',
            image: dog.url
        }));

        const cats = catData.map(cat => ({
            name: 'Cat',
            image: cat.url
        }));

        const foxes = [{
            name: 'Fox',
            image: foxData.image
        }];

        displayData(dogs, 'dogInfo');
        displayData(cats, 'catInfo');
        displayData(foxes, 'foxInfo');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
