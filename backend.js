const loginPage = document.getElementById("login-container");
const username = document.getElementById("input-name");
const password = document.getElementById("input-pass");
const mainPage = document.getElementById("main-page-container");
const submitBtn = document.getElementById("submit");


const allTabBtn = document.getElementById("all-btn");
const openTabBtn = document.getElementById("open-btn");
const closeTabBtn = document.getElementById("close-btn");



mainPage.classList.add("hidden");


const loginAuth = (u,p) => {
    if ((u === "admin") && (p === "admin123")) {
        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
    }
}

submitBtn.addEventListener("click", () => {
    loginAuth(username.value, password.value)
});


allTabBtn.addEventListener("click", () => {
    const allTab = document.getElementById("all-tab");
    const openTab = document.getElementById("open-tab");
    const closeTab = document.getElementById("close-tab");

        
    allTabBtn.classList.add("btn-primary", "text-white");
    allTabBtn.classList.remove("text-gray-500");
    openTabBtn.classList.remove("text-white");
    openTabBtn.classList.add("text-gray-500");
    closeTabBtn.classList.remove("text-white");
    closeTabBtn.classList.add("text-gray-500");
    openTabBtn.classList.remove("btn-primary");
    closeTabBtn.classList.remove("btn-primary");
    allTab.classList.remove("hidden");
    closeTab.classList.add("hidden");
    openTab.classList.add("hidden");


})

openTabBtn.addEventListener("click", () => {
    const allTab = document.getElementById("all-tab");
    const openTab = document.getElementById("open-tab");
    const closeTab = document.getElementById("close-tab");

    openTabBtn.classList.add("btn-primary", "text-white");
    openTabBtn.classList.remove("text-gray-500");
    allTabBtn.classList.remove("text-white");
    allTabBtn.classList.add("text-gray-500");
    closeTabBtn.classList.remove("text-white");
    closeTabBtn.classList.add("text-gray-500")
    allTabBtn.classList.remove("btn-primary");
    closeTabBtn.classList.remove("btn-primary");
    openTab.classList.remove("hidden");
    closeTab.classList.add("hidden");
    allTab.classList.add("hidden");
    
    

})

closeTabBtn.addEventListener("click", () => {
    const allTab = document.getElementById("all-tab");
    const openTab = document.getElementById("open-tab");
    const closeTab = document.getElementById("close-tab");

    closeTabBtn.classList.add("btn-primary", "text-white");
    closeTabBtn.classList.remove("text-gray-500");
    allTabBtn.classList.remove("text-white");
    allTabBtn.classList.add("text-gray-500");
    openTabBtn.classList.remove("text-white");
    openTabBtn.classList.add("text-gray-500");
    openTabBtn.classList.remove("btn-primary");
    allTabBtn.classList.remove("btn-primary");
    closeTab.classList.remove("hidden");
    allTab.classList.add("hidden");
    openTab.classList.add("hidden");
})