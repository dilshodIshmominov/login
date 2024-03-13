const mainBody = document.querySelector(".main");
const inputText = document.querySelector("#input");
const createBtn = document.querySelector("#create");

createBtn.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  fetch("http://localhost:5000/api/todos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(token),
    },
    body: JSON.stringify({
      text: inputText.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status && data) {
        localStorage.setItem("inputValue", JSON.stringify(inputText.value))
        getTodo()
        inputText.value=''
      }
    });
});

function getTodo() {
    fetch('http://localhost:5000/api/todos')
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        if(data.status && data){
            mainBody.innerHTML = ''
            for (item of data.todos) {
                const li =document.createElement('li')
                li.setAttribute('class', 'main-body')
                li.innerHTML=`
                <p class='text'>${item.text}</p>
                <button class="edit" onclick="editBtn('${item.id}')">EDIT</button>
                <button class="delete" onclick="deleteBtn('${item.id}')">DELETE</button>
                `;
                mainBody.appendChild(li);
                
            }
        }
    })
}

function deleteBtn(id){
    fetch('http://localhost:5000/api/todos/delete',{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id})
    })
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        if(data.status && data){
            location.reload()
        }
    })
}

function editBtn(id) {
    fetch(`http://localhost:5000/api/todos/edite/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            text: inputText.value
        })
    })
    .then((res) => res.json())
    .then((data)=>{
        console.log(data);
        if(!data.status && data){
            alert(data.msg)
        }
        else if(data.status && data){
            createBtn.textContent='Add'
        }
    })
}

getTodo()