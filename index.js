(function () {
  let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'img/apple.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'img/orange.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'img/mango.jpg'},
  ];

  const toHTML = (fruit) => (`
    <div class="col">
      <div class="card">
        <img src="${fruit.img}" height="350px" class="card-img-top" alt="${fruit.title}">
        <div class="card-body">
          <h5 class="card-title">${fruit.title}</h5>
          <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
          <a href="#" class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">Удалить</a>
        </div>
      </div>
    </div>
  `);

  const renderCards = () => {
    document.querySelector('#fruits').innerHTML = fruits.map(toHTML).join('');
  };

  const priceModal = $.modal({
    title: 'Цена на продукт',
    closable: true,
    width: '400px',
    footerButtons: [
      {text: 'Закрыть', type: 'primary', handler() {
        priceModal.close();
      }},
    ],
    onOpen() {
      console.log("I'm open!");
    },
    beforeClose() {
      console.log("I'm about to close!");
    },
    onClose() {
      console.log("I'm closed!");
    },
  });

  renderCards();

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    const btnType = evt.target.dataset.btn;
    const id = Number(evt.target.dataset.id);
    const fruit = fruits.find(f => f.id === id);

    if (btnType === 'price') {
      priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price} рублей</strong></p>
      `);
      priceModal.open();
    }

    if (btnType === 'delete') {
      $.confirm({
        title: 'Вы уверены?',
        content: `<p>Вы хотите удалить: <strong>${fruit.title}</strong></p>`
      }).then(
        () => {
          fruits = fruits.filter(f => f.id !== id);
          renderCards();
        },
        () => {}
      );
    }
  });
})();
