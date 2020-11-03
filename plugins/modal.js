(function () {
  const ANIMATION_SPEED = 200;
  const WINDOW_DEFAULT_WIDTH = '600px';

  const noop = () => {};

  const _createModalFooter = (buttons = []) => {
    if (buttons.length === 0) {
      return document.createElement('div');
    }

    const containerElement = document.createElement('div');
    containerElement.classList.add('modal-footer');

    buttons.forEach(btn => {
      const btnElement = document.createElement('button');
      btnElement.textContent = btn.text;
      btnElement.classList.add('btn');
      btnElement.classList.add(`btn-${btn.type || 'secondary'}`);
      btnElement.onclick = btn.handler || noop;

      containerElement.appendChild(btnElement);
    });

    return containerElement;
  };

  const _createModal = (options) => {
    const modalElement = document.createElement('div');
    modalElement.classList.add('my-modal');
    modalElement.insertAdjacentHTML('afterbegin', `
      <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width || WINDOW_DEFAULT_WIDTH}">
          <div class="modal-header">
            <span class="modal-title">${options.title || 'Окно'}</span>
            ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
          </div>
          <div class="modal-body" data-content>
            ${options.content || ''}
          </div>
        </div>
      </div>
    `);

    const footerElement = _createModalFooter(options.footerButtons);
    modalElement.querySelector('.modal-body').after(footerElement);
    return modalElement;
  };

  const _renderModal = (modalElement) => {
    document.body.appendChild(modalElement);
  };

  const modal = (options) => {
    const modalElement = _createModal(options);
    _renderModal(modalElement);
    let isClosing = false;
    let isDestroyed = false;

    const modal = {
      open() {
        if (isDestroyed) {
          console.log('Modal is destroyed');
          return;
        }

        !isClosing && modalElement.classList.add('opened');

        if (typeof options.onOpen === "function") {
          options.onOpen();
        }
      },
      close() {
        if (isDestroyed) {
          console.log('Modal is destroyed');
          return;
        }

        if (typeof options.beforeClose === "function") {
          options.beforeClose();
        }

        isClosing = true;
        modalElement.classList.remove('opened');
        modalElement.classList.add('hiding')
        setTimeout(() => {
          modalElement.classList.remove('hiding');
          isClosing = false;
          if (typeof options.onClose === "function") {
            options.onClose();
          }
        }, ANIMATION_SPEED);
      },
      destroy() {
        if (isDestroyed) {
          console.log('Modal is destroyed');
          return;
        }

        modalElement.parentNode.removeChild(modalElement);
        modalElement.removeEventListener('clicl', modalClickHandler);
        isDestroyed = true;
      },
      setContent(html) {
        modalElement.querySelector('[data-content]').innerHTML = html;
      }
    };

    const modalClickHandler = (evt) => {
      if (evt.target.dataset.close) {
        modal.close();
      }
    };

    modalElement.addEventListener('click', modalClickHandler);

    return modal;
  };

  $.modal = modal;
})();
