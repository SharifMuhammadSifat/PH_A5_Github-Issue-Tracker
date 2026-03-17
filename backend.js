const loginPage = document.getElementById("login-container");
const username = document.getElementById("input-name");
const password = document.getElementById("input-pass");
const mainPage = document.getElementById("main-page-container");
const submitBtn = document.getElementById("submit");



// mainPage.classList.add("hidden")




const loginAuth = (u,p) => {
    if ((u === "admin") && (p === "admin123")) {
        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
    }
}

submitBtn.addEventListener("click", () => {
    loginAuth(username.value, password.value)
});