let AddTaskForm = document.querySelector('.add-task');
let AddTaskBtn = document.querySelector('.task-manager-header-buttons');
let AddTaskAlertWindow = document.querySelector('.alert-window');
let NewTaskDataArr = [];
let NewTaskDataObj = {
    NewTaskUserId:null,
    NewTaskName: null,
    NewTaskDescription: null,
    NewTaskDate: null,
    NewTaskPriority: null,
    NewTaskUser: null,
}
let NewTaskDataJSON;

AddTaskBtn.children[1].addEventListener('click', () => {
    AddTaskForm.style.display = "flex";
});

AddTaskForm.children[1].children[4].children[0].addEventListener('click', () => {
    if(AddTaskForm.children[1].children[0].children[0].value != '' && AddTaskForm.children[1].children[1].children[0].value != '' && SelectTaskUserField.classList.contains('select-field-validate') && SelectTaskPrioretyField.classList.contains('select-field-validate')){
        NewTaskDataArr[0] = AddTaskForm.children[1].children[3].children[0].children[2].innerHTML
        NewTaskDataArr[1] = AddTaskForm.children[1].children[0].children[0].value;
        NewTaskDataArr[2] = AddTaskForm.children[1].children[1].children[0].value;
        NewTaskDataArr[3] = Date();
        let CurrentDate = NewTaskDataArr[3].split(" ");
        CurrentDate = CurrentDate[0] + ", " + CurrentDate[1] + " " + CurrentDate[2];
        NewTaskDataArr[3] = CurrentDate;
        NewTaskDataArr[4] = AddTaskForm.children[1].children[2].children[0].children[0].innerHTML;
        NewTaskDataArr[5] = AddTaskForm.children[1].children[3].children[0].children[0].innerHTML;
        // Parse Array to Object
        for(let i = 0; i < Object.values(NewTaskDataObj).length; i++){
            Object.keys(NewTaskDataObj).forEach((value, i) => {
                NewTaskDataObj[value] = NewTaskDataArr[i];
            });
        }
        // Parse to JSON
        NewTaskDataJSON = JSON.stringify(NewTaskDataObj);
        // Fetch
        fetch(window.location.href, {
            method: 'POST',
            body: NewTaskDataJSON,
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
            location.reload();
        })
        .catch((err) => {
            console.log(err);
            location.reload();
        })
    }
    else {
        if(AddTaskAlertWindow.classList.contains('alert-window-hidden')){
            AddTaskAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            AddTaskAlertWindow.children[1].children[0].addEventListener('click', () => {
                AddTaskAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            AddTaskAlertWindow.classList.add('alert-window-hidden');
        }
    }
});