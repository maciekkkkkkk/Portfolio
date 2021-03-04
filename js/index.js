const generateCheckpoints = () => {
    const timeline = document.querySelector('.timeline');
    const sections = document.querySelectorAll('section');

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        const checkpointWrapper = document.createElement('div');
        checkpointWrapper.classList.add('checkpoint__wrapper');
        checkpointWrapper.style.marginTop = `${section.offsetTop - (sections[i-1] ? sections[i-1].offsetTop : 0) - 15}px`;

        const checkpoint = document.createElement('li');
        checkpoint.classList.add('checkpoint__wrapper__point');

        const card = document.createElement('div');
        card.classList.add('checkpoint__wrapper__card');

        const title = document.createElement('div');
        title.classList.add('checkpoint__wrapper__card__title');
        title.innerText = section.dataset['title'];

        if (i !== 0) {
            const jumper = document.createElement('div');
            // Calculate halfway offset between sections
            // I have no idea how it works but it works
            jumper.style.top = `${section.offsetTop - (sections[i-1] ? sections[i-1].offsetTop : 0) - 15 - (section.offsetTop - sections[i - 1].offsetTop) / 2}px`;
            jumper.classList.add('jumper', 'fa', 'fa-chevron-down');

            jumper.addEventListener('click', () => {
                window.scroll({
                    top: section.offsetTop,
                    behavior: 'smooth'
                })
            })

            timeline.appendChild(jumper);
        }

        checkpointWrapper.appendChild(checkpoint);
        card.appendChild(title);
        checkpointWrapper.appendChild(card);
        timeline.appendChild(checkpointWrapper);
    }
}

const updateCheckpointsCards = () => {
    const checkpoints = document.querySelectorAll('.checkpoint__wrapper');

    for (const checkpoint of checkpoints) {
        const card = checkpoint.querySelector('.checkpoint__wrapper__card');

        if (isElementInViewport(checkpoint)) {
            card.classList.add('checkpoint__wrapper__card--visible');
        } else {
            card.classList.remove('checkpoint__wrapper__card--visible');
        }
    }
}

window.addEventListener('load', () => {
    generateCheckpoints();
    updateCheckpointsCards();
});

window.addEventListener('scroll', updateCheckpointsCards);

/** https://stackoverflow.com/a/125106 */
const isElementInViewport = (el) => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}

