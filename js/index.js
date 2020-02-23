const jumperDiv = document.querySelector('.jumper');
const contentDiv = document.querySelector('.content');

jumperDiv.addEventListener('click', () => {
    contentDiv.scrollIntoView({
        behavior: 'smooth'
    });
});

const isMobile = () => {
    return (window.innerWidth <= 800);
}

const projects = document.querySelectorAll('.project');
const holders = document.querySelectorAll('.project-holder');

for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const holder = holders[i];

    if (isMobile()) break;

    holder.addEventListener("mousemove", (event) => {
        const rect = project.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const yRotation = (x - project.clientWidth / 2) / 75;
        const xRotation = -(y - project.clientHeight / 2) / 75;

        project.style = `transform: rotateY(${yRotation}deg) rotateX(${xRotation}deg)`;
    });

    holder.addEventListener("mouseleave", () => {
        project.style = `transition: transform 0.5s; transform: rotate(0)`;
    });
}