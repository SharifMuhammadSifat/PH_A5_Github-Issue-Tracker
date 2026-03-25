const loginPage = document.getElementById("login-container");
const username = document.getElementById("input-name");
const password = document.getElementById("input-pass");
const mainPage = document.getElementById("main-page-container");
const submitBtn = document.getElementById("submit");


const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

const allTab = document.getElementById("all-tab");
const openTab = document.getElementById("open-tab");
const closeTab = document.getElementById("close-tab");

const searchBtn = document.getElementById("search-btn");
const searchTxt = document.getElementById("search-box");
const searchTab = document.getElementById("search-tab");

const buttons = [allBtn, openBtn, closeBtn];
const tabs = [allTab, openTab, closeTab, searchTab];

let data_arr = null;

const modalBox = document.getElementById("modal-text");

mainPage.classList.add("hidden");

const badgeHandler = (arr) => {
    let badges = ""
    for (let badge of arr){
        if (badge === "bug"){
            badges += `<span class="px-3 py-1 text-[12px] rounded-full bg-red-100 text-[#db1616ff] w-fit">
                                <i class="fa-solid fa-bug" style="color: #db1616;"></i> BUG
                        </span> `;
        }

        else if (badge === "help wanted"){
            badges += `<span class="px-3 py-1 text-[12px] rounded-full bg-orange-100 text-[#db7900ff] w-fit">
                            <i class="fa-solid fa-life-ring" style="color: rgb(219, 122, 0);"></i> HELP WANTED
                        </span> `;
        }

        else if (badge === "good first issue"){
            badges += `<span class="px-2.5 py-0.5 text-[12px] font-semibold rounded-full bg-purple-100 text-[#ac56bfff] w-fit">
                           <i class="fa-solid fa-circle-exclamation" style="color: #ac56bf;"></i> GOOD FIRST ISSUE
                        </span>`;
        }

        else if (badge === "documentation"){
            badges += `<span class="px-2.5 py-0.5 text-[12px] font-semibold rounded-full bg-blue-100 text-[#5689bf] w-fit">
                        <i class="fa-brands fa-readme" style="color: #5689bf;"></i>  DOCUMENTATION
                    </span>`
        }

        else{
            badges += `<span class="px-3 py-1 text-[12px] rounded-full bg-green-100 text-[#1adb00ff] w-fit">
                            <i class="fa-regular fa-star" style="color: #1adb00;"></i> ENHANCEMENT
                        </span> `;
        }
    }

    return badges
}

const spinner = document.getElementById("spinner");

const manageSpinner = (flag) => {
    if (flag){
        spinner.classList.remove("hidden")
    }
    else {
        spinner.classList.add("hidden")
    }
}





const modalHandler = (issue_obj) => {
    modalBox.innerHTML = "";
    modalBox.innerHTML = `
        <div>
            <h3 class="text-2xl font-bold">${issue_obj.title}</h3>
            <div class="text-12px font-normal text-[#64748B]"><span class="${issue_obj.status === "open"? "bg-green-500" : "bg-purple-500"}  rounded-full text-white text-center px-2.5 py-0.5">${issue_obj.status}</span> Openend by ${issue_obj.author} | ${issue_obj.createdAt}</div>
        </div>

        <div>
            <div class="flex flex-col gap-1 2xl:flex-row ">${badgeHandler(issue_obj.labels)}</div>
        </div>

        <div>
            <p class="text-[16px] text-[#64748B]">${issue_obj.description}</p>
        </div>

        <div class="bg-[#F8FAFC] grid grid-cols-2">
            <div>
                <p class="text-[16px] font-normal text-[#64748B]">Assignee:</p>
                <h1 class="text-[16px] font-semibold">${issue_obj.assignee === ""? "No Assignee" : issue_obj.assignee}</h1>
            </div>

            <div class="flex flex-col gap-1.5">
                <p class="text-[16px] font-normal text-[#64748B]">Priority:</p>
                <div class="w-fit rounded-full font-medium text-[12px] ${issue_obj.priority === "high" ? "bg-[#FEECEC]" : issue_obj.priority === "medium" ? "bg-[#faffb4]" : "bg-[#dadada]"}">
                            <p class=" ${issue_obj.priority === "high" ? "text-red-500" : issue_obj.priority === "medium" ? 
                                "text-yellow-500" : "text-gray-500"} text-center px-2.5 py-0.5  ">${issue_obj.priority.toUpperCase()}</div>
            </div>
        </div>
    `;

    
}

const getID = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then((res) => res.json())
        .then((json) => modalHandler(json.data));

}

const displayIssue = (issue_obj, newElem) => {
            newElem.innerHTML = `
            <button class="hover:cursor-pointer" onclick="getID(${issue_obj.id})">
            <label for="my_modal_7" >
                <div class="bg-white p-2.5">
                    <div class="flex justify-between items-center">
                        <img src="${issue_obj.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" class="w-6 h-6" alt="">
                        <div class="h-6 w-20 rounded-full flex items-center justify-center ${issue_obj.priority === "high" ? "bg-[#FEECEC]" : issue_obj.priority === "medium" ? "bg-[#faffb4]" : "bg-[#dadada]"}">
                            <p class="${issue_obj.priority === "high" ? "text-red-500" : issue_obj.priority === "medium" ? 
                                "text-yellow-500" : "text-gray-500"} text-sm font-medium">${issue_obj.priority.toUpperCase()}</p>
                        </div>
                    </div>
                            
                    <div class="flex flex-col gap-2 mt-2"> 
                        <p class="font-semibold text-[14px] text-[#1F2937]">${issue_obj.title}</p>
                        <p class="text-[#64748B] text-[12px]">${issue_obj.description}</p>
                    </div>
                            
                    <div class="issue-labels mt-2">
                        <div class="flex flex-col gap-1 2xl:flex-row ">${badgeHandler(issue_obj.labels)}</div>
                    </div>
                </div>
                            
                <div class="border-t border-gray-300"></div>
                            
                <div class="bg-white p-2.5">
                    <p class="text-[#64748B] text-[12px]">
                        ${issue_obj.author} <br>${issue_obj.createdAt}
                    </p>
                </div>
                </label>
            </button>
            `;
            return newElem
}

const issueCount = document.getElementById("count");

const displayClosedIssue = (arr) => {
    manageSpinner(true);
    closeTab.innerHTML = "";
    let count = 0
    for (let issue of arr) {
        if (issue.status !== "closed"){
            continue;
        }
        count += 1;
        let newIssue = document.createElement("div");
        newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-purple-500", "overflow-hidden");
        displayIssue(issue, newIssue);
        closeTab.append(newIssue);
    }
    manageSpinner(false);
    issueCount.innerHTML = String(count);
}

const displayOpenIssue = (arr) => {
    manageSpinner(true);
    openTab.innerHTML = "";
    let count = 0
    for (let issue of arr) {
        
        
        if (issue.status !== "open"){
            continue
        }
        count += 1;
        let newIssue = document.createElement("div");
        newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-green-500", "overflow-hidden");
        displayIssue(issue, newIssue);
        openTab.append(newIssue);
    }
    manageSpinner(false);
    issueCount.innerHTML = String(count);
}

const displayAllIssue = (arr) => {
    manageSpinner(true);
    allTab.innerHTML = "";
    let count = 0
    for (let issue of arr) {
        let newIssue = document.createElement("div");
        
        if (issue.status === "open"){
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-green-500", "overflow-hidden");
        }
        else {
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-purple-500", "overflow-hidden");
        }
        count += 1;
        displayIssue(issue, newIssue);
        allTab.append(newIssue);
    }
    manageSpinner(false);
    issueCount.innerHTML = String(count);
}



const loginAuth = (u,p) => {
    if ((u === "admin") && (p === "admin123")) {
        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((issue_obj) => {
            data_arr = issue_obj.data
            displayAllIssue(data_arr);
        })
        
    }
}



submitBtn.addEventListener("click", () => {
    loginAuth(username.value, password.value);
});




function switchTab(activeBtn, activeTab) {

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary", "text-white");
        btn.classList.add("text-gray-500");
    });

    tabs.forEach(tab => {
        tab.classList.add("hidden");
    });

    if (activeBtn.id !== "search-btn"){
        activeBtn.classList.add("btn-primary", "text-white");
        activeBtn.classList.remove("text-gray-500");
    }

    

    activeTab.classList.remove("hidden");
}

allBtn.addEventListener("click", () => {
    switchTab(allBtn, allTab);
    displayAllIssue(data_arr);

});



openBtn.addEventListener("click", () => {
    switchTab(openBtn, openTab);
    displayOpenIssue(data_arr);

});
closeBtn.addEventListener("click", () => {
    switchTab(closeBtn, closeTab);
    displayClosedIssue(data_arr);
});

const displaySearchIssue = (arr) => {
    if (arr.length === 0){
        searchTab.innerHTML = `<h1 class="text-2xl font-bold w-full">No issue found!</h1>`;
        return
    }
    manageSpinner(true);
    searchTab.innerHTML = ``;
    let count = 0
    for (let issue of arr) {
        let newIssue = document.createElement("div");
        
        if (issue.status === "open"){
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-green-500", "overflow-hidden");
        }
        else {
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-purple-500", "overflow-hidden");
        }
        count += 1;
        displayIssue(issue, newIssue);
        searchTab.append(newIssue);
    }
    manageSpinner(false);
    issueCount.innerHTML = String(count);    
}



searchBtn.addEventListener("click", () => {
    let searchValue = searchTxt.value;
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((json) => {
        switchTab(searchBtn, searchTab)
        displaySearchIssue(json.data)
        
    }
)
    
});