const email = document.querySelector("#email");
const resetBtn = document.querySelector("#reset-password");

resetBtn.addEventListener("click", () => {
    if (email.value.trim().length > 0) {
        fetch("http://localhost:5000/api/auth//forgot/checkEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (!data.status && data) {
                alert(data.msg + "❌");
            }
            else if (data.status && data) {
                localStorage.setItem("userEmail", JSON.stringify(email.value));
                setTimeout(() => {
                    window.location.replace("/client/email/email.html");
                    alert("Successfully Registered ✅");
                },1000)
            }
        });
    }
});
