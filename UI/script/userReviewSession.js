const modalBg = document.querySelectorAll('.modal-bg');
const closeModal = document.querySelectorAll('.modal-close');
const reviewSession = document.querySelectorAll('.review-session');
const saveReview = document.querySelector('.save-review');
const updateProfile = document.querySelector('.update');
const updateSession = document.querySelectorAll('.edit-session');

const updateSessionBtnModal = document.querySelector('.update-session-btn');
const updateProfileBtnModal = document.querySelector('.update-profile-btn');
 

closeModal[0].addEventListener('click',e => {
    e.preventDefault();
    modalBg[0].style.visibility= 'hidden';
    modalBg[[0]].style.opacity = 0;
    })
    
    reviewSession.forEach(session => {
        session.addEventListener('click', e => {
            e.preventDefault();
            modalBg[0].style.visibility= 'visible';
            modalBg[0].style.opacity = 1; 
        })
    })

    saveReview.addEventListener('click', e => {
        e.preventDefault();
        modalBg[0].style.visibility= 'hidden';
        modalBg[0].style.opacity = 0; 
    })
    
    updateProfile.addEventListener('click', e => {
        e.preventDefault();
        modalBg[1].style.visibility= 'visible';
         modalBg[1].style.opacity = 1; 
    })
    closeModal[1].addEventListener('click',e => {
        e.preventDefault();
        modalBg[1].style.visibility= 'hidden';
        modalBg[1].style.opacity = 0;
        })

    updateSession.forEach(session =>{
        session.addEventListener('click', e=>{
            e.preventDefault();
            modalBg[2].style.visibility= 'visible';
            modalBg[2].style.opacity = 1;  
        })
    })

    closeModal[2].addEventListener('click',e => {
        e.preventDefault();
        modalBg[2].style.visibility= 'hidden';
        modalBg[2].style.opacity = 0;
        })

        updateProfileBtnModal.addEventListener('click',e => {
            e.preventDefault();
            modalBg[1].style.visibility= 'hidden';
            modalBg[1].style.opacity = 0;
            });

      updateSessionBtnModal.addEventListener('click',e => {
        e.preventDefault();
        modalBg[2].style.visibility= 'hidden';
        modalBg[2].style.opacity = 0;
        });