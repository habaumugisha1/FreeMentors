const modalBg = document.querySelector('.modal-bg');
const closeModal = document.querySelector('.modal-close');
const reviewSession = document.querySelectorAll('.review-session');
const saveReview = document.querySelector('.save-review');

closeModal.addEventListener('click',e => {
    modalBg.style.visibility= 'hidden';
    modalBg.style.opacity = 0;
    })
    
    reviewSession.forEach(session => {
        session.addEventListener('click', e => {
            modalBg.style.visibility= 'visible';
            modalBg.style.opacity = 1; 
        })
    })

    saveReview.addEventListener('click', e => {
        modalBg.style.visibility= 'hidden';
        modalBg.style.opacity = 0; 
    })
    