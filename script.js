

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