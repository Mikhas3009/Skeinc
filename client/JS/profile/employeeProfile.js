let ProfileUserId = document.querySelector('.profile-cart-user-id');
let ProfileCompanyId = document.querySelector('.profile-cart-company-id');
let JobManagerAlertWindow = document.querySelector('.alert-window');
let EmployeeProfileDataFields = document.querySelectorAll('.profile-information-field-text');
let EmployeeProfileEditBtn = document.querySelector('.profile-information-button-edit');
let EmployeeProfileSaveBtn = document.querySelector('.profile-information-button-save');
let EmployeeProfileLoadFileBtn = document.querySelector('.profile-cart-user-load-file')
let EmployeeProfileDataObj = {
    updateEmployeeProfileName: null,
    updateEmployeeProfileEmail: null,
    updateEmployeeProfilePhone: null,
    updateEmployeeProfileAddress: null,
    updateEmployeeProfileCard: null
}
let UpdateEmployeeProfileDataJSON;

EmployeeProfileEditBtn.addEventListener('click', ()=>{
    for(let i = 0; i < EmployeeProfileDataFields.length; i++){
        EmployeeProfileDataFields[i].readOnly = false;
        EmployeeProfileDataFields[i].classList.add('edit-profile-input');
        EmployeeProfileSaveBtn.style.display = "flex";
        EmployeeProfileLoadFileBtn.style.display = "flex";
    }
});

EmployeeProfileSaveBtn.addEventListener('click', ()=>{
    for(let i = 0; i < EmployeeProfileDataFields.length; i++){
        EmployeeProfileDataFields[i].readOnly = true;
        EmployeeProfileDataFields[i].classList.remove('edit-profile-input');
        EmployeeProfileSaveBtn.style.display = "none";
        EmployeeProfileLoadFileBtn.style.display = "none";
    }
    for(let i = 0; i < EmployeeProfileDataFields.length; i++){
        Object.keys(EmployeeProfileDataObj).forEach((value, i) => {
            EmployeeProfileDataObj[value] = EmployeeProfileDataFields[i].value;
        });
    }
    // Парсинг данных в JSON
    UpdateEmployeeProfileDataJSON = JSON.stringify(EmployeeProfileDataObj);

    // fetch
    fetch('/personal', {
        method: 'PUT',
        body: UpdateEmployeeProfileDataJSON,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("Error with sending data to the server occured");
        }
    
       console.log(response.status);
    })
    .catch((err) => {
        console.log(err);
    })
})


// Job-manager
let JobManagerTaskStatus = document.querySelectorAll('.job-manager-task-item-status');

// Change color depending on importance
for(let i = 0; i < JobManagerTaskStatus.length; i++){
    if(JobManagerTaskStatus[i].innerHTML == "Высокий"){
        JobManagerTaskStatus[i].style.background = "#de4040";
    }
    else if(JobManagerTaskStatus[i].innerHTML == "Средний"){
        JobManagerTaskStatus[i].style.background = "#dbd530";
    }
    else if(JobManagerTaskStatus[i].innerHTML == "Низкий") {
        JobManagerTaskStatus[i].style.background = "#5eb536";
    }
}

// Получение данных
let JobManagerStartDayButton = document.querySelector('.job-manager-start-button');
let JobManagerEndDayButton = document.querySelector('.job-manager-end-button');
let JobManagerTaskInProgressBlock = document.querySelector('.job-manager-in-progress-task-items');
let JobManagerTaskUnselectedBlock = document.querySelector('.job-manager-unselected-task-items');

// Сотрудник начал рабочий день
let JobManagerStartDayJSON;
JobManagerStartDayButton.addEventListener('click', () => {
    let JobManagerStartDayArr = [];
    // Подготовка данных к fetch
    let JobManagerStartDayObj = {
        StartDayUserId: null,
        StartDayCompanyId:null,
        StartDayDate: null,
        StartDayTime: null,
        StartDayTitle: null
    }

    function ParseDateTime(year,month,day,time, array) {
        year = year + '-';
        if(month.toLocaleString().length == 1) {
            month = '0' + month;
        }
        month = month + '-';
        if(day.toLocaleString().length == 1) {
            day = '0' + day;
        }
        array[0] = ProfileUserId.children[0].innerHTML;
        array[1] = ProfileCompanyId.children[0].innerHTML;
        array[2] = year + month + day;
        array[3] = time;
        array[4] = "Начал рабочий день"
    }

    let EmployeeStartDayYear = new Date().getFullYear();
    let EmployeeStartDayMonth = new Date().getMonth()+1;
    let EmployeeStartDayDay = Date().split(' ')[2];
    let EmployeeStartDayTime = Date().split(' ')[4];

    ParseDateTime(EmployeeStartDayYear, EmployeeStartDayMonth, EmployeeStartDayDay, EmployeeStartDayTime, JobManagerStartDayArr);

    // Parse Array to Object
    for(let i = 0; i < Object.values(JobManagerStartDayObj).length; i++){
        Object.keys(JobManagerStartDayObj).forEach((value, i) => {
            JobManagerStartDayObj[value] = JobManagerStartDayArr[i];
        });
    }

    // Parse Object to JSON
    JobManagerStartDayJSON =JSON.stringify(JobManagerStartDayObj);
    // fetch
    fetch('/time-manager-start', {
        method: 'POST',
        body: JobManagerStartDayJSON,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            params:"In Progress",
        },
    })
    .then((response) => {
        if(!response.ok) {
            // throw new Error("Error with sending data to the server occured");
        }

        return response.json();
    })
    .then((data) => {
        console.log("Отправленные данные", data)
    })
    .catch((err) => {
        console.log(err);
    })

    // Отображение блоков
    JobManagerEndDayButton.style.display = "flex";
    JobManagerStartDayButton.style.display = "none";
    JobManagerTaskInProgressBlock.style.display = "flex";
    JobManagerTaskUnselectedBlock.style.display = "flex";

    // Проверка на существование задач "В прогрессе"
    if(JobManagerTaskInProgressBlock.children[2].children.length == 0) {
        JobManagerTaskInProgressBlock.children[1].style.display = "flex";
    }
    else {
        JobManagerTaskInProgressBlock.children[1].style.display = "none";
    }

    // Проверка на сущестование задачи "Невыбранные"
    if(JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
        JobManagerTaskUnselectedBlock.children[1].style.display = "flex";
    }
    else {
        JobManagerTaskUnselectedBlock.children[1].style.display = "none";
    }

    // Если тех и других задач нет
    if(JobManagerTaskInProgressBlock.children[2].children.length == 0 && JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
        JobManagerTaskPickBlock.style.display = "flex";
    }
    else {
        JobManagerTaskPickBlock.style.display = "none";
    }
})

// Подготовка данных
let JobManagerTaskUnselectedItems = document.querySelectorAll('.job-manager-task-item-unselected');
let JobManagerTaskInProgressItems = document.querySelectorAll('.job-manager-task-item-in-progress');
let JobManagerTaskArr = [];
let JobManagerTaskUnselectedObj = {
    ToInProgressTaskId: null,
    ToInProgressTaskName: null,
}
let JobManagerTaskInProgressObj = {
    ToNeedsReviewTaskId: null,
    ToNeedsReviewTaskName: null,
}
let JobManagerTimeManagerArr = []
let JobManagerTimeManagerObj = {
    TimeManagerUserId: null,
    TimeManagerCompanyId: null,
    TimeManagerDate: null,
    TimeManagerTime: null,
    TimeManagerTitle: null,
    TimeManagerTaskId: null
}
let JobManagerTimeManagerJSON;
let JobManagerTaskJSON;

// Обработка кнопки "Взять"
for(let i = 0; i < JobManagerTaskUnselectedItems.length; i++) {
    JobManagerTaskUnselectedItems[i].children[5].children[0].addEventListener('click', () => {
        // Тайм-менеджемент
        function ParseDateTime(year,month,day,time, array) {
            year = year + '-';
            if(month.toLocaleString().length == 1) {
                month = '0' + month;
            }
            month = month + '-';
            if(day.toLocaleString().length == 1) {
                day = '0' + day;
            }
            array[0] = ProfileUserId.children[0].innerHTML;
            array[1] = ProfileCompanyId.children[0].innerHTML;
            array[2] = year + month + day;
            array[3] = time;
            array[4] = "Начал выполнение задачи: " + JobManagerTaskUnselectedItems[i].children[1].children[0].innerHTML;
            array[5] = JobManagerTaskUnselectedItems[i].children[0].children[0].innerHTML
        }
    
        let JobManagerTimeManagerYear = new Date().getFullYear();
        let JobManagerTimeManagerMonth = new Date().getMonth()+1;
        let JobManagerTimeManagerDay = Date().split(' ')[2];
        let JobManagerTimeManagerTime = Date().split(' ')[4];
    
        ParseDateTime(JobManagerTimeManagerYear, JobManagerTimeManagerMonth, JobManagerTimeManagerDay, JobManagerTimeManagerTime, JobManagerTimeManagerArr);

        // Parse Array to Object
        for(let i = 0; i < Object.values(JobManagerTimeManagerObj).length; i++){
            Object.keys(JobManagerTimeManagerObj).forEach((value, i) => {
                JobManagerTimeManagerObj[value] = JobManagerTimeManagerArr[i];
            });
        }

        // Parse Object to JSON
        JobManagerTimeManagerJSON = JSON.stringify(JobManagerTimeManagerObj);

        // fetch
        fetch('/time-manager-accept', {
            method: 'POST',
            params: "In Progress",
            body: JobManagerTimeManagerJSON,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                params:"In Progress",
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

        // Изменение статуса задачи
        JobManagerTaskArr[0] = JobManagerTaskUnselectedItems[i].children[0].children[0].innerHTML;
        JobManagerTaskArr[1] = JobManagerTaskUnselectedItems[i].children[1].children[0].innerHTML;

        // Parse Array to Object
        for(let i = 0; i < Object.values(JobManagerTaskUnselectedObj).length; i++){
            Object.keys(JobManagerTaskUnselectedObj).forEach((value, i) => {
                JobManagerTaskUnselectedObj[value] = JobManagerTaskArr[i];
            });
        }

        // Parse Object to JSON
        JobManagerTaskJSON = JSON.stringify(JobManagerTaskUnselectedObj);

        // fetch
        fetch('/update-task', {
            method: 'POST',
            body: JobManagerTaskJSON,
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

        let JobManagerCopyItem = JobManagerTaskUnselectedItems[i].cloneNode(true);
        JobManagerCopyItem.classList.replace('job-manager-task-item-unselected', 'job-manager-task-item-in-progress');
        JobManagerCopyItem.children[5].children[0].innerHTML = "На проверку";
        JobManagerTaskInProgressBlock.children[2].append(JobManagerCopyItem);
        JobManagerTaskUnselectedItems[i].parentElement.removeChild(JobManagerTaskUnselectedItems[i]);

        // Обновление страницы
       // window.location.reload(true);

        // Проверка на сущестование задачи "Невыбранные"
        if(JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
            JobManagerTaskUnselectedBlock.children[1].style.display = "flex";
        }
        else {
            JobManagerTaskUnselectedBlock.children[1].style.display = "none";
        }
        // Если тех и других задач нет
        if(JobManagerTaskInProgressBlock.children[2].children.length == 0 && JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
            JobManagerTaskPickBlock.style.display = "flex";
        }
        else {
            JobManagerTaskPickBlock.style.display = "none";
        }
    })
}

// Обработка кнопки "на проверку"
for(let i = 0; i < JobManagerTaskInProgressItems.length; i++) {
    JobManagerTaskInProgressItems[i].children[5].children[0].addEventListener('click', () => {
        // Тайм-менеджемент
        function ParseDateTime(year,month,day,time, array) {
            year = year + '-';
            if(month.toLocaleString().length == 1) {
                month = '0' + month;
            }
            month = month + '-';
            if(day.toLocaleString().length == 1) {
                day = '0' + day;
            }
            array[0] = ProfileUserId.children[0].innerHTML;
            array[1] = ProfileCompanyId.children[0].innerHTML;
            array[2] = year + month + day;
            array[3] = time;
            array[4] = "Отправил на проверку задачу:  " + JobManagerTaskInProgressItems[i].children[1].children[0].innerHTML;
            array[5] = JobManagerTaskInProgressItems[i].children[0].children[0].innerHTML
        }
    
        let JobManagerTimeManagerYear = new Date().getFullYear();
        let JobManagerTimeManagerMonth = new Date().getMonth()+1;
        let JobManagerTimeManagerDay = Date().split(' ')[2];
        let JobManagerTimeManagerTime = Date().split(' ')[4];
    
        ParseDateTime(JobManagerTimeManagerYear, JobManagerTimeManagerMonth, JobManagerTimeManagerDay, JobManagerTimeManagerTime, JobManagerTimeManagerArr);

        // Parse Array to Object
        for(let i = 0; i < Object.values(JobManagerTimeManagerObj).length; i++){
            Object.keys(JobManagerTimeManagerObj).forEach((value, i) => {
                JobManagerTimeManagerObj[value] = JobManagerTimeManagerArr[i];
            });
        }

        // Parse Object to JSON
        JobManagerTimeManagerJSON = JSON.stringify(JobManagerTimeManagerObj);

        // fetch
        fetch('/time-manager-check', {
            method: 'POST',
            params: "Needs Rewiew",
            body: JobManagerTimeManagerJSON,
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

        // Изменение статуса задачи
        JobManagerTaskArr[0] = JobManagerTaskInProgressItems[i].children[0].children[0].innerHTML;
        JobManagerTaskArr[1] = JobManagerTaskInProgressItems[i].children[1].children[0].innerHTML;

        // Parse Array to Object
        for(let i = 0; i < Object.values(JobManagerTaskInProgressObj).length; i++){
            Object.keys(JobManagerTaskInProgressObj).forEach((value, i) => {
                JobManagerTaskInProgressObj[value] = JobManagerTaskArr[i];
            });
        }

        // Parse Object to JSON
        JobManagerTaskJSON = JSON.stringify(JobManagerTaskInProgressObj);

        // fetch
        fetch('/update-task', {
            method: 'PUT',
            body: JobManagerTaskJSON,
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

        JobManagerTaskInProgressItems[i].parentElement.removeChild(JobManagerTaskInProgressItems[i]);

        // Проверка на существование задач "В прогрессе"
        if(JobManagerTaskInProgressBlock.children[2].children.length == 0) {
            JobManagerTaskInProgressBlock.children[1].style.display = "flex";
        }
        else {
            JobManagerTaskInProgressBlock.children[1].style.display = "none";
        }
        // Если тех и других задач нет
        if(JobManagerTaskInProgressBlock.children[2].children.length == 0 && JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
            JobManagerTaskPickBlock.style.display = "flex";
        }
        else {
            JobManagerTaskPickBlock.style.display = "none";
        }
    })
}

// Выбор собственной задачи
let JobManagerTaskPickBlock = document.querySelector('.job-manager-pick-task');
let JobManagerTaskPickInput = document.querySelector('.pick-task-input');
let SelectJobManagerTaskPick = document.querySelector('#select-job-manager-pick-task');
let SelectJobManagerTaskPickField = SelectJobManagerTaskPick.children[0];
let SelectJobManagerTaskPickItems = SelectJobManagerTaskPick.children[1].children[0];

SelectJobManagerTaskPickField.addEventListener('click', () => {
    if(SelectJobManagerTaskPick.children[1].classList.contains('non-active-select')){
        SelectJobManagerTaskPick.children[1].classList.remove('non-active-select')
        SelectJobManagerTaskPick.children[1].classList.add('active-select')
        SelectJobManagerTaskPick.children[1].style.display = "flex";
    }
    else if(SelectJobManagerTaskPick.children[1].classList.contains('active-select')){
        SelectJobManagerTaskPick.children[1].classList.remove('active-select')
        SelectJobManagerTaskPick.children[1].classList.add('non-active-select')
        SelectJobManagerTaskPick.children[1].style.display = "none";
    }
    for(let i = 0; i < SelectJobManagerTaskPickItems.children.length; i++) {
        SelectJobManagerTaskPickItems.children[i].addEventListener('click', () => {
            SelectJobManagerTaskPickField.children[0].innerHTML = SelectJobManagerTaskPickItems.children[i].children[0].innerHTML;
            SelectJobManagerTaskPick.children[1].style.display = "none";
            if(SelectJobManagerTaskPickField.children[0].innerHTML != "Выберите задачу"){
                SelectJobManagerTaskPickField.classList.remove('select-field');
                SelectJobManagerTaskPickField.classList.add('select-field-validate');
                SelectJobManagerTaskPick.children[1].classList.remove('active-select')
                SelectJobManagerTaskPick.children[1].classList.add('non-active-select')
            }
            else {
                SelectJobManagerTaskPickField.classList.add('select-field');
                SelectJobManagerTaskPickField.classList.remove('select-field-validate');
            }
            if(SelectJobManagerTaskPickField.children[0].innerHTML == "Другое") {
                JobManagerTaskPickInput.style.display = "flex";
            }
            else {
                JobManagerTaskPickInput.style.display = "none";
            }
        });
    }
});

// Если сотрудник выбрал собственную задачу
let JobManagerPickTaskButton = document.querySelector('.job-manager-pick-task-button');

JobManagerPickTaskButton.addEventListener('click', () => {
    if(SelectJobManagerTaskPickField.children[0].innerHTML == "Выберите задачу"){
        if(JobManagerAlertWindow.classList.contains('alert-window-hidden')){
            JobManagerAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            JobManagerAlertWindow.children[1].children[0].addEventListener('click', () => {
                JobManagerAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            JobManagerAlertWindow.classList.add('alert-window-hidden');
        }
    }
    else {
        if(SelectJobManagerTaskPickField.children[0].innerHTML == "Другое") {
            if(JobManagerTaskPickInput.children[0].value == ""){
                if(JobManagerAlertWindow.classList.contains('alert-window-hidden')){
                    JobManagerAlertWindow.classList.remove('alert-window-hidden');
                    window.location.href = "#alert-window";
                    JobManagerAlertWindow.children[1].children[0].addEventListener('click', () => {
                        JobManagerAlertWindow.classList.add('alert-window-hidden');
                    });
                }
                else {
                    JobManagerAlertWindow.classList.add('alert-window-hidden');
                }
            }
            else {
                // Тайм-менеджемент
                function ParseDateTime(year,month,day,time, array) {
                    year = year + '-';
                    if(month.toLocaleString().length == 1) {
                        month = '0' + month;
                    }
                    month = month + '-';
                    if(day.toLocaleString().length == 1) {
                        day = '0' + day;
                    }
                    array[0] = ProfileUserId.children[0].innerHTML;
                    array[1] = ProfileCompanyId.children[0].innerHTML;
                    array[2] = year + month + day;
                    array[3] = time;
                    array[4] = "Начал выполнение задачи: " + JobManagerTaskPickInput.children[0].value;
                    array[5] = null;
                }
            
                let JobManagerTimeManagerYear = new Date().getFullYear();
                let JobManagerTimeManagerMonth = new Date().getMonth()+1;
                let JobManagerTimeManagerDay = Date().split(' ')[2];
                let JobManagerTimeManagerTime = Date().split(' ')[4];
            
                ParseDateTime(JobManagerTimeManagerYear, JobManagerTimeManagerMonth, JobManagerTimeManagerDay, JobManagerTimeManagerTime, JobManagerTimeManagerArr);

                // Parse Array to Object
                for(let i = 0; i < Object.values(JobManagerTimeManagerObj).length; i++){
                    Object.keys(JobManagerTimeManagerObj).forEach((value, i) => {
                        JobManagerTimeManagerObj[value] = JobManagerTimeManagerArr[i];
                    });
                }

                // Parse Object to JSON
                JobManagerTimeManagerJSON = JSON.stringify(JobManagerTimeManagerObj);

                // fetch
                fetch('/time-manager-custom-task', {
                    method: 'POST',
                    body: JobManagerTimeManagerJSON,
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
            }
        }
        else {
            // Тайм-менеджемент
            function ParseDateTime(year,month,day,time, array) {
                year = year + '-';
                if(month.toLocaleString().length == 1) {
                    month = '0' + month;
                }
                month = month + '-';
                if(day.toLocaleString().length == 1) {
                    day = '0' + day;
                }
                array[0] = ProfileUserId.children[0].innerHTML;
                array[1] = ProfileCompanyId.children[0].innerHTML;
                array[2] = year + month + day;
                array[3] = time;
                array[4] = "Начал выполнение задачи: " + SelectJobManagerTaskPickField.children[0].innerHTML;
                array[5] = null;
            }
        
            let JobManagerTimeManagerYear = new Date().getFullYear();
            let JobManagerTimeManagerMonth = new Date().getMonth()+1;
            let JobManagerTimeManagerDay = Date().split(' ')[2];
            let JobManagerTimeManagerTime = Date().split(' ')[4];
        
            ParseDateTime(JobManagerTimeManagerYear, JobManagerTimeManagerMonth, JobManagerTimeManagerDay, JobManagerTimeManagerTime, JobManagerTimeManagerArr);
            // Parse Array to Object
            for(let i = 0; i < Object.values(JobManagerTimeManagerObj).length; i++){
                Object.keys(JobManagerTimeManagerObj).forEach((value, i) => {
                    JobManagerTimeManagerObj[value] = JobManagerTimeManagerArr[i];
                });
            }

            // Parse Object to JSON
            JobManagerTimeManagerJSON = JSON.stringify(JobManagerTimeManagerObj);

            // fetch
            fetch('/time-manager-custom-task', {
                method: 'POST',
                body: JobManagerTimeManagerJSON,
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
        }
    }
    JobManagerPickTaskButton.style.display = "none";
    JobManagerFinishTaskButton.style.display = "flex";
})

// Если сотрудник закончил собственную задачу
let JobManagerFinishTaskButton = document.querySelector('.job-manager-finish-task-button');

JobManagerFinishTaskButton.addEventListener('click',async() => {

    function ParseDateTime(year,month,day,time, array) {
        year = year + '-';
        if(month.toLocaleString().length == 1) {
            month = '0' + month;
        }
        month = month + '-';
        if(day.toLocaleString().length == 1) {
            day = '0' + day;
        }
        array[0] = ProfileUserId.children[0].innerHTML;
        array[1] = ProfileCompanyId.children[0].innerHTML;
        array[2] = year + month + day;
        array[3] = time;
        array[4] = "Закончил выполнение задачи: " + SelectJobManagerTaskPickField.children[0].innerHTML;
        array[5] = null;
    }

    let JobManagerTimeManagerYear = new Date().getFullYear();
    let JobManagerTimeManagerMonth = new Date().getMonth()+1;
    let JobManagerTimeManagerDay = Date().split(' ')[2];
    let JobManagerTimeManagerTime = Date().split(' ')[4];

    ParseDateTime(JobManagerTimeManagerYear, JobManagerTimeManagerMonth, JobManagerTimeManagerDay, JobManagerTimeManagerTime, JobManagerTimeManagerArr);
    
    // Parse Array to Object
    for(let i = 0; i < Object.values(JobManagerTimeManagerObj).length; i++){
        Object.keys(JobManagerTimeManagerObj).forEach((value, i) => {
            JobManagerTimeManagerObj[value] = JobManagerTimeManagerArr[i];
        });
    }

    // Parse Object to JSON
    JobManagerTimeManagerJSON = JSON.stringify(JobManagerTimeManagerObj);

    // fetch
    fetch('/time-manager-custom-task', {
        method: 'POST',
        body: JobManagerTimeManagerJSON,
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
    await fetch('/end-time-manager-custom-task');//удаление куки с кастомной задачей
    JobManagerPickTaskButton.style.display = "flex";
    JobManagerFinishTaskButton.style.display = "none";
    SelectJobManagerTaskPickField.children[0].innerHTML = "Выберите задачу";
    SelectJobManagerTaskPickField.classList.add('select-field');
    SelectJobManagerTaskPickField.classList.remove('select-field-validate');
})


// Сотрудник завершил рабочий день
let JobManagerEndDayJSON;
JobManagerEndDayButton.addEventListener('click', () => {
    let JobManagerEndDayArr = [];
    // Подготовка данных к fetch
    let JobManagerEndDayObj = {
        EndDayUserId: null,
        EndDayCompanyId:null,
        EndDayDate: null,
        EndDayTime: null,
        EndDayTitle: null
    }

    function ParseDateTime(year,month,day,time, array) {
        year = year + '-';
        if(month.toLocaleString().length == 1) {
            month = '0' + month;
        }
        month = month + '-';
        if(day.toLocaleString().length == 1) {
            day = '0' + day;
        }
        array[0] = ProfileUserId.children[0].innerHTML;
        array[1] = ProfileCompanyId.children[0].innerHTML;
        array[2] = year + month + day;
        array[3] = time;
        array[4] = "Закончил рабочий день"
    }

    let EmployeeEndDayYear = new Date().getFullYear();
    let EmployeeEndDayMonth = new Date().getMonth()+1;
    let EmployeeEndDayDay = Date().split(' ')[2];
    let EmployeeEndDayTime = Date().split(' ')[4];

    ParseDateTime(EmployeeEndDayYear, EmployeeEndDayMonth, EmployeeEndDayDay, EmployeeEndDayTime, JobManagerEndDayArr);

    // Parse Array to Object
    for(let i = 0; i < Object.values(JobManagerEndDayObj).length; i++){
        Object.keys(JobManagerEndDayObj).forEach((value, i) => {
            JobManagerEndDayObj[value] = JobManagerEndDayArr[i];
        });
    }

    // Parse Object to JSON
    JobManagerEndDayJSON = JSON.stringify(JobManagerEndDayObj);
    // fetch
    fetch('/time-manager-end', {
        method: 'POST',
        body: JobManagerEndDayJSON,
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

    // Закрытие блоков
    JobManagerEndDayButton.style.display = "none";
    JobManagerStartDayButton.style.display = "flex";
    JobManagerTaskInProgressBlock.style.display = "none";
    JobManagerTaskUnselectedBlock.style.display = "none";
})

// Если сотрудник не завершил рабочий день и хочет выйти с аккаунта
let ProfileLogoutBtn = document.querySelector('.profile-cart-user-button');
ProfileLogoutBtn = ProfileLogoutBtn.children[0].children[0];

ProfileLogoutBtn.addEventListener('click', () => {
    if(JobManagerEndDayButton.style.display == "flex"){
        if(JobManagerAlertWindow.classList.contains('alert-window-hidden')){
            JobManagerAlertWindow.classList.remove('alert-window-hidden');
            JobManagerAlertWindow.children[0].children[0].innerHTML = "Выйдите с аккаунта!"
            window.location.href = "#alert-window";
            JobManagerAlertWindow.children[1].children[0].addEventListener('click', () => {
                JobManagerAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            JobManagerAlertWindow.classList.add('alert-window-hidden');
        }
    }
    else {
        JobManagerAlertWindow.children[0].children[0].innerHTML = "Заполните данные"
    }
})