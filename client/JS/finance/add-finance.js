let AddFinanceForm = document.querySelector('.add-finance');
let AddFinanceBtn = document.querySelector('.finance-manager-header-buttons');
let AddFinanceAlertWindow = document.querySelector('.alert-window');
let NewFinanceDataArr = [];
let NewFinanceDataObj = {
    NewFinanceName: null,
    NewFinanceCost: null,
    NewFinanceStatus: null,
    NewFinanceDate: null
}
let NewFinanceDataJSON;

AddFinanceBtn.children[1].addEventListener('click', () => {
    AddFinanceForm.style.display = "flex";
});

AddFinanceForm.children[1].children[3].children[0].addEventListener('click', () => {
    if(AddFinanceForm.children[1].children[0].children[0].value != '' && AddFinanceForm.children[1].children[1].children[0].value != '' && SelectFinanceStatus.children[0].classList.contains('select-field-validate')){
        NewFinanceDataArr[0] = AddFinanceForm.children[1].children[0].children[0].value;
        NewFinanceDataArr[1] = AddFinanceForm.children[1].children[1].children[0].value;
        NewFinanceDataArr[2] = AddFinanceForm.children[1].children[2].children[0].children[0].innerHTML;
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1;
        let day = Number(Date().split(' ')[2]);
        year = year + '-';
        if(month.toLocaleString().length == 1) {
            month = '0' + month;
        }
        month = month + '-';
        if(day.toLocaleString().length == 1) {
            day = '0' + day;
        }
        let CurrentDate = year + month + day;
        NewFinanceDataArr[3] = CurrentDate;
        // Parse Array to Object
        for(let i = 0; i < Object.values(NewFinanceDataObj).length; i++){
            Object.keys(NewFinanceDataObj).forEach((value, i) => {
                NewFinanceDataObj[value] = NewFinanceDataArr[i];
            });
        }
        // Parse to JSON
        NewFinanceDataJSON = JSON.stringify(NewFinanceDataObj);

        // Создание новой транзакции на Frontend
        let FinanceManagerItems = document.querySelector('.finance-manager-items');

        function CreateFinanceManagerItem(id, status, name, cost, date) {
            let FinanceItem = document.createElement('div');
            FinanceItem.classList.add('finance-manager-item');

            let FinanceItemId = document.createElement('div');
            FinanceItemId.classList.add('finance-manager-item-id');
            let FinanceItemIdSpan = document.createElement('span');
            FinanceItemId.append(FinanceItemIdSpan);
            FinanceItemId.children[0].innerHTML = id;
            FinanceItem.append(FinanceItemId);

            let FinanceItemStatus = document.createElement('div');
            FinanceItemStatus.classList.add('finance-manager-item-status');
            let FinanceItemStatusSpan = document.createElement('span');
            FinanceItemStatus.append(FinanceItemStatusSpan);
            FinanceItemStatus.children[0].innerHTML = status;
            FinanceItem.append(FinanceItemStatus);

            let FinanceItemCost = document.createElement('div');
            FinanceItemCost.classList.add('finance-manager-item-cost');
            let FinanceItemCostSpan = document.createElement('span');
            FinanceItemCost.append(FinanceItemCostSpan);
            let FinanceItemSpanCost = document.createElement('span');
            FinanceItemSpanCost.classList.add('finance-manager-item-cost-int');
            FinanceItemCost.append(FinanceItemSpanCost);
            FinanceItemCost.children[1].innerHTML = cost;
            if(FinanceItemStatus.children[0].innerHTML == 'Расходы'){
                FinanceItemCost.children[0].innerHTML = '-';
                FinanceItemCost.children[0].style.color = "#de4040";
                FinanceItemCost.children[1].style.color = "#de4040";
            }
            if(FinanceItemStatus.children[0].innerHTML == 'Доходы') {
                FinanceItemCost.children[0].innerHTML = '+';
                FinanceItemCost.children[0].style.color = "#5eb536";
                FinanceItemCost.children[1].style.color = "#5eb536";
            }
            FinanceItem.append(FinanceItemCost);

            let FinanceItemInformation = document.createElement('div');
            FinanceItemInformation.classList.add('finance-manager-item-information');

            let FinanceItemName = document.createElement('div');
            FinanceItemName.classList.add('finance-manager-item-text');
            let FinanceItemNameSpan = document.createElement('span');
            FinanceItemName.append(FinanceItemNameSpan);
            FinanceItemName.children[0].innerHTML = name;
            FinanceItemInformation.append(FinanceItemName);

            let FinanceItemDate = document.createElement('div');
            FinanceItemDate.classList.add('finance-manager-item-date');
            let FinanceItemDateSpan = document.createElement('span');
            FinanceItemDate.append(FinanceItemDateSpan);
            FinanceItemDate.children[0].innerHTML = date;
            FinanceItemInformation.append(FinanceItemDate);

            FinanceItem.append(FinanceItemInformation);

            FinanceManagerItems.append(FinanceItem);
            
        }
        CreateFinanceManagerItem(Math.floor(Math.random() * 10000000), NewFinanceDataArr[2], NewFinanceDataArr[0], NewFinanceDataArr[1], NewFinanceDataArr[3]);

        // Fetch
        fetch('/addTransaction', {
            method: 'POST',
            body: NewFinanceDataJSON,
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
        AddFinanceForm.style.display = "none";
    }
    else {
        if(AddFinanceAlertWindow.classList.contains('alert-window-hidden')){
            AddFinanceAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            AddFinanceAlertWindow.children[1].children[0].addEventListener('click', () => {
                AddFinanceAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            AddFinanceAlertWindow.classList.add('alert-window-hidden');
        }
    }
});