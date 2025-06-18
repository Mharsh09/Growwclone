const buttons = document.querySelectorAll('.button');

buttons.forEach((btn) => {
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = '#04a77c';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '#06b488';
    });
});

const getstartBtn = document.querySelector('.get-started');
const loginBtn = document.querySelector('.login_button');
const modal = document.getElementById('login-modal');

getstartBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

loginBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});

const closeBtn = document.querySelector('.close-modal');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});

const rotatingText = document.querySelector('.rotating-text');
const words = ['Stocks', 'Mutual Funds', 'Fixed Deposits'];
let index = 0;

setInterval(() => {
  rotatingText.classList.remove('fade-in');//removes
  void rotatingText.offsetWidth; // reflow
  index = (index + 1) % words.length;
  rotatingText.textContent = words[index];
  rotatingText.classList.add('fade-in');//adds
}, 3500);

const conBtn = document.getElementById('subbtn');

conBtn.addEventListener('click', () => {
  const emailInput = document.getElementById('email-field');
  const email = emailInput.value.trim();
  const emailPattern = /^[A-Za-z\._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/;
  const errorMessage = document.querySelector('.error-message');
  const line = document.querySelector('.wrap-input-2 .focus-border');

  if (!emailPattern.test(email)) {
    errorMessage.style.display = 'block';
    line.style.bottom = "15px";
  } else {
    const modalcontent = document.querySelector('.modal-rightcontent');
    const verifyPage = document.querySelector('.verifypage');
    const username =document.querySelector('.username');
    const usermail=document.querySelector('.usermail').value;

    setTimeout(() => {
      modalcontent.classList.add('fade-out');
      modalcontent.style.display = 'none';
      verifyPage.style.display = 'flex';
      verifyPage.classList.add('fade-in');
      username.textContent = `${usermail}`;
    }, 500);
  }
});
