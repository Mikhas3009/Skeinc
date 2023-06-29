let UserDataFields = document.querySelectorAll('.profile-information-field-text');
let UserEditBtn = document.querySelector('.profile-information-button-edit');
let UserSaveBtn = document.querySelector('.profile-information-button-save');
let UserLoadFileBtn = document.querySelector('.profile-cart-user-load-file')
let UpdateDataObj = {
    updateUserName: null,
    updateUserEmail: null,
    updateUserPhone: null,
    updateUserAddress: null,
    updateUserPost: null,
    updateUserCard: null
}
let UpdateUserDataJSON;

UserEditBtn.addEventListener('click', ()=>{
    for(let i = 0; i < UserDataFields.length; i++){
        UserDataFields[i].readOnly = false;
        UserDataFields[i].classList.add('edit-profile-input');
        UserSaveBtn.style.display = "flex";
        UserLoadFileBtn.style.display = "flex";
    }
});

UserSaveBtn.addEventListener('click', ()=>{
    for(let i = 0; i < UserDataFields.length; i++){
        UserDataFields[i].readOnly = true;
        UserDataFields[i].classList.remove('edit-profile-input');
        UserSaveBtn.style.display = "none";
        UserLoadFileBtn.style.display = "none";
    }
    for(let i = 0; i < UserDataFields.length; i++){
        Object.keys(UpdateDataObj).forEach((value, i) => {
            UpdateDataObj[value] = UserDataFields[i].value;
        });
    }
    // Парсинг данных в JSON
    UpdateUserDataJSON = JSON.stringify(UpdateDataObj);

    // fetch
    fetch('/personal', {
        method: 'PUT',
        body: UpdateUserDataJSON,
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
})
