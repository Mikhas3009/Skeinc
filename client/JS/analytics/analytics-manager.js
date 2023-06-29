// Изменение цвета в блоке "Последние транзакции"
let analyticsFinanceItems = document.querySelectorAll('.analytics-manager-finance');

for(let i = 0; i < analyticsFinanceItems.length; i++){
    if(analyticsFinanceItems[i].children[1].innerHTML == 'Расходы') {
        analyticsFinanceItems[i].children[2].children[0].innerHTML = '- ';
        analyticsFinanceItems[i].children[2].style.color = "#de4040";
    }

    if(analyticsFinanceItems[i].children[1].innerHTML == 'Доходы') {
        analyticsFinanceItems[i].children[2].children[0].innerHTML = '+ ';
        analyticsFinanceItems[i].children[2].style.color = "#5eb536";
    }
}

// Подсчет прибыли компании
let analyticsExpenses = document.querySelector('.analytics-finance-expenses').children[0].innerHTML;
let analyticsIncome = document.querySelector('.analytics-finance-income').children[0].innerHTML;
let analyticsProfit = document.querySelector('.analytics-finance-profit');

analyticsProfit.children[0].innerHTML = Number(analyticsIncome) - Number(analyticsExpenses);

if(Number(analyticsProfit.children[0].innerHTML) < 0) {
    analyticsProfit.style.color = "#de4040";
}
else if(Number(analyticsProfit.children[0].innerHTML) == 0) {
    analyticsProfit.style.color = "#dbd530";
}
else if (Number(analyticsProfit.children[0].innerHTML) > 0) {
    analyticsProfit.style.color = "#5eb536";
}

// Custom Select
let SelectEmployee = document.querySelector('#select-employee');
let SelectEmployeeField = SelectEmployee.children[0];
let SelectEmployeeSearch = SelectEmployee.children[1].children[0];
let SelectEmployeeItems = SelectEmployee.children[1].children[1];

SelectEmployeeField.addEventListener('click', () => {
    if(SelectEmployee.children[1].classList.contains('non-active-select')){
        SelectEmployee.children[1].classList.remove('non-active-select')
        SelectEmployee.children[1].classList.add('active-select')
        SelectEmployee.children[1].style.display = "flex";
    }
    else if(SelectEmployee.children[1].classList.contains('active-select')){
        SelectEmployee.children[1].classList.remove('active-select')
        SelectEmployee.children[1].classList.add('non-active-select')
        SelectEmployee.children[1].style.display = "none";
    }
    SelectEmployeeSearch.children[1].addEventListener('keyup', () => {
        for(let i = 0; i < SelectEmployeeItems.children.length; i++){
            SelectEmployeeItems.children[i].style.display = "none";
        }
        for(let i = 0; i < SelectEmployeeItems.children.length; i++){
            if(SelectEmployeeItems.children[i].children[2].innerHTML.includes(SelectEmployeeSearch.children[1].value)){
                SelectEmployeeItems.children[i].style.display = "flex";
            }
        }
    })

    for(let i = 0; i < SelectEmployeeItems.children.length; i++) {
        SelectEmployeeItems.children[i].addEventListener('click', () => {
            SelectEmployeeField.children[2].innerHTML = SelectEmployeeItems.children[i].children[0].innerHTML;
            SelectEmployeeField.children[0].innerHTML = SelectEmployeeItems.children[i].children[2].innerHTML;
            SelectEmployee.children[1].style.display = "none";
            if(SelectEmployeeField.children[0].innerHTML != "Выберите сотрудника"){
                SelectEmployeeField.classList.remove('select-field');
                SelectEmployeeField.classList.add('select-field-validate');
                SelectEmployee.children[1].classList.remove('active-select')
                SelectEmployee.children[1].classList.add('non-active-select')
            }
            else {
                SelectEmployeeField.classList.add('select-field');
                SelectEmployeeField.classList.remove('select-field-validate');
            }
        });
    }
});

// Подготовка и получение данных
let timeManagerShowBtn = document.querySelector(".showBtn");
let checkTimeManagerAlertWindow = document.querySelector('.alert-window');
let checkTimeManagerGeneral = document.querySelector(".check-time-manager-general");
let checkTimeManagerItems = document.querySelectorAll('.check-time-manager-item');
let checkTimeManagerEmployeeArr = [];
let checkTimeManagerEmployeeObj = {
    employeeId: null,
    employeeName: null,
    employeeDate: null
}
let checkTimeManagerEmployeeJSON;
timeManagerShowBtn.addEventListener('click', ()=> {
    let inputDate = document.querySelector('#inputDate');
    inputDate = inputDate.value;
    if(inputDate != '' && SelectEmployeeField.classList.contains('select-field-validate')){
        checkTimeManagerEmployeeArr[0] = SelectEmployeeField.children[2].innerHTML;
        checkTimeManagerEmployeeArr[1] = SelectEmployeeField.children[0].innerHTML;
        checkTimeManagerEmployeeArr[2] = inputDate;
        checkTimeManagerGeneral.style.display = "flex";
    }
    else {
        if(checkTimeManagerAlertWindow.classList.contains('alert-window-hidden')){
            checkTimeManagerAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            checkTimeManagerAlertWindow.children[1].children[0].addEventListener('click', () => {
                checkTimeManagerAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            checkTimeManagerAlertWindow.classList.add('alert-window-hidden');
        }
    }
    // Parse Array to Object
    for(let i = 0; i < Object.values(checkTimeManagerEmployeeObj).length; i++){
        Object.keys(checkTimeManagerEmployeeObj).forEach((value, i) => {
            checkTimeManagerEmployeeObj[value] = checkTimeManagerEmployeeArr[i];
        });
    }
    // Parse Object to JSON
    checkTimeManagerEmployeeJSON = JSON.stringify(checkTimeManagerEmployeeArr);
    // fetch
    fetch('/check-time-manager-employee', {
        method: 'POST',
        body: checkTimeManagerEmployeeJSON,
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

    if(checkTimeManagerItems.length == 0) {
        let emptyData = document.querySelector('.check-time-manager-empty');
        emptyData.style.display = "flex";
    }
    
})