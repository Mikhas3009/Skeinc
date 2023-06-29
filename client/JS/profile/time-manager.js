// Получение данных
let TimeManagerFilterSaveButton = document.querySelector('.time-manager-filters-button-save');
let TimeManagerFilterEditButton = document.querySelector('.time-manager-filters-button-edit');
let TimeManagerFilterItems = document.querySelector('.time-manager-filters-items');
let TimeManagerFilterItemsEmpty = document.querySelector('.time-manager-filters-empty');

// Вывод сообщения если категории не выбраны
if(TimeManagerFilterItems.children.length == 0) {
    TimeManagerFilterItemsEmpty.style.display = "flex";
    TimeManagerFilterItems.style.padding = "0px";
    TimeManagerFilterEditButton.style.display = "none";
    TimeManagerFilterSaveButton.style.display = "none";
}
else {
    TimeManagerFilterItemsEmpty.style.display = "none";
    TimeManagerFilterItems.style.padding = "20px";
    TimeManagerFilterEditButton.style.display = "flex";
}

// Клик по кнопке "Редактировать"
TimeManagerFilterEditButton.addEventListener('click', () => {
    TimeManagerDeleteDataJSON = '';
    TimeManagerDeleteDataArr = [];
    for(let i = 0; i < TimeManagerFilterItems.children.length; i++){
        TimeManagerFilterItems.children[i].children[1].style.display = "flex";
    }
    TimeManagerFilterEditButton.style.display = "none";
    TimeManagerFilterSaveButton.style.display = "flex";
})

// Клик по иконке "Удалить"
for(let i = 0; i < TimeManagerFilterItems.children.length; i++){
    TimeManagerFilterItems.children[i].children[1].addEventListener('click', () => {
        if(TimeManagerFilterItems.children[i].classList.contains('deleted-filter')){
            TimeManagerFilterItems.children[i].classList.remove('deleted-filter');
            TimeManagerFilterItems.children[i].children[1].classList.replace('bx-undo', 'bx-x');
            TimeManagerFilterItems.children[i].style.background = "#f1f3f6";
        }
        else {
            TimeManagerFilterItems.children[i].classList.add('deleted-filter');
            TimeManagerFilterItems.children[i].children[1].classList.replace('bx-x', 'bx-undo');
            TimeManagerFilterItems.children[i].style.background = "silver";
        }
    })
}

// Нажатие на кнопку "Сохранить"
let TimeManagerDeleteDataArr = [];
let TimeManagerDeleteDataJSON;

TimeManagerFilterSaveButton.addEventListener('click', () => {
    TimeManagerDeleteDataArr = [];
    for(let i = 0; i < TimeManagerFilterItems.children.length; i++) {
        let TimeManagerDeleteDataItemArr = [];
        
        if(TimeManagerFilterItems.children[i].classList.contains('deleted-filter')){
            TimeManagerDeleteDataItemArr[0] = TimeManagerFilterItems.children[i].children[0].innerHTML;
            TimeManagerDeleteDataItemArr[1] = TimeManagerFilterItems.children[i].children[2].innerHTML;
            TimeManagerDeleteDataItemArr[2] = ProfileCompanyId.children[0].innerHTML;

            let TimeManagerDeleteDataObj = {
                TimeManagerFilterId: null,
                TimeManagerFilterName: null,
                TimeManagerCompanyId: null
            }
    
            // Parse Array to Object
            for(let i = 0; i < Object.values(TimeManagerDeleteDataObj).length; i++){
                Object.keys(TimeManagerDeleteDataObj).forEach((value, i) => {
                    TimeManagerDeleteDataObj[value] = TimeManagerDeleteDataItemArr[i];
                });
            }
    
            TimeManagerDeleteDataArr.push(TimeManagerDeleteDataObj);
        }
    }

    for(let i = 0; i < TimeManagerFilterItems.children.length; i++) {
        if(TimeManagerFilterItems.children[i].classList.contains('deleted-filter')){
            TimeManagerFilterItems.children[i].style.display = "none";
            TimeManagerFilterItems.children[i].classList.remove('deleted-filter');
        }
        else {
            TimeManagerFilterItems.children[i].children[1].classList.replace('bx-undo', 'bx-x');
            TimeManagerFilterItems.children[i].children[1].style.display = "none";
            TimeManagerFilterItems.children[i].style.background = "#f1f3f6";
        }
    }

    // Parse Array to JSON
    TimeManagerDeleteDataJSON = JSON.stringify(TimeManagerDeleteDataArr);

    // fetch
    fetch('deleteFilter', {
        method: 'DELETE',
        body: TimeManagerDeleteDataJSON,
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

    TimeManagerFilterEditButton.style.display = "flex";
    TimeManagerFilterSaveButton.style.display = "none";

    let hiddenItems = 0;

    for(let i = 0; i < TimeManagerFilterItems.children.length; i++) {
        if(TimeManagerFilterItems.children[i].style.display == "none"){
            hiddenItems += 1;
        }
    }

    if(hiddenItems == TimeManagerFilterItems.children.length) {
        TimeManagerFilterItemsEmpty.style.display = "flex";
        TimeManagerFilterItems.style.padding = "0px";
        TimeManagerFilterEditButton.style.display = "none";
        TimeManagerFilterSaveButton.style.display = "none";
    }
    else {
        TimeManagerFilterItemsEmpty.style.display = "none";
        TimeManagerFilterItems.style.padding = "20px";
        TimeManagerFilterEditButton.style.display = "flex";
    }
})