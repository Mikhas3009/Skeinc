let ChangeDataButtons = document.querySelectorAll('.employee-manager-dashboard-change-data');
let employees = document.querySelectorAll('.employee-manager-dashboard-form-item');
let SaveBtn = document.querySelector('.employee-manager-dashboard-button');

for(let i = 0; i < ChangeDataButtons.length; i++) {
    ChangeDataButtons[i].addEventListener('click', ()=> {
        employees[i].children[1].children[0].readOnly=false
        employees[i].children[1].children[0].style.color = "#111111";
        employees[i].children[2].children[0].readOnly=false
        employees[i].children[2].children[0].style.color = "#111111";
        employees[i].children[3].children[0].disabled=false
    });
}

SaveBtn.addEventListener('click', ()=>{
    for(let i = 0; i < ChangeDataButtons.length; i++){
        employees[i].children[1].children[0].readOnly=true
        employees[i].children[1].children[0].style.color = "#434343";
        employees[i].children[2].children[0].readOnly=true
        employees[i].children[2].children[0].style.color = "#434343";
        employees[i].children[3].children[0].disabled=true
    }
});