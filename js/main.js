document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('order-dialog');
  const openModalHeroBtn = document.getElementById('open-modal-hero');
  const closeModalBtn = document.getElementById('close-order-dialog');
  const orderButtons = document.querySelectorAll('.product-card__button');
  const modalForm = document.getElementById('order-form');
  const productInput = document.getElementById('order-product');
  const modalFormStatus = document.getElementById('form-status');

  const openModal = (productName = '') => {
    if (!modal) return;
    if (productInput) {
      productInput.value = productName;
    }
    if (modalFormStatus) {
      modalFormStatus.textContent = '';
      modalFormStatus.className = 'form-status';
    }
    modal.showModal();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.close();
  };

  if (openModalHeroBtn) {
    openModalHeroBtn.addEventListener('click', () => openModal('Консультация'));
  }

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product') || 'Товар';
      openModal(productName);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  const setupFormValidation = (formElement, statusElement, isModal = false) => {
    if (!formElement) return;

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = formElement.querySelector('input[name="name"]');
      const emailInput = formElement.querySelector('input[name="email"]');
      const phoneInput = formElement.querySelector('input[name="phone"]');
      const agreeInput = formElement.querySelector('input[name="agreement"]') || formElement.querySelector('input[name="agree"]');

      let isValid = true;
      let errorMessage = '';

      if (!nameInput || !nameInput.value.trim()) {
        isValid = false;
        errorMessage = 'Пожалуйста, введите ваше имя.';
      } else if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
        isValid = false;
        errorMessage = 'Пожалуйста, введите корректный e-mail.';
      } else if (!phoneInput || !phoneInput.value.trim()) {
        isValid = false;
        errorMessage = 'Пожалуйста, введите номер телефона.';
      } else if (agreeInput && !agreeInput.checked) {
        isValid = false;
        errorMessage = 'Необходимо согласие на обработку персональных данных.';
      }

      if (!isValid) {
        if (statusElement) {
          statusElement.textContent = errorMessage;
          statusElement.className = 'form-status form-status--error';
        }
        return;
      }

      if (statusElement) {
        statusElement.textContent = 'Спасибо! Ваша заявка успешно принята.';
        statusElement.className = 'form-status form-status--success';
      }
      formElement.reset();

      if (isModal) {
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    });
  };

  setupFormValidation(modalForm, modalFormStatus, true);

  const pageOrderForm = document.getElementById('page-order-form');
  const pageFormStatus = document.getElementById('page-form-status');
  setupFormValidation(pageOrderForm, pageFormStatus, false);
});