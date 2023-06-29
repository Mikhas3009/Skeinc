let check_role_block = document.querySelector('.choose-post');
let admin_form = document.querySelector('.admin-form');
let admin_form_user = document.querySelector('.admin-form-user');
let admin_form_company = document.querySelector('.admin-form-company');
let employee_form = document.querySelector('.employee-form');

function addAttribute(block){
    block.setAttribute('id', 'hidden-block');
}

function rmAttribute(block) {
    block.removeAttribute('id');
}

// if role administrator
let role_admin = document.querySelector('.post-admin').addEventListener('click', ()=>{
    addAttribute(check_role_block);
    rmAttribute(admin_form);
    rmAttribute(admin_form_user);
    // if admin click on button back
    let admin_form_checkRole_backBtn = document.querySelector('#backBtnReg').addEventListener('click', ()=>{
        rmAttribute(check_role_block);
        addAttribute(admin_form);
        addAttribute(admin_form_user);
    });
    // if admin click on button next
    let admin_form_user_nextBtn = document.querySelector('#nextRegComp').addEventListener('click', ()=>{
        addAttribute(admin_form_user);
        rmAttribute(admin_form_company);
        //if admin click on button back
        let admin_form_comp_backBtn = document.querySelector('#backBtnAdmin').addEventListener('click', ()=>{
            addAttribute(admin_form_company);
            rmAttribute(admin_form_user);
        });
    });
});

//if role employee
let role_employee = document.querySelector('.post-employee').addEventListener('click', ()=>{
    addAttribute(check_role_block);
    rmAttribute(employee_form);
    // if employee click on button back
    let employee_form_checkRole_backBtn = document.querySelector('#backBtnRegEmp').addEventListener('click', ()=>{
        rmAttribute(check_role_block);
        addAttribute(employee_form);
    });
});