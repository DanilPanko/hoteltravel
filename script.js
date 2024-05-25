document.addEventListener('DOMContentLoaded', function() {
  const reviewsContainer = document.getElementById('reviewsContainer');
  const JSONBIN_URL = 'https://api.jsonbin.io/b/66522aede41b4d34e4f94999';
  const JSONBIN_SECRET = '$2a$10$4.3RbxEVu9P9KRB0nS7KKO6oX6BO14OvSqDa3ijzUgiDTVe..VWla'; // Замените на ваш секретный ключ

  async function fetchReviews() {
    try {
      const response = await fetch(JSONBIN_URL, {
        headers: {
          'secret-key': JSONBIN_SECRET
        }
      });
      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
      return [];
    }
  }

  async function saveReviews(reviews) {
    try {
      await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': JSONBIN_SECRET,
          'versioning': 'false'
        },
        body: JSON.stringify({ reviews })
      });
    } catch (error) {
      console.error('Ошибка при сохранении отзывов:', error);
    }
  }

  async function loadReviews() {
    const reviews = await fetchReviews();
    reviewsContainer.innerHTML = '';
    reviews.forEach((reviewText, index) => {
      const newReview = document.createElement('div');
      newReview.classList.add('client__card');
      newReview.innerHTML = `
        <img src="assets/default-client.jpg" alt="client" />
        <p>${reviewText}</p>
        <button class="delete-btn" data-index="${index}">Видалити</button>
      `;
      reviewsContainer.appendChild(newReview);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async function() {
        const index = this.getAttribute('data-index');
        const reviews = await fetchReviews();
        reviews.splice(index, 1);
        await saveReviews(reviews);
        loadReviews();
      });
    });
  }

  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const reviewText = document.getElementById('reviewText').value;
      const reviews = await fetchReviews();
      reviews.push(reviewText);
      await saveReviews(reviews);
      loadReviews();
      reviewForm.reset();
    });
  }

  loadReviews();

  const hotelsData = {
    odesa: [
      { name: 'Ultramarinn Hotel', price: 'UAH 980', image: 'assets/odesa1.jpg', description: 'Genoese, Одеса' },
      { name: 'Continental Hotel', price: 'UAH 4500', image: 'assets/odesa2.jpg', description: 'Deribasovskaya Str.5, Одеса' },
      { name: 'M1 Club Hotel', price: 'UAH 8000', image: 'assets/odesa3.jpg', description: 'Lidersovskiy boulevard 1, Одеса' }
    ],
    lviv: [
      { name: 'Готель Швейцарський', price: 'UAH 3300', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Центр Львова, Львів' },
      { name: 'Grand Hotel Lviv', price: 'UAH 5500', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Площа Ринок, Львів' }
    ],
    kyiv: [
      { name: 'Premier Palace Hotel', price: 'UAH 7700', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Шевченківський, Київ' },
      { name: 'Hilton Kyiv', price: 'UAH 9000', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Печерський, Київ' }
    ],
    kharkiv: [
      { name: 'Hotel Misto SPA & FITNESS', price: 'UAH 3000', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Дзержинський, Харків' },
      { name: 'Kharkiv Palace', price: 'UAH 7000', image: 'https://via.placeholder.com/300x200', description: 'Готель у районі Київський, Харків' }
    ]
  };

  function loadHotels(city) {
    const hotelsContainer = document.getElementById('hotelsContainer');
    if (hotelsContainer) {
      hotelsContainer.innerHTML = '';
      hotelsData[city].forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.classList.add('popular__card');
        hotelCard.innerHTML = `
          <img src="${hotel.image}" alt="${hotel.name}" />
          <div class="popular__content">
            <div class="popular__card__header">
              <h4>${hotel.name}</h4>
              <h4>${hotel.price}</h4>
            </div>
            <p>${hotel.description}</p>
          </div>
        `;
        hotelsContainer.appendChild(hotelCard);
      });
    }
  }

  const citySelect = document.getElementById('citySelect');
  const selectButton = document.querySelector('.form__group button');

  if (selectButton && citySelect) {
    selectButton.addEventListener('click', function() {
      const selectedCity = citySelect.value;
      if (selectedCity) {
        loadHotels(selectedCity);
      } else {
        alert('Будь ласка, оберіть місто.');
      }
    });
  }
});