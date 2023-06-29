//Получение элементов
let menu = document.querySelector(".menu-container");
let overlay = document.querySelector(".menu-overlay");
let toggle = document.querySelector(".menu-toggle");
//Клонирование элементов
let menuItemsCopy = menu.children[1].cloneNode(true);
let menuAccountCopy = menu.children[2].cloneNode(true);

responsiveMenu = () => {
    if(toggle.classList.contains("toggle-hidden")){
        toggle.classList.remove("toggle-hidden");
        toggle.classList.add("toggle-active");

        menu.children[3].children[0].children[0].innerHTML = 'close';
        
        overlay.style["display"] = "flex";

        overlay.append(menuItemsCopy, menuAccountCopy);

        for(let i = 0; i < overlay.children.length; i++) {
            overlay.children[i].style["display"] = "flex";
        }
        overlay.children[0].style["flex-direction"] = "column"
    }
    else {
        toggle.classList.remove("toggle-active");
        toggle.classList.add("toggle-hidden");

        menu.children[3].children[0].children[0].innerHTML = 'menu';

        overlay.style["display"] = "none";

        while(overlay.children.length != 0) {
            overlay.children[0].remove();
        }
    }
}

//Фикс проблемы с изменением ширины экрана
addEventListener('resize', () => {
    if(window.innerWidth >= 800) {
        toggle.classList.remove("toggle-active");
        toggle.classList.add("toggle-hidden");
        
        overlay.style["display"] = "none";

        while(overlay.children.length != 0) {
            overlay.children[0].remove();
        }
    }
});