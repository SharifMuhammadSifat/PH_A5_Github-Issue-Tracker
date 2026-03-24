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

const buttons = [allBtn, openBtn, closeBtn];
const tabs = [allTab, openTab, closeTab];



mainPage.classList.add("hidden");

const displayAllIssue = (arr) => {
    allTab.innerHTML = "";
    for (let issue of arr) {
        let newIssue = document.createElement("div");
        
        if (issue.status === "open"){
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-green-500", "overflow-hidden");
        }
        else {
            newIssue.classList.add("shadow", "rounded-2xl", "border-t-2", "border-purple-500", "overflow-hidden");
        }
        newIssue.innerHTML = `
            <div class="bg-white p-2.5">
                <div class="flex justify-between items-center">
                    <img src="${issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" class="w-6 h-6" alt="">
                    <div class="h-6 w-20 rounded-full flex items-center justify-center ${issue.priority === "high" ? "bg-[#FEECEC]" : issue.priority === "medium" ? "bg-[#faffb4]" : "bg-[#dadada]"}">
                        <p class="${issue.priority === "high" ? "text-red-500" : issue.priority === "medium" ? "text-yellow-500" : "text-gray-500"} text-sm">${issue.priority}</p>
                    </div>
                </div>
            
                <div class="flex flex-col gap-2 mt-2"> 
                    <p class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</p>
                    <p class="text-[#64748B] text-[12px]">${issue.description}</p>
                </div>
            
                <div class="issue-labels mt-2">
                    <p>${issue.labels.join(" ")}</p>
                </div>
            </div>
            

            <div class="border-t border-gray-300"></div>
        
            <div class="bg-white p-2.5">
                <p class="text-[#64748B] text-[12px]">
                    ${issue.author} <br>${issue.createdAt}
                </p>
            </div>
        `;
        allTab.append(newIssue);
    }
}

const loginAuth = (u,p) => {
    if ((u === "admin") && (p === "admin123")) {
        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((issue_obj) => displayAllIssue(issue_obj.data));
    }
}



submitBtn.addEventListener("click", (event) => {
    // event.preventDefault();
    loginAuth(username.value, password.value)
    
});


//<div class="shadow rounded-2xl  border-t-2 border-green-500 overflow-hidden">
//
//                            <!-- Top Section -->
//                            <div class="bg-white p-2.5">
//                                <div class="flex justify-between items-center">
//                                    <img src="assets/Open-Status.png" class="w-6 h-6" alt="">
//
//                                    <div class="h-6 w-20 bg-[#FEECEC] rounded-full flex items-center justify-center">
//                                        <p class="text-[#EF4444] text-sm">HIGH</p>
//                                    </div>
//                                </div>
//                            
//                                <div class="flex flex-col gap-2 mt-2"> 
//                                    <p class="font-semibold text-[14px] text-[#1F2937]">demo text</p>
//                                    <p class="text-[#64748B] text-[12px]">demo text</p>
//                                </div>
//                            
//                                <div class="issue-labels mt-2">
//                                    <!-- labels here -->
//                                </div>
//                            </div>
//                            
//                            <!-- Divider -->
//                            <div class="border-t border-gray-300"></div>
//                        
//                            <!-- Bottom Section -->
//                            <div class="bg-white p-2.5">
//                                <p class="text-[#64748B] text-[12px]">
//                                    programmer <br>date
//                                </p>
//                            </div>
//
//                        </div>


function switchTab(activeBtn, activeTab) {

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary", "text-white");
        btn.classList.add("text-gray-500");
    });

    tabs.forEach(tab => {
        tab.classList.add("hidden");
    });

    activeBtn.classList.add("btn-primary", "text-white");
    activeBtn.classList.remove("text-gray-500");

    activeTab.classList.remove("hidden");
}

allBtn.addEventListener("click", () => {
    switchTab(allBtn, allTab)

});



openBtn.addEventListener("click", () => {switchTab(openBtn, openTab)});
closeBtn.addEventListener("click", () => {switchTab(closeBtn, closeTab)});