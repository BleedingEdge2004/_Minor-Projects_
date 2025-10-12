const balance = document.getElementById("amount");
const income = document.getElementById("totalInc");
const expence = document.getElementById("totalExp");
const tableRow = document.getElementById("Exps");
const expType = document.getElementById("expType");
const expName = document.getElementById("name");
const expAmount = document.getElementById("amountVal");
const submitBtn = document.getElementById("submit");

// =================== Adding Record to Table ================= //
let srNo = 1;
const AddRecord = (e) => {
    let time = new Date();
    e.preventDefault(); 
    if(expName.value !== "" && expAmount.value !== "" && expAmount.value !== "0"){
    let transaction = expType.value == "Income" ? "Credited" : "Debited";
    let waqtTime = `${time.toLocaleTimeString()} on ${time.toLocaleDateString()}`;
    let dataSet = [srNo, expName.value, expAmount.value, transaction, waqtTime];
        let row = document.createElement("tr");

        for (let d = 0; d < 5; d++) {
            let data = document.createElement("td");
            data.innerText = dataSet[d];
            row.appendChild(data);
        }
        let delBtn = document.createElement("div");
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20px"><path  d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>`;
        row.appendChild(delBtn);
    
        srNo++;
        tableRow.appendChild(row);
        UpdateBalance();
        expName.value = "";
        expAmount.value = "";
    }
    else {
        expName.value === "" ? alert("Can't entry a Expence/Income without Name .. ") : expAmount.value === "0" ? alert("Can't entry Expence/Income with Zero Amount") : alert("Can't entry Expence/Income without Amount ");
    }
};

//  ================== Update Balance ====================== //
const UpdateBalance = () => {
    let bal = parseInt(balance.innerText,10);
    let inc = parseInt(income.innerText,10);
    let exp = parseInt(expence.innerText, 10);
    let amt = parseInt(expAmount.value, 10);
    if (expType.value === "Income") {
        income.innerText = inc + amt ;
        balance.innerText = amt + bal ;
    }
    else {
        expence.innerText = amt + exp ;
        balance.innerText = bal - amt;
    }
};

//  ================= Delete Table Row ===================== //
const DeleteRow = (e) => {
    if (e.target.tagName === "DIV") {
        alert("The Data is Removed");
        e.target.parentNode.remove();
    }
};

//  =================Save Data ================== //


submitBtn.addEventListener('click', AddRecord);
tableRow.addEventListener('click', DeleteRow);