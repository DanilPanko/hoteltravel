document.addEventListener('DOMContentLoaded', function() {
  // Проверка наличия элемента reviewsContainer перед выполнением кода для отзывов
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (reviewsContainer) {
    // Функция для загрузки отзывов из localStorage
    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
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

      // Добавить обработчики событий для кнопок удаления
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          deleteReview(index);
        });
      });
    }

    // Функция для удаления отзыва
    function deleteReview(index) {
      let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.splice(index, 1);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      loadReviews();
    }

    // Загрузить отзывы при загрузке страницы
    loadReviews();

    // Добавить новый отзыв и сохранить его в localStorage
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получить текст отзыва из формы
        const reviewText = document.getElementById('reviewText').value;

        // Создать новый элемент для отзыва
        const newReview = document.createElement('div');
        newReview.classList.add('client__card');
        newReview.innerHTML = `
          <img src="assets/default-client.jpg" alt="client" />
          <p>${reviewText}</p>
          <button class="delete-btn">Видалити</button>
        `;

        // Добавить новый отзыв в контейнер отзывов
        reviewsContainer.appendChild(newReview);

        // Сохранить отзыв в localStorage
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(reviewText);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Обновить обработчики событий
        loadReviews();

        // Очистить форму
        reviewForm.reset();
      });
    }
  }

  // Добавляем функционал для выбора и отображения отелей
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
      hotelsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых отелей
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