(function () {
  const confirm = (options) => {
    return new Promise((resolve, reject) => {
      const confirmModal = $.modal({
        title: options.title,
        closable: false,
        width: '400px',
        content: options.content,
        onClose() {
          confirmModal.destroy();
        },
        footerButtons: [
          {text: 'Отмена', type: 'secondary', handler() {
            confirmModal.close();
            reject();
          }},
          {text: 'Удалить', type: 'danger', handler() {
            confirmModal.close();
            resolve();
          }},
        ],
      });
      
      setTimeout(() => {
        confirmModal.open();
      }, 100);    
    });
  };


  $.confirm = confirm;
})();
