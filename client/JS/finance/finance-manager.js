// Custom Select Month
let SelectFinanceMonth = document.querySelector('#select-finance-months');
let SelectFinanceMonthField = SelectFinanceMonth.children[0];
let SelectFinanceMonthItems = SelectFinanceMonth.children[1].children[0];

// Заполнение Select данными
let MonthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь','Ноябрь', 'Декабрь'];

for(let i = 0; i < MonthsArray.length; i++){
    let MonthItem = document.createElement('div');
    MonthItem.classList.add('select-item');
    MonthItem.innerHTML = MonthsArray[i];
    SelectFinanceMonthItems.append(MonthItem);
}

// Подстановка текущего месяца
let CurrentMonth = new Date().getMonth() + 1;
SelectFinanceMonthField.children[0].innerHTML = MonthsArray[CurrentMonth-1];

if(SelectFinanceMonthField.children[0].innerHTML != "Выберите месяц"){
    SelectFinanceMonthField.classList.remove('select-field');
    SelectFinanceMonthField.classList.add('select-field-validate');
    SelectFinanceMonth.children[1].classList.remove('active-select')
    SelectFinanceMonth.children[1].classList.add('non-active-select')
}
else {
    SelectFinanceMonthField.classList.add('select-field');
    SelectFinanceMonthField.classList.remove('select-field-validate');
}

// Клик по Select
SelectFinanceMonthField.addEventListener('click', () => {
    if(SelectFinanceMonth.children[1].classList.contains('non-active-select')){
        SelectFinanceMonth.children[1].classList.remove('non-active-select')
        SelectFinanceMonth.children[1].classList.add('active-select')
        SelectFinanceMonth.children[1].style.display = "flex";
    }
    else if(SelectFinanceMonth.children[1].classList.contains('active-select')){
        SelectFinanceMonth.children[1].classList.remove('active-select')
        SelectFinanceMonth.children[1].classList.add('non-active-select')
        SelectFinanceMonth.children[1].style.display = "none";
    }

    for(let i = 0; i < SelectFinanceMonthItems.children.length; i++) {
        SelectFinanceMonthItems.children[i].addEventListener('click', () => {
            SelectFinanceMonthField.children[0].innerHTML = SelectFinanceMonthItems.children[i].innerHTML;
            SelectFinanceMonth.children[1].style.display = "none";
            if(SelectFinanceMonthField.children[0].innerHTML != "Выберите месяц"){
                SelectFinanceMonthField.classList.remove('select-field');
                SelectFinanceMonthField.classList.add('select-field-validate');
                SelectFinanceMonth.children[1].classList.remove('active-select')
                SelectFinanceMonth.children[1].classList.add('non-active-select')
            }
            else {
                SelectFinanceMonthField.classList.add('select-field');
                SelectFinanceMonthField.classList.remove('select-field-validate');
            }
        });
    }
})

// Custom Select Year
let SelectFinanceYear = document.querySelector('#select-finance-years');
let SelectFinanceYearField = SelectFinanceYear.children[0];
let SelectFinanceYearItems = SelectFinanceYear.children[1].children[0];

// Заполнение Select данными
let YearArray = [];
let CurrentYear = new Date().getFullYear();
for(let i = 0; i < 10; i++) {
    YearArray.push(CurrentYear);
    CurrentYear--;
}

CurrentYear = new Date().getFullYear();

for(let i = 0; i < YearArray.length; i++){
    let YearItem = document.createElement('div');
    YearItem.classList.add('select-item');
    YearItem.innerHTML = YearArray[i];
    SelectFinanceYearItems.append(YearItem);
}

// Подстановка текущего года
SelectFinanceYearField.children[0].innerHTML = CurrentYear;

if(SelectFinanceYearField.children[0].innerHTML != "Выберите год"){
    SelectFinanceYearField.classList.remove('select-field');
    SelectFinanceYearField.classList.add('select-field-validate');
    SelectFinanceYear.children[1].classList.remove('active-select')
    SelectFinanceYear.children[1].classList.add('non-active-select')
}
else {
    SelectFinanceYearField.classList.add('select-field');
    SelectFinanceYearField.classList.remove('select-field-validate');
}

// Клик по Select
SelectFinanceYearField.addEventListener('click', () => {
    if(SelectFinanceYear.children[1].classList.contains('non-active-select')){
        SelectFinanceYear.children[1].classList.remove('non-active-select')
        SelectFinanceYear.children[1].classList.add('active-select')
        SelectFinanceYear.children[1].style.display = "flex";
    }
    else if(SelectFinanceYear.children[1].classList.contains('active-select')){
        SelectFinanceYear.children[1].classList.remove('active-select')
        SelectFinanceYear.children[1].classList.add('non-active-select')
        SelectFinanceYear.children[1].style.display = "none";
    }

    for(let i = 0; i < SelectFinanceYearItems.children.length; i++) {
        SelectFinanceYearItems.children[i].addEventListener('click', () => {
            SelectFinanceYearField.children[0].innerHTML = SelectFinanceYearItems.children[i].innerHTML;
            SelectFinanceYear.children[1].style.display = "none";
            if(SelectFinanceYearField.children[0].innerHTML != "Выберите месяц"){
                SelectFinanceYearField.classList.remove('select-field');
                SelectFinanceYearField.classList.add('select-field-validate');
                SelectFinanceYear.children[1].classList.remove('active-select')
                SelectFinanceYear.children[1].classList.add('non-active-select')
            }
            else {
                SelectFinanceYearField.classList.add('select-field');
                SelectFinanceYearField.classList.remove('select-field-validate');
            }
        });
    }
})

// Подготовка данных для fetch
let FinanceManagerDateArr = [];

// Парсинг даты
function ParseDate(year, month, day) {
    year = year + '-';
    if(month.toLocaleString().length == 1) {
        month = '0' + month;
    }
    month = month + '-';
    if(day.toLocaleString().length == 1) {
        day = '0' + day;
    }
    let FinanceStartDate = year + month + day;
    let FinanceManagerEndDate = year + month + 31;
    FinanceManagerDateArr[0] = FinanceStartDate;
    FinanceManagerDateArr[1] = FinanceManagerEndDate;
}

ParseDate(CurrentYear, CurrentMonth, 1);

let FinanceManagerDateObj = {
    FinanceManagerStartDate: null,
    FinanceManagerEndDate: null
}

let FinanceManagerDateJSON;

// Parse Array to Object
for(let i = 0; i < Object.values(FinanceManagerDateObj).length; i++){
    Object.keys(FinanceManagerDateObj).forEach((value, i) => {
        FinanceManagerDateObj[value] = FinanceManagerDateArr[i];
    });
}

// Parse to JSON
FinanceManagerDateJSON = JSON.stringify(FinanceManagerDateObj);

// fetch
fetch('/finance-manager', {
    method: 'PUT',
    body: FinanceManagerDateJSON,
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

// Изменение даты
let FinanceManagerFilterButton = document.querySelector('.finance-manager-filters-button');
FinanceManagerFilterButton = FinanceManagerFilterButton.children[0];

FinanceManagerFilterButton.addEventListener('click', () => {
    // Подготовка данных
    FinanceManagerDateArr = [];
    FinanceManagerDateObj.FinanceManagerStartDate = null;
    FinanceManagerDateObj.FinanceManagerEndDate = null;
    let SelectMonth = SelectFinanceMonthField.children[0].innerHTML;
    for(let i = 0; i < MonthsArray.length; i++){
        if(SelectFinanceMonthField.children[0].innerHTML == MonthsArray[i]){
            SelectMonth = i + 1;
        }
    }
    let SelectYear = SelectFinanceYearField.children[0].innerHTML;
    SelectYear = Number(SelectYear);
    //Вызов функции
    ParseDate(SelectYear, SelectMonth, 1);
    // Parse Array to Object
    for(let i = 0; i < Object.values(FinanceManagerDateObj).length; i++){
        Object.keys(FinanceManagerDateObj).forEach((value, i) => {
            FinanceManagerDateObj[value] = FinanceManagerDateArr[i];
        });
    }
    let FilterDate = FinanceManagerDateObj.FinanceManagerStartDate.slice(0,7);
    // Изменение стилизации транзакций
    for(let i = 0; i < FinanceManagerItem.length; i++){
        if(!FinanceManagerItem[i].children[3].children[1].children[0].innerHTML.includes(FilterDate)){
            FinanceManagerItem[i].style.display = "none";
        }
        else {
            FinanceManagerItem[i].style.display = "flex";
        }
    }
})

// Изменение цены в зависимости от статуса транзакции
let FinanceManagerItem = document.querySelectorAll('.finance-manager-item');

for(let i = 0; i < FinanceManagerItem.length; i++) {
    if(FinanceManagerItem[i].children[1].children[0].innerHTML == 'Расходы') {
        FinanceManagerItem[i].children[2].children[0].innerHTML = '-';
        FinanceManagerItem[i].children[2].children[0].style.color = "#de4040";
        FinanceManagerItem[i].children[2].children[1].style.color = "#de4040";
    }

    if(FinanceManagerItem[i].children[1].children[0].innerHTML == 'Доходы') {
        FinanceManagerItem[i].children[2].children[0].innerHTML = '+';
        FinanceManagerItem[i].children[2].children[0].style.color = "#5eb536";
        FinanceManagerItem[i].children[2].children[1].style.color = "#5eb536";
    }
}

// Custom Select Status
let SelectFinanceStatus = document.querySelector('#select-finance-status');
let SelectFinanceStatusField = SelectFinanceStatus.children[0];
let SelectFinanceStatusItems = SelectFinanceStatus.children[1].children[0];

SelectFinanceStatusField.addEventListener('click', () => {
    if(SelectFinanceStatus.children[1].classList.contains('non-active-select')){
        SelectFinanceStatus.children[1].classList.remove('non-active-select')
        SelectFinanceStatus.children[1].classList.add('active-select')
        SelectFinanceStatus.children[1].style.display = "flex";
    }
    else if(SelectFinanceStatus.children[1].classList.contains('active-select')){
        SelectFinanceStatus.children[1].classList.remove('active-select')
        SelectFinanceStatus.children[1].classList.add('non-active-select')
        SelectFinanceStatus.children[1].style.display = "none";
    }
    for(let i = 0; i < SelectFinanceStatusItems.children.length; i++) {
        SelectFinanceStatusItems.children[i].addEventListener('click', () => {
            SelectFinanceStatusField.children[0].innerHTML = SelectFinanceStatusItems.children[i].children[0].innerHTML;
            SelectFinanceStatus.children[1].style.display = "none";
            if(SelectFinanceStatusField.children[0].innerHTML != "Выберите приоритет"){
                SelectFinanceStatusField.classList.remove('select-field');
                SelectFinanceStatusField.classList.add('select-field-validate');
                SelectFinanceStatus.children[1].classList.remove('active-select')
                SelectFinanceStatus.children[1].classList.add('non-active-select')
            }
            else {
                SelectFinanceStatusField.classList.add('select-field');
                SelectFinanceStatusField.classList.remove('select-field-validate');
            }
        });
    }
});