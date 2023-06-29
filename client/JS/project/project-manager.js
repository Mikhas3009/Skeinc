let ProjectManagerConfirmWindow = document.querySelector('.confirm-window');
let ProjectManagerItems = document.querySelectorAll('.project-manager-item');
let CheckTextButton = document.querySelectorAll('.check-button-text');
let ProjectDeleteDataArr = [];
let ProjectDeleteDataObj = {
    DeletedIdProject: null,
    DeletedNameProject: null
}
let DeletedProjectDataJSON;

// Finish project
for(let i = 0; i < ProjectManagerItems.length; i++){
    ProjectManagerItems[i].children[5].children[1].addEventListener('click', () => {
        if(ProjectManagerConfirmWindow.classList.contains('confirm-window-hidden')){
            ProjectManagerConfirmWindow.classList.remove('confirm-window-hidden');
            ProjectManagerConfirmWindow.children[1].children[1].addEventListener('click', () => {
                ProjectManagerItems[i].style.display = "none";
                ProjectDeleteDataArr[0] = ProjectManagerItems[i].children[0].children[0].innerHTML;
                ProjectDeleteDataArr[1] = ProjectManagerItems[i].children[1].children[0].innerHTML;
                // Parse Array to Object
                for(let i = 0; i < Object.values(ProjectDeleteDataObj).length; i++){
                    Object.keys(ProjectDeleteDataObj).forEach((value, i) => {
                        ProjectDeleteDataObj[value] = ProjectDeleteDataArr[i];
                    });
                }
                // Parse to JSON
                DeletedProjectDataJSON = JSON.stringify(ProjectDeleteDataObj);
                // fetch
                fetch('/projects', {
                    method: 'DELETE',
                    body: DeletedProjectDataJSON,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => {
                    if(!response.ok) {
                        throw new Error("Error with sending data to the server occured");
                    }
                    if(response.status==200){
                        window.location.href='/projects'
                    }
                
                    return response.json();
                })
                .then((data) => {
                    console.log("Отправленные данные", data)
                })
                .catch((err) => {
                    console.log(err);
                })

                ProjectManagerConfirmWindow.classList.add('confirm-window-hidden');
                location.reload();
            });

            ProjectManagerConfirmWindow.children[1].children[0].addEventListener('click', () => {
                ProjectManagerConfirmWindow.classList.add('confirm-window-hidden');
                location.reload();
            });
        }
    });
    // Подробнее
    CheckTextButton[i].children[0].addEventListener('click', () => {
        function ShowFullText(text) {
            text[i].children[2].style.height = "auto";
            text[i].style.height = "auto";
            text[i].style.minHeight = "220px";
            if(window.innerWidth <= 600){
                text[i].style.minHeight = "400px";
            }
        }

        function ShowShortText(text) {
            text[i].children[2].style.height = "80px";
            text[i].style.height = "220px";
            text[i].style.minHeight = "220px";
            if(window.innerWidth <= 600){
                text[i].style.minHeight = "400px";
            }
        }
        if(CheckTextButton[i].classList.contains('active')){
            CheckTextButton[i].classList.remove('active');
            CheckTextButton[i].children[0].classList.replace("bx-chevron-up", "bx-chevron-down");
            ShowShortText(ProjectManagerItems);
        }
        else {
            CheckTextButton[i].classList.add('active')
            ShowFullText(ProjectManagerItems);
            CheckTextButton[i].children[0].classList.replace("bx-chevron-down", "bx-chevron-up");
        }
    })
}