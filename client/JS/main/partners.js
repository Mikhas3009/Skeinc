// Получение данных
let PartnersItems = document.querySelector('.partners-items');
let partners = document.querySelectorAll('.partners-item');
let dots = document.querySelector('.partners-swiper');
let next = document.querySelector('.controller-next');
let back = document.querySelector('.controller-back');

// Количество элементов
let size = partners.length;

// Создание точек от количества элементов
let dot;
for (let i = 0; i < size; i++) {
    dot = document.createElement('div');
    dot.classList.add('swiper-dot');
    dots.append(dot);
}

// Поиск центрального элемента
let CentralElement = Math.floor(size/2);

// Закрашивание стартового центрального элемента
dots.children[CentralElement].classList.remove('swiper-dot');
dots.children[CentralElement].classList.add('active-swiper-dot');

// Изменение статуса точек от кликов на контроллеры
let ActiveDot = CentralElement;

next.addEventListener('click', ()=>{
    ActiveDot+=1;
    if(ActiveDot == size) {
        ActiveDot = 0;
        if(dots.children[ActiveDot].classList.contains('swiper-dot')){
            dots.children[ActiveDot].classList.remove('swiper-dot');
            dots.children[size-1].classList.remove('active-swiper-dot');
            dots.children[size-1].classList.add('swiper-dot');
            dots.children[ActiveDot].classList.add('active-swiper-dot');
        }
    }
    if(dots.children[ActiveDot].classList.contains('swiper-dot')){
        dots.children[ActiveDot].classList.remove('swiper-dot');
        dots.children[ActiveDot-1].classList.remove('active-swiper-dot');
        dots.children[ActiveDot-1].classList.add('swiper-dot');
        dots.children[ActiveDot].classList.add('active-swiper-dot');
    }
});

back.addEventListener('click', ()=>{
    ActiveDot-=1;
    if(ActiveDot == -1) {
        ActiveDot = size-1;
        if(dots.children[ActiveDot].classList.contains('swiper-dot')){
            dots.children[ActiveDot].classList.remove('swiper-dot');
            dots.children[0].classList.remove('active-swiper-dot');
            dots.children[0].classList.add('swiper-dot');
            dots.children[ActiveDot].classList.add('active-swiper-dot');
        }
    }
    if(dots.children[ActiveDot].classList.contains('swiper-dot')){
        dots.children[ActiveDot].classList.remove('swiper-dot');
        dots.children[ActiveDot+1].classList.remove('active-swiper-dot');
        dots.children[ActiveDot+1].classList.add('swiper-dot');
        dots.children[ActiveDot].classList.add('active-swiper-dot');
    }
});

// // Изменение статуса точек на клик на точки-контроллеры
// for (let i =0; i < dots.children.length; i++){
//     dots.children[i].addEventListener('click', ()=>{
//         dots.children[i].classList.remove('swiper-dot');
//         dots.children[i].classList.add('active-swiper-dot');
//         dots.children[ActiveDot].classList.remove('active-swiper-dot');
//         dots.children[ActiveDot].classList.add('swiper-dot');
//         ActiveDot = i;
//     });
// }

// Измнение картинок от кликов на контроллеры
let ActiveSlide = ActiveDot;
next.addEventListener('click', ()=>{
    ActiveSlide = ActiveDot;
    let OldElem = [];
    let NewElem = [];
    let FirstElem = partners[0].cloneNode(true);
    for(let i = 0; i < size; i++){
        OldElem[i] = partners[i].cloneNode(true);
    }
    for(let i = 0; i < size; i++){
        NewElem[i] = OldElem[i+1];
    }
    NewElem[size-1] = FirstElem;
    for(let i = 0; i < size; i++){
        partners[i].innerHTML = NewElem[i].innerHTML;
    }
});

back.addEventListener('click', ()=>{
    ActiveSlide = ActiveDot;
    let OldElem = [];
    let NewElem = [];
    let LastElem = partners[size-1].cloneNode(true);
    for(let i = 0; i < size; i++){
        OldElem[i] = partners[i].cloneNode(true);
    }
    for(let i = 0; i < size; i++){
        NewElem[i] = OldElem[i-1];
    }
    NewElem[0] = LastElem;
    for(let i = 0; i < size; i++){
        partners[i].innerHTML = NewElem[i].innerHTML;
    }
});