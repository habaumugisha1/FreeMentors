const modalBg = document.querySelectorAll('.modal-bg');
const closeModal = document.querySelectorAll('.modal-close');
const sessionReview = document.querySelectorAll('.session-review');
const deleteBtn = document.querySelectorAll('.delete-btn');
const updateProfile = document.querySelector('.update');
const updateProfileBtModal = document.querySelector('.update-profile-btn');


sessionReview.forEach(session =>{
    session.addEventListener('click', e =>{
        e.preventDefault();
        modalBg[0].style.visibility= 'visible';
        modalBg[0].style.opacity = 1; 
    })
})

closeModal[0].addEventListener('click',e => {
    e.preventDefault();
    modalBg[0].style.visibility= 'hidden';
    modalBg[0].style.opacity = 0;
    })
    
deleteBtn.forEach(btn =>{
    btn.addEventListener('click', e =>{
        e.preventDefault();
        modalBg[0].style.visibility= 'hidden';
        modalBg[0].style.opacity = 0; 
    })
})

    updateProfile.addEventListener('click', e => {
        e.preventDefault();
        modalBg[1].style.visibility= 'visible';
         modalBg[1].style.opacity = 1; 
    })

    updateProfileBtModal.addEventListener('click',e => {
        e.preventDefault();
        modalBg[1].style.visibility= 'hidden';
        modalBg[1].style.opacity = 0;
        });
 closeModal[1].addEventListener('click',e => {
    e.preventDefault();
            modalBg[1].style.visibility= 'hidden';
            modalBg[1].style.opacity = 0;
            })