let ChangeDataButtons = document.querySelectorAll('.employee-manager-dashboard-change-data');
let EmployeeEditBtn = document.querySelectorAll('.setting-icon');
let EmployeeDeleteBtn = document.querySelectorAll('.delete-icon');
let employees = document.querySelectorAll('.employee-manager-dashboard-form-item');
let SaveBtn = document.querySelector('.employee-manager-dashboard-button');
let employeesDataArr = [];
let employeesDeleteDataArr = [];
let UpdateEmployeeDataJSON;
let DeletedEmployeeDataJSON;

for(let i = 0; i < ChangeDataButtons.length; i++) {
    EmployeeEditBtn[i].addEventListener('click', ()=> {
        employees[i].children[2].children[0].readOnly=false
        employees[i].children[2].children[0].style.color = "#111111";
        employees[i].children[3].children[0].readOnly=false
        employees[i].children[3].children[0].style.color = "#111111";
        employees[i].children[4].children[0].disabled=false
    });
}

SaveBtn.addEventListener('click', ()=>{
    for(let i = 0; i < ChangeDataButtons.length; i++){
        employees[i].children[2].children[0].readOnly=true
        employees[i].children[2].children[0].style.color = "#434343";
        employees[i].children[3].children[0].readOnly=true
        employees[i].children[3].children[0].style.color = "#434343";
        employees[i].children[4].children[0].disabled=true
    }
    // Изменение данных у сотрудников
    employeesDataArr = [];
    for(let i = 0; i < ChangeDataButtons.length; i++) {
        let employeeDataArr = [null,null,null,null,null];
        employeeDataArr[0] = employees[i].children[0].children[0].innerHTML;
        employeeDataArr[1] = employees[i].children[1].children[1].innerHTML;
        employeeDataArr[2] = employees[i].children[2].children[0].value;
        employeeDataArr[3] = employees[i].children[3].children[0].value;
        employeeDataArr[4] = employees[i].children[4].children[0].value;
        employeesDataArr.push(employeeDataArr);
    }
    // Парсинг данных в JSON
    UpdateEmployeeDataJSON = JSON.stringify(employeesDataArr);
    // fetch
    fetch('/updateEmployes', {
        method: 'PUT',
        body: UpdateEmployeeDataJSON,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("Error with sending data to the server occured");
        }
    
        return response.json();
    })
    .then((data) => {
        console.log("Отправленные данные", data)
    })
    .catch((err) => {
        console.log(err);
    })
    // Удаление сотрудников
    employeesDeleteDataArr = [];
    for(let i = 0; i < ChangeDataButtons.length; i++) {
        if(EmployeeDeleteBtn[i].classList.contains("bx-undo")){
            let employeeDeleteDataArr = [];
            employeeDeleteDataArr[0] = employees[i].children[0].children[0].innerHTML;
            employeeDeleteDataArr[1] = employees[i].children[1].children[1].innerHTML;
            employeesDeleteDataArr.push(employeeDeleteDataArr);
            employees[i].style.display = "none";
        }
    }
    // Парсинг данных в JSON
    DeletedEmployeeDataJSON = JSON.stringify(employeesDeleteDataArr);
    // fetch
    fetch('/deleteEmployes', {
        method: 'DELETE',
        body: DeletedEmployeeDataJSON,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("Error with sending data to the server occured");
        }
    
        return response.json();
    })
    .then((data) => {
        console.log("Отправленные данные", data)
    })
    .catch((err) => {
        console.log(err);
    })
});

// Search button
let searchDiv = document.querySelector('.employee-manager-header-search');
let searchField = searchDiv.children[0];
let searchBtn = searchDiv.children[1];

searchBtn.addEventListener('keyup', () => {
    for(let i = 0; i < employees.length; i++){
        employees[i].style.display = "none";
    }
    for(let i = 0; i < employees.length; i++){
        if(employees[i].children[1].children[1].innerHTML.includes(searchField.value.toLowerCase())){
            employees[i].style.display = "flex";
        }
    }
})

searchField.addEventListener('change', () => {
    for(let i = 0; i < employees.length; i++) {
        employees[i].style.display = "flex";
    }
})

// Delete employees Btn
for(let i = 0; i < ChangeDataButtons.length; i++) {
    EmployeeDeleteBtn[i].addEventListener('click', ()=> {
        employees[i].style.background = "silver";
        employees[i].style.borderRadius = "16px";
        if(EmployeeDeleteBtn[i].classList.contains("bx-x")){
            EmployeeDeleteBtn[i].classList.replace("bx-x", "bx-undo");
        }
        else {
            EmployeeDeleteBtn[i].classList.replace("bx-undo", "bx-x");
            employees[i].style.background = "transparent";
            employees[i].style.borderRadius = "0px";
        }
    });
}