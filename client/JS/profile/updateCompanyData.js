let CompanyDataFields = document.querySelectorAll('.company-manager-item-input');
let CompanyEditBtn = document.querySelectorAll('.company-manager-change-data');
let CompanySaveBtn = document.querySelector('.company-manager-button-save');
let UpdateCompanyDataObj = {
    updateCompanyName: null,
    updateCompanyAddress: null,
    updateCompanyPhone: null,
    updateCompanyEmail: null
}
let UpdateCompanyDataJSON;
let UserCompanyName = document.querySelector('.profile-job-text');

for(let i = 0; i < CompanyEditBtn.length; i++) {
    CompanyEditBtn[i].addEventListener('click', ()=>{
        CompanyDataFields[i].readOnly = false;
        CompanyDataFields[i].style.color = "#111111"
    });
}

CompanySaveBtn.addEventListener('click', ()=>{
    UserCompanyName.innerHTML = CompanyDataFields[0].value;
    for(let i = 0; i < CompanyDataFields.length; i++){
        CompanyDataFields[i].readOnly = true;
        CompanyDataFields[i].style.color = "#434343";
    }
    for(let i = 0; i < CompanyDataFields.length; i++){
        Object.keys(UpdateCompanyDataObj).forEach((value, i) => {
            UpdateCompanyDataObj[value] = CompanyDataFields[i].value;
        });
    }
    // Парсинг данных в JSON
    UpdateCompanyDataJSON = JSON.stringify(UpdateCompanyDataObj);

    // fetch
    fetch('/updateCompnayData', {
        method: 'PUT',
        body: UpdateCompanyDataJSON,
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
});