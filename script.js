// Select the button element
const buttons = document.querySelectorAll('.button');

// Mouse over: change background color
buttons.forEach((btn) => {
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = '#04a77c';
    });

// Mouse out: revert background color
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '#06b488';
    });
});

const loginBtn = document.querySelector('.login_button');
const modal = document.getElementById('login-modal');

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

