// Получение и подготовка данных
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
// Пользователь нажал на кнопку "Редактировать"
EmployeeProfileEditBtn.addEventListener('click', ()=>{
    for(let i = 0; i < EmployeeProfileDataFields.length; i++){
        EmployeeProfileDataFields[i].readOnly = false;
        EmployeeProfileDataFields[i].classList.add('edit-profile-input');
        EmployeeProfileSaveBtn.style.display = "flex";
        EmployeeProfileLoadFileBtn.style.display = "flex";
    }
});
// Пользователь нажал на кнопку "Сохранить"
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

    let userAddress = EmployeeProfileDataFields[3];
    let userCartAddress = document.querySelector('.profile-cart-user-address');

    userCartAddress.children[0].innerHTML = userAddress.value;

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