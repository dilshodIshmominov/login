const emailSignUp = document.querySelector('.email-signup');
const emailLogin = document.querySelector('.email-login');
const signupBoxLink = document.querySelector('#signup-box-link');
const loginBoxLink = document.querySelector('#login-box-link');
const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.getElementById("sign-up-email")
const signUpPassword = document.getElementById("sign-up-password")
const signInEmail = document.getElementById("sign-in-email")
const signInPassword = document.getElementById("sign-in-password")
const signInBtn = document.getElementById("sign-in-btn")
const signUpBtn = document.getElementById("sign-up-btn")
const eyeClose = document.querySelectorAll('.eye-slash');

eyeClose.forEach((item) => {
    item.addEventListener('click', function() {
        if(signUpPassword.type == 'text' || signInPassword.type =='text'){
          signUpPassword.type = 'password';
          signInPassword.type = 'password';
          item.src ='./image/eye-slash.svg';  
        }
        else{
            signUpPassword.type = 'text';
            signInPassword.type = 'text';
            item.src = './image/eye.svg';
        }
    })
})

emailSignUp.style.display='none';

signupBoxLink.addEventListener('click', ()=>{
    emailLogin.style.display='none';
    setTimeout(() =>{
        emailSignUp.style.display='block';
    }, 200)
    signupBoxLink.classList.add('active');
    loginBoxLink.classList.remove('active');
})

loginBoxLink.addEventListener('click', ()=>{
    emailSignUp.style.display='none';
    setTimeout(() =>{
        emailLogin.style.display='block';
    }, 200)
    signupBoxLink.classList.remove('active');
    loginBoxLink.classList.add('active')
})

signUpBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(!signUpName.value || !signUpEmail.value || !signUpPassword.value){
        alert('Qandaydir input qolib ketdi')
    }
    else{
        fetch('http://localhost:5000/api/auth/singUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(!data.status && data){
                alert(data.msg + '❌')
            }
            else if(data && data.status){
                emailSignUp.style.display='none';
                setTimeout(() =>{
                    emailLogin.style.display='block';
                },1000);
                loginBoxLink.classList.add('active');
                signupBoxLink.classList.remove('active')
                alert('Successfully registered ✅')
            }
        }).catch(err =>{
            console.log(err);
        })
    }
})

signInBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(!signInEmail.value || !signInPassword.value){
        alert("Kechirasiz siz qandaydir bo'sh input qoldirasiz")
    }
    else{
        fetch('http://localhost:5000/api/auth/singIn', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail.value,
                password: signInPassword.value
            })
        })
        .then((response) => response.json())
        .then((newUser) => {
            if(newUser && !newUser.status){
                alert(newUser.msg + '❌')
            }
            else if(newUser && newUser.status){
                localStorage.setItem('token', JSON.stringify(newUser.token))
                localStorage.setItem('userInfo', JSON.stringify(newUser.user))
                setTimeout(() => {
                    alert('Successfully login ✔')
                    window.location.replace('/client/client/HomePage/home.html')
                },1000)
            }
        })
    }   
})