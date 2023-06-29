let AddNewsForm = document.querySelector('.add-news');
let AddNewsBtn = document.querySelector('.news-manager-header-buttons');
let AddNewsAlertWindow = document.querySelector('.alert-window');
let NewNewsDataArr = [];
let NewNewsDataObj = {
    NewNewsName: null,
    NewNewsDecription: null,
    NewNewsDate: null
}
let NewNewsDataJSON;

AddNewsBtn.children[1].addEventListener('click', () => {
    AddNewsForm.style.display = "flex";
});

AddNewsForm.children[1].children[2].children[0].addEventListener('click', () => {
    if(AddNewsForm.children[1].children[0].children[0].value != '' && AddNewsForm.children[1].children[1].children[0].value != ''){
        NewNewsDataArr[0] = AddNewsForm.children[1].children[0].children[0].value;
        NewNewsDataArr[1] = AddNewsForm.children[1].children[1].children[0].value;
        NewNewsDataArr[2] = Date();
        let CurrentDate = NewNewsDataArr[2].split(" ");
        CurrentDate = CurrentDate[0] + ", " + CurrentDate[1] + " " + CurrentDate[2];
        NewNewsDataArr[2] = CurrentDate;
        console.log(NewNewsDataArr);
        // Parse Array to Object
        for(let i = 0; i < Object.values(NewNewsDataObj).length; i++){
            Object.keys(NewNewsDataObj).forEach((value, i) => {
                NewNewsDataObj[value] = NewNewsDataArr[i];
            });
        }
        // Parse to JSON
        NewNewsDataJSON = JSON.stringify(NewNewsDataObj);
        // Fetch
        fetch('/addNews', {
            method: 'POST',
            body: NewNewsDataJSON,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(NewNewsDataObj)
            if(!response.ok) {
                throw new Error("Error with sending data to the server occured");
            }
        
            return response.json();
        })
        .then((data) => {
            console.log("Отправленные данные", data);
            window.location.href='/news';
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else {
        if(AddNewsAlertWindow.classList.contains('alert-window-hidden')){
            AddNewsAlertWindow.classList.remove('alert-window-hidden');
            window.location.href = "#alert-window";
            AddNewsAlertWindow.children[1].children[0].addEventListener('click', () => {
                AddNewsAlertWindow.classList.add('alert-window-hidden');
            });
        }
        else {
            AddNewsAlertWindow.classList.add('alert-window-hidden');
        }
    }
})