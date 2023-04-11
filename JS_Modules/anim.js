const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    }
    else {
        entry.target.classList.remove('show');
    }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
const hiddenElements2 = document.querySelectorAll('.hidden2');
const fadeElements = document.querySelectorAll('.fade');

hiddenElements.forEach((el) => Observer.observe(el));
hiddenElements2.forEach((el) => Observer.observe(el));
fadeElements.forEach((el) => Observer.observe(el));