let AddProjectForm = document.querySelector('.add-project');
let AddProjectBtn = document.querySelector('.project-manager-header-buttons');
let AddProjectAlertWindow = document.querySelector('.alert-window');
let NewProjectDataArr = [];
let NewProjectDataObj = {
    NewProjectName: null,
    NewProjectDecription: null,
    NewProjectDate: null
}
let NewProjectDataJSON;

AddProjectBtn.children[1].addEventListener('click', () => {
    AddProjectForm.style.display = "flex";
});

AddProjectForm.children[1].children[2].children[0].addEventListener('click', () => {
    if(AddProjectForm.children[1].children[0].children[0].value != '' && AddProjectForm.children[1].children[1].children[0].value != ''){
        NewProjectDataArr[0] = AddProjectForm.children[1].children[0].children[0].value;
        NewProjectDataArr[1] = AddProjectForm.children[1].children[1].children[0].value;
        NewProjectDataArr[2] = Date();
        let CurrentDate = NewProjectDataArr[2].split(" ");
        CurrentDate = CurrentDate[0] + ", " + CurrentDate[1] + " " + CurrentDate[2];
        NewProjectDataArr[2] = CurrentDate;
        // Parse Array to Object
        for(let i = 0; i < Object.values(NewProjectDataObj).length; i++){
            Object.keys(NewProjectDataObj).forEach((value, i) => {
                NewProjectDataObj[value] = NewProjectDataArr[i];
            });
        }
        // Parse to JSON
        NewProjectDataJSON = JSON.stringify(NewProjectDataObj);
        // Fetch
        fetch('/projects', {
            method: 'POST',
            body: NewProjectDataJSON,
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
    }
    else {
        if(AddProjectAlertWindow.classList.contains('alert-window-hidden')){
            AddProjectAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            AddProjectAlertWindow.children[1].children[0].addEventListener('click', () => {
                AddProjectAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            AddProjectAlertWindow.classList.add('alert-window-hidden');
        }
    }
})