const textInput = document.querySelector('#text-input')
const verifyBtn = document.querySelector('#btn')

verifyBtn.addEventListener('click', ()=>{
    const userEmail = localStorage.getItem('userEmail')
    if(textInput.value.trim().length >0){
        fetch('http://localhost:5000/api/auth/forgot/emailCodeCheck', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                code: textInput.value,
                email: JSON.parse(userEmail)
            })
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            if(!data.status && data){
                alert(data.msg + '❌')
            }
            else if(data.status && data){
                alert('Successfully send code' +'✅')
                window.location.replace('/client/resetPass.html')
            }
        })
    }
})