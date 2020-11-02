(function () {
  const ANIMATION_SPEED = 200;


  const _createModal = function (options) {
    const modalElement = document.createElement('div');
    modalElement.classList.add('my-modal');
    modalElement.insertAdjacentHTML('afterbegin', `
      <div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-title">Modal title</span>
            <span class="modal-close">&times;</span>
          </div>
          <div class="modal-body">
            <p>Lorem ipsum dolor sit.</p>
            <p>Lorem ipsum dolor sit.</p>
          </div>
          <div class="modal-footer">
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    `);
    return modalElement;
  };

  const _renderModel = function (modalElement) {
    document.body.appendChild(modalElement);
  };

  const modal = function (options) {
    const modalElement = _createModal(options);
    _renderModel(modalElement);
    let isClosing = false;

    return {
      open() {
        !isClosing && modalElement.classList.add('opened');
      },
      close() {
        isClosing = true;
        modalElement.classList.remove('opened');
        modalElement.classList.add('hiding')
        setTimeout(() => {
          modalElement.classList.remove('hiding');
          isClosing = false;
        }, ANIMATION_SPEED);
      },
      destroy() {},
    };
  };

  $.modal = modal;
})();
