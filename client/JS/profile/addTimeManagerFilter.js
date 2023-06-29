let AddTimeManagerFilterBlock = document.querySelector('.add-time-manager-filter');
let AddTimeManagerForm = document.querySelector('.add-time-manager-filter-form');
let AddTimeManagerBtn = document.querySelector('.time-manager-filters-header-buttons');
let AddTimeManagerAlertWindow = document.querySelector('.alert-window');
let ProfileCompanyId = document.querySelector('.profile-cart-company-id');
let NewTimeManagerDataArr = [];
let NewTimeManagerDataObj = {
    TimeManagerFilterName: null,
    TimeManagerFilterCompanyId: null
}
let NewTimeManagerFilterDataJSON;

AddTimeManagerBtn.children[1].addEventListener('click', () => {
    AddTimeManagerFilterBlock.style.display = "flex";
});

AddTimeManagerForm.children[1].children[0].addEventListener('click', () => {
    if(AddTimeManagerForm.children[0].children[0].value != ''){
        NewTimeManagerDataArr[0] = AddTimeManagerForm.children[0].children[0].value;
        NewTimeManagerDataArr[1] = ProfileCompanyId.children[0].innerHTML;
        // Parse Array to Object
        for(let i = 0; i < Object.values(NewTimeManagerDataObj).length; i++){
            Object.keys(NewTimeManagerDataObj).forEach((value, i) => {
                NewTimeManagerDataObj[value] = NewTimeManagerDataArr[i];
            });
        }
        // Parse to JSON
        NewTimeManagerFilterDataJSON = JSON.stringify(NewTimeManagerDataObj);
        // Fetch
        fetch('/addFilter', {
            method: 'POST',
            body: NewTimeManagerFilterDataJSON,
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
         window.location.reload(true);
    }
    else {
        if(AddTimeManagerAlertWindow.classList.contains('alert-window-hidden')){
            AddTimeManagerAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            AddTimeManagerAlertWindow.children[1].children[0].addEventListener('click', () => {
                AddTimeManagerAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            AddTimeManagerAlertWindow.classList.add('alert-window-hidden');
        }
    }
});