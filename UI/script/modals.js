const modalBg = document.querySelector('.modal-bg');
const chageTomentor = document.querySelector('.change-mentor');
const closeModal = document.querySelector('.modal-close');
const saveChanges = document.querySelector('.change-role');


chageTomentor.addEventListener('click', (e)=>{
e.preventDefault();
modalBg.style.visibility= 'visible';
modalBg.style.opacity = 1;
});
closeModal.addEventListener('click',e => {
modalBg.style.visibility= 'hidden';
modalBg.style.opacity = 0;
})

saveChanges.addEventListener('click', e => {
modalBg.style.visibility= 'hidden';
modalBg.style.opacity = 0;
})

