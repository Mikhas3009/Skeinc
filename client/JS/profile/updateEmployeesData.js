let ChangeDataButtons = document.querySelectorAll('.employee-manager-dashboard-change-data');
let EmployeeEditBtn = document.querySelectorAll('.setting-icon');
let EmployeeDeleteBtn = document.querySelectorAll('.delete-icon');
let AdminAlertWindow = document.querySelector('.alert-window');
let employees = document.querySelectorAll('.employee-manager-dashboard-form-item');
let SaveBtn = document.querySelector('.employee-manager-dashboard-button');
let ProfileUserId = document.querySelector('.profile-cart-user-id');
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
        if(ProfileUserId.children[0].innerHTML == employees[i].children[0].children[0].innerHTML) {
            employees[i].children[4].children[0].disabled=true
        }
        else {
            employees[i].children[4].children[0].disabled=false
        }
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
    for(let i = 0; i < employees.length; i++){
        if(employees[i].children[0].children[0].innerHTML == ProfileUserId.children[0].innerHTML){
            let userPost = employees[i].children[2].children[0].value;
            let userSalary = employees[i].children[3].children[0].value;
            let userPostCart = document.querySelector('.profile-cart-user-post');
            let userSalaryCart = document.querySelector('.profile-job-salary');
    
            userPostCart.children[0].innerHTML = userPost;
            userSalaryCart.children[0].innerHTML = userSalary + '<i class="bx bx-ruble"></i>';
        }
    }
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

searchField.addEventListener('keyup', () => {
    for(let i = 0; i < employees.length; i++){
        employees[i].style.display = "none";
    }
    for(let i = 0; i < employees.length; i++){
        if(employees[i].children[1].children[1].innerHTML.toLowerCase().includes(searchField.value.toLowerCase())){
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
        if(employees[i].children[0].children[0].innerHTML == ProfileUserId.children[0].innerHTML) {
            if(AdminAlertWindow.classList.contains('alert-window-hidden')){
                AdminAlertWindow.classList.remove('alert-window-hidden');
                AdminAlertWindow.children[0].children[0].innerHTML = "Вы не можете удалить самого себя!"
                window.location.href = "#alert-window";
                AdminAlertWindow.children[1].children[0].addEventListener('click', () => {
                    AdminAlertWindow.classList.add('alert-window-hidden');
                });
            }
            else {
                AdminAlertWindow.classList.add('alert-window-hidden');
            }
        }
        else {
            employees[i].style.background = "silver";
            employees[i].style.borderRadius = "16px";
            AdminAlertWindow.children[0].children[0].innerHTML = "Заполните данные!"
            if(EmployeeDeleteBtn[i].classList.contains("bx-x")){
                EmployeeDeleteBtn[i].classList.replace("bx-x", "bx-undo");
            }
            else {
                EmployeeDeleteBtn[i].classList.replace("bx-undo", "bx-x");
                employees[i].style.background = "transparent";
                employees[i].style.borderRadius = "0px";
            }
        }
    });
}