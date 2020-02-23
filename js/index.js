const jumperDiv = document.querySelector('.jumper');
const contentDiv = document.querySelector('.content');

jumperDiv.addEventListener('click', () => {
    contentDiv.scrollIntoView({
        behavior: 'smooth'
    });
});