const tabLinks = document.querySelectorAll(".tabs a");
const pannels = document.querySelectorAll(".pannel");

tabLinks.forEach(link =>{
link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(".tabs li.active").classList.remove("active");
    document.querySelector(".pannel.active").classList.remove("active");
    const parentEl = link.parentElement;
    parentEl.classList.add("active");

    const index = [...parentEl.parentElement.children].indexOf(parentEl);
    const pannel = [...pannels].filter(el =>el.getAttribute('data-index') == index);
    pannel[0].classList.add("active");

})
});