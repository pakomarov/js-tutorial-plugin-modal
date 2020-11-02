const fruits = [
  {id: 1, title: 'Яблоки', price: 20,},
  {id: 2, title: 'Апельсины', price: 30,},
  {id: 3, title: 'Манго', price: 40,},
]

const myModal = $.modal({
  title: 'My Modal',
  closable: true,
  content: `
    <h4>Modal is working</h4>
    <p>Lorem ipsum dolor sit.</p>
  `,
  width: '400px',
  footerButtons: [
    {text: 'Ok', type: 'primary', handler() {
      console.log('Primary btn was clicked');
      myModal.close();
    }},
    {text: 'Cancel', type: 'danger', handler() {
      console.log('Cancel btn was clicked');
      myModel.close();
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
