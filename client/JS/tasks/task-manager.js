let TaskStatus = document.querySelectorAll('.task-manager-item-status');

// Change color depending on importance
for(let i = 0; i < TaskStatus.length; i++){
    if(TaskStatus[i].innerHTML == "Высокий"){
        TaskStatus[i].style.background = "#de4040";
    }
    else if(TaskStatus[i].innerHTML == "Средний"){
        TaskStatus[i].style.background = "#dbd530";
    }
    else if(TaskStatus[i].innerHTML == "Низкий") {
        TaskStatus[i].style.background = "#5eb536";
    }
}

// Custom Select
let SelectTaskPriorety = document.querySelector('#select-task-priorety');
let SelectTaskPrioretyField = SelectTaskPriorety.children[0];
let SelectTaskPrioretySearch = SelectTaskPriorety.children[1].children[0];
let SelectTaskPrioretyItems = SelectTaskPriorety.children[1].children[1];

SelectTaskPrioretyField.addEventListener('click', () => {
    if(SelectTaskPriorety.children[1].classList.contains('non-active-select')){
        SelectTaskPriorety.children[1].classList.remove('non-active-select')
        SelectTaskPriorety.children[1].classList.add('active-select')
        SelectTaskPriorety.children[1].style.display = "flex";
    }
    else if(SelectTaskPriorety.children[1].classList.contains('active-select')){
        SelectTaskPriorety.children[1].classList.remove('active-select')
        SelectTaskPriorety.children[1].classList.add('non-active-select')
        SelectTaskPriorety.children[1].style.display = "none";
    }
    SelectTaskPrioretySearch.children[1].addEventListener('keyup', () => {
        for(let i = 0; i < SelectTaskPrioretyItems.children.length; i++){
            SelectTaskPrioretyItems.children[i].style.display = "none";
        }
        for(let i = 0; i < SelectTaskPrioretyItems.children.length; i++){
            if(SelectTaskPrioretyItems.children[i].children[0].innerHTML.includes(SelectTaskPrioretySearch.children[1].value)){
                SelectTaskPrioretyItems.children[i].style.display = "flex";
            }
        }
    })

    for(let i = 0; i < SelectTaskPrioretyItems.children.length; i++) {
        SelectTaskPrioretyItems.children[i].addEventListener('click', () => {
            SelectTaskPrioretyField.children[0].innerHTML = SelectTaskPrioretyItems.children[i].children[0].innerHTML;
            SelectTaskPriorety.children[1].style.display = "none";
            if(SelectTaskPrioretyField.children[0].innerHTML != "Выберите приоритет"){
                SelectTaskPrioretyField.classList.remove('select-field');
                SelectTaskPrioretyField.classList.add('select-field-validate');
                SelectTaskPriorety.children[1].classList.remove('active-select')
                SelectTaskPriorety.children[1].classList.add('non-active-select')
            }
            else {
                SelectTaskPrioretyField.classList.add('select-field');
                SelectTaskPrioretyField.classList.remove('select-field-validate');
            }
        });
    }
});

// Custom Select
let SelectTaskUser = document.querySelector('#select-task-user');
let SelectTaskUserField = SelectTaskUser.children[0];
let SelectTaskUserSearch = SelectTaskUser.children[1].children[0];
let SelectTaskUserItems = SelectTaskUser.children[1].children[1];

SelectTaskUserField.addEventListener('click', () => {
    if(SelectTaskUser.children[1].classList.contains('non-active-select')){
        SelectTaskUser.children[1].classList.remove('non-active-select')
        SelectTaskUser.children[1].classList.add('active-select')
        SelectTaskUser.children[1].style.display = "flex";
    }
    else if(SelectTaskUser.children[1].classList.contains('active-select')){
        SelectTaskUser.children[1].classList.remove('active-select')
        SelectTaskUser.children[1].classList.add('non-active-select')
        SelectTaskUser.children[1].style.display = "none";
    }
    SelectTaskUserSearch.children[1].addEventListener('keyup', () => {
        for(let i = 0; i < SelectTaskUserItems.children.length; i++){
            SelectTaskUserItems.children[i].style.display = "none";
        }
        for(let i = 0; i < SelectTaskUserItems.children.length; i++){
            if(SelectTaskUserItems.children[i].children[2].innerHTML.includes(SelectTaskUserSearch.children[1].value)){
                SelectTaskUserItems.children[i].style.display = "flex";
            }
        }
    })

    for(let i = 0; i < SelectTaskUserItems.children.length; i++) {
        SelectTaskUserItems.children[i].addEventListener('click', () => {
            SelectTaskUserField.children[2].innerHTML = SelectTaskUserItems.children[i].children[0].innerHTML;
            SelectTaskUserField.children[0].innerHTML = SelectTaskUserItems.children[i].children[2].innerHTML;
            SelectTaskUser.children[1].style.display = "none";
            if(SelectTaskUserField.children[0].innerHTML != "Выберите сотрудника"){
                SelectTaskUserField.classList.remove('select-field');
                SelectTaskUserField.classList.add('select-field-validate');
                SelectTaskUser.children[1].classList.remove('active-select')
                SelectTaskUser.children[1].classList.add('non-active-select')
            }
            else {
                SelectTaskUserField.classList.add('select-field');
                SelectTaskUserField.classList.remove('select-field-validate');
            }
        });
    }
});

// Edit Btn
let TaskManagerEditBtn = document.querySelector('.task-manager-edit-button');
let TaskManagerSaveBtn = document.querySelector('.task-manager-save-button');
let TaskManagerDeleteBtn = document.querySelectorAll('.task-manager-item-title');
let TaskManagerItem = document.querySelectorAll('.task-manager-column-item');
let DeleteTaskDataArr = [];
let DeleteTaskDataObj = {
    DeleteTaskId: null,
    DeleteTaskName: null
}
let DeleteTaskDataJSON;

TaskManagerEditBtn.addEventListener('click', () => {
    TaskManagerSaveBtn.style.display = "flex";
    for(let i = 0; i < TaskManagerDeleteBtn.length; i++) {
        TaskManagerDeleteBtn[i].children[1].style.display = "flex";
    }
    // Delete Tasks
    for(let i = 0; i < TaskManagerDeleteBtn.length; i++) {
        TaskManagerDeleteBtn[i].children[1].addEventListener('click', () => {
            TaskManagerItem[i].style.background = "#E7DAFF";
            if(TaskManagerDeleteBtn[i].children[1].classList.contains("bx-x")){
                TaskManagerDeleteBtn[i].children[1].classList.replace("bx-x", "bx-undo");
            }
            else {
                TaskManagerDeleteBtn[i].children[1].classList.replace("bx-undo", "bx-x");
                TaskManagerItem[i].style.background = "#f1f3f6";
            }
        })
    }
});

// Save Btn
TaskManagerSaveBtn.addEventListener('click', () => {
    DeleteTaskDataArr = [];
    for(let i = 0; i < TaskManagerItem.length; i++){
        if(TaskManagerDeleteBtn[i].children[1].classList.contains("bx-undo")){
            let DeleteTasksDataArr = [];
            DeleteTasksDataArr[0] = TaskManagerItem[i].children[0].children[0].innerHTML;
            DeleteTasksDataArr[1] = TaskManagerItem[i].children[1].children[0].innerHTML;
            DeleteTaskDataArr.push(DeleteTasksDataArr);
            TaskManagerItem[i].style.display = "none";
        }
    }
    // Parse to JSON
    DeleteTaskDataJSON = JSON.stringify(DeleteTaskDataArr);
    // Fetch
    fetch(window.location.href, {
        method: 'DELETE',
        body: DeleteTaskDataJSON,
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
    location.reload();
});

// Finish Task
let TaskManagerFinishBtn = document.querySelectorAll('.task-manager-button-finish');
let TaskManagerItemNeedsReview = document.querySelectorAll('.item-needs-review');
let TaskManagerConfirmWindow = document.querySelector('.confirm-window');
let UpdateTaskDataArr = [];
let UpdateTaskDataObj = {
    UpdateTaskId: null,
    UpdateTaskName: null,
    UpdateTaskStatus: null
}
let UpdateTaskDataJSON;

for(let i = 0; i < TaskManagerFinishBtn.length; i++) {
    TaskManagerFinishBtn[i].addEventListener('click', () => {
        if(TaskManagerConfirmWindow.classList.contains('confirm-window-hidden')){
            TaskManagerConfirmWindow.classList.remove('confirm-window-hidden');
            TaskManagerConfirmWindow.children[1].children[1].addEventListener('click', () => {
                UpdateTaskDataArr[0] = TaskManagerItemNeedsReview[i].children[0].children[0].innerHTML;
                UpdateTaskDataArr[1] = TaskManagerItemNeedsReview[i].children[1].children[0].innerHTML;
                UpdateTaskDataArr[2] = "Done";
                // Parse Array to Object
                for(let i = 0; i < Object.values(UpdateTaskDataObj).length; i++){
                    Object.keys(UpdateTaskDataObj).forEach((value, i) => {
                        UpdateTaskDataObj[value] = UpdateTaskDataArr[i];
                    });
                }
                // Parse to JSON
                UpdateTaskDataJSON = JSON.stringify(UpdateTaskDataObj);
                // Fetch
                fetch('/finishTask', {
                    method: 'PUT',
                    body: UpdateTaskDataJSON,
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
                TaskManagerConfirmWindow.classList.add('confirm-window-hidden');
                location.reload();
            })
            TaskManagerConfirmWindow.children[1].children[0].addEventListener('click', () => {
                TaskManagerConfirmWindow.classList.add('confirm-window-hidden');
                location.reload();
            });
        }
    });
}

// Подробнее
let CheckTextButton = document.querySelectorAll('.check-button-text');
for(let i = 0; i < TaskManagerItem.length; i++){
    CheckTextButton[i].children[0].addEventListener('click', () => {
        function ShowFullText(text) {
            text[i].children[2].style.height = "auto";
            text[i].style.height = "auto";
            text[i].style.minHeight = "300px";
            if(window.innerWidth <= 600){
                text[i].style.minHeight = "320px";
            }
        }

        function ShowShortText(text) {
            text[i].children[2].style.height = "80px";
            text[i].style.height = "auto";
            text[i].style.minHeight = "300px";
            if(window.innerWidth <= 600){
                text[i].style.minHeight = "320px";
            }
        }
        if(CheckTextButton[i].classList.contains('active')){
            CheckTextButton[i].classList.remove('active');
            CheckTextButton[i].children[0].classList.replace("bx-chevron-up", "bx-chevron-down");
            ShowShortText(TaskManagerItem);
        }
        else {
            CheckTextButton[i].classList.add('active')
            ShowFullText(TaskManagerItem);
            CheckTextButton[i].children[0].classList.replace("bx-chevron-down", "bx-chevron-up");
        }
    })
}