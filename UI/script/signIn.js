const inputRadio = document.querySelectorAll('.radio');
const logiBtn = document.querySelector('.login-btn');
const signInHref = document.querySelector('.sig-in-link');
let userRole;

inputRadio.forEach(radio => {
    radio.addEventListener('click', e => {
        userRole = e.target.value;
    if(userRole === 'admin'){
    signInHref.href ='./pages/adminDashboard.html'
    }
    if(userRole === 'mentor'){
    signInHref.href ='./pages/mentorDashboard.html' 
    }
    if(userRole === 'user'){
        signInHref.href ='./pages/userDashboard.html' 
        }
    })
})


