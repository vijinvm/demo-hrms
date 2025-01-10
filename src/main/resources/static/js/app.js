const apiUrl = "/api/salaries";

async function fetchSalaries() {
    const response = await fetch(apiUrl);
    const salaries = await response.json();
    const tableBody = document.querySelector("#salary-table tbody");
    tableBody.innerHTML = "";
    salaries.forEach(salary => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${salary.id}</td>
            <td>${salary.employeeName}</td>
            <td>${salary.basicSalary}</td>
            <td>${salary.allowances}</td>
            <td>${salary.deductions}</td>
            <td>
                <button onclick="editSalary(${salary.id})">Edit</button>
                <button onclick="deleteSalary(${salary.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function saveSalary(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const employeeName = document.getElementById("employeeName").value;
    const basicSalary = document.getElementById("basicSalary").value;
    const allowances = document.getElementById("allowances").value;
    const deductions = document.getElementById("deductions").value;

    const salary = { employeeName, basicSalary, allowances, deductions };
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salary),
    });

    document.getElementById("salary-form").reset();
    fetchSalaries();
}

async function editSalary(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const salary = await response.json();
    document.getElementById("id").value = salary.id;
    document.getElementById("employeeName").value = salary.employeeName;
    document.getElementById("basicSalary").value = salary.basicSalary;
    document.getElementById("allowances").value = salary.allowances;
    document.getElementById("deductions").value = salary.deductions;
}

async function deleteSalary(id) {
    if (confirm("Are you sure you want to delete this salary?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchSalaries();
    }
}

document.getElementById("salary-form").addEventListener("submit", saveSalary);


fetchSalaries();
