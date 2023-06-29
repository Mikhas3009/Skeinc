let code = "";
let size = 15;
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function rndCode() {
    //Проверка на пустое значение code
    if (code.length != 0) {
        code = "";
    }

    //Генерация пароля
    for (let i = 0; i < size; i++) {
        let rnd_num = Math.floor(Math.random() * chars.length);
        code += chars[rnd_num];
    }

    // Вставка кода в поле
    let code_field = document.querySelector('#code-field');
    code_field.value = code;

    // Скрытие label
    let code_label = document.querySelector('#code-label');
    code_label.style.top = "-5px";
    code_label.style.color = "#4136f1";
    code_label.style.fontWeight = "bold";
}

function CopyCode() {
    let code_copy = document.getElementById("code-field");
    code_copy.select();
    document.execCommand("copy");
}