import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LS_KEY = 'feedback-form-state';

const dataForm = JSON.parse(localStorage.getItem(LS_KEY)) ?? {};
const { email, message } = form.elements;

if (dataForm) {
  email.value = dataForm.email || '';
  message.value = dataForm.message || '';
}

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput() {
  dataForm.email = email.value;
  dataForm.message = message.value;
  localStorage.setItem(LS_KEY, JSON.stringify(dataForm));
}

function onSubmit(event) {
  event.preventDefault();

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  console.log(dataForm);
  localStorage.removeItem(LS_KEY);
  event.currentTarget.reset();
}
