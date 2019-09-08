const navigationsLink = document.querySelectorAll(".navs a");
const activeLink = document.querySelector(".navs li.active");

navigationsLink.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        if(activeLink !== null) {
            activeLink.classList.remove('active');
            link.parentElement.classList.add('active');
        } 
    })
})