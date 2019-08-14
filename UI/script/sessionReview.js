const modalBg = document.querySelector('.modal-bg');
const closeModal = document.querySelector('.modal-close');
const sessionReview = document.querySelectorAll('.session-review');
const deleteBtn = document.querySelector('.delete-btn');


sessionReview.forEach(session =>{
    session.addEventListener('click', e =>{
        modalBg.style.visibility= 'visible';
        modalBg.style.opacity = 1; 
    })
})

closeModal.addEventListener('click',e => {
    modalBg.style.visibility= 'hidden';
    modalBg.style.opacity = 0;
    })
    
deleteBtn.addEventListener('click',e => {
    modalBg.style.visibility= 'hidden';
    modalBg.style.opacity = 0;
    })
