// ==================== DOM Elements ==================== //
const balance = document.getElementById("amount");
const income = document.getElementById("totalInc");
const expence = document.getElementById("totalExp");
const tableRow = document.getElementById("Exps");
const expType = document.getElementById("expType");
const expName = document.getElementById("name");
const expAmount = document.getElementById("amountVal");
const submitBtn = document.getElementById("submit");

let srNo = 1; // serial number counter

// ================== Add Record Function ==================== //
const InsertRecord = (valueSet) => {
    let row = document.createElement("tr");

    // create table cells
    for (let d = 0; d < 5; d++) {
        let data = document.createElement("td");
        data.innerText = valueSet[d];
        row.appendChild(data);
    }

    // create delete button cell
    let delBtn = document.createElement("td");
    delBtn.classList.add("svgBtn");
    delBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20px">
      <path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/>
    </svg>`;
    row.appendChild(delBtn);

    // append to table
    tableRow.appendChild(row);
};

// =================== Adding Record to Table ================= //
const AddRecord = (e) => {
    e.preventDefault();
    let time = new Date();
    let transaction = expType.value == "Income" ? "Credited" : "Debited";
    let waqtTime = `${time.toLocaleTimeString()} on ${time.toLocaleDateString()}`;

    // Validate entries
    if (expName.value.trim() !== "" && expAmount.value !== "" && expAmount.value !== "0") {
        let dataSet = [srNo, expName.value.trim(), expAmount.value, transaction, waqtTime];

        // Add to table
        InsertRecord(dataSet);
        UpdateBalance(expType.value, parseInt(expAmount.value));

        // Save to localStorage
        SaveRow(dataSet);

        srNo++;
        expName.value = "";
        expAmount.value = "";
    } else {
        alert("Please provide a valid Name and Amount greater than 0.");
    }
};

// ================== Update Balance ====================== //
const UpdateBalance = (type, amt) => {
    let bal = parseInt(balance.innerText, 10);
    let inc = parseInt(income.innerText, 10);
    let exp = parseInt(expence.innerText, 10);

    if (type === "Income") {
        income.innerText = inc + amt;
        balance.innerText = bal + amt;
    } else {
        expence.innerText = exp + amt;
        balance.innerText = bal - amt;
    }

    // Save totals to localStorage
    localStorage.setItem("totals", JSON.stringify({
        balance: balance.innerText,
        income: income.innerText,
        expence: expence.innerText
    }));
};

// ================= Delete Table Row ===================== //
const DeleteRow = (e) => {
    let target = e.target;

    if (target.tagName === "svg" || target.closest(".svgBtn")) {
        const row = target.closest("tr");
        const amount = parseInt(row.children[2].innerText);
        const transaction = row.children[3].innerText;

        // update totals before deleting
        if (transaction === "Credited") {
            income.innerText = parseInt(income.innerText) - amount;
            balance.innerText = parseInt(balance.innerText) - amount;
        } else {
            expence.innerText = parseInt(expence.innerText) - amount;
            balance.innerText = parseInt(balance.innerText) + amount;
        }

        alert("The record has been removed!");
        row.remove();

        // update localStorage
        localStorage.setItem("totals", JSON.stringify({
            balance: balance.innerText,
            income: income.innerText,
            expence: expence.innerText
        }));

        // remove from localStorage record list
        let saved = JSON.parse(localStorage.getItem("records")) || [];
        const name = row.children[1].innerText;
        localStorage.setItem(
            "records",
            JSON.stringify(saved.filter(r => r[1] !== name))
        );
    }
};

// ================= Save Data to LocalStorage ================= //
const SaveRow = (listData) => {
    let saved = JSON.parse(localStorage.getItem("records")) || [];
    saved.push(listData);
    localStorage.setItem("records", JSON.stringify(saved));
};

// ================= Load Data from LocalStorage ================= //
const LoadRow = () => {
    const totals = JSON.parse(localStorage.getItem("totals"));
    if (totals) {
        balance.innerText = totals.balance;
        income.innerText = totals.income;
        expence.innerText = totals.expence;
    }

    const saved = JSON.parse(localStorage.getItem("records")) || [];
    saved.forEach((record) => {
        InsertRecord(record);
        srNo = Math.max(srNo, record[0] + 1);
    });
};

// ================= Event Listeners ================= //
submitBtn.addEventListener("click", AddRecord);
tableRow.addEventListener("click", DeleteRow);
window.addEventListener("load", LoadRow);