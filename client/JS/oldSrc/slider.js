// Получение данных
let SliderItems = document.querySelectorAll('.history-slider-item')
let SliderControllers = document.querySelector('.history-slider-controllers')

// Количество элементов
let SliderSize = SliderItems.length;

// Создание контроллеров от количества элементов
let SliderController;
for (let i = 0; i < SliderSize; i++) {
    SliderController = document.createElement('div');
    SliderController.classList.add('slider-controller');
    SliderControllers.append(SliderController);
}

// Закрашивание начального контроллера в активный
let CurrentSlide = 0;
for(let i = 0; i < SliderSize; i++) {
    if(SliderItems[i].classList.contains('current-slide')){
        SliderControllers.children[i].classList.add('active-slider-controller')
        SliderControllers.children[i].classList.remove('slider-controller')
    }
}

// Отслеживание кликов на контроллеры
for(let i = 0; i < SliderSize; i++) {
    SliderControllers.children[i].addEventListener('click', ()=>{
        CurrentSlide = i;
        for(let j = 0; j < SliderSize; j++) {
            if(SliderControllers.children[j].classList.contains('active-slider-controller')){
                SliderControllers.children[j].classList.add('slider-controller')
                SliderControllers.children[j].classList.remove('active-slider-controller')
            }
        }
        SliderControllers.children[i].classList.add('active-slider-controller')
        SliderControllers.children[i].classList.remove('slider-controller')
        for(let m = 0; m < SliderSize; m++) {
            if(SliderItems[m].classList.contains('current-slide')){
                SliderItems[m].classList.remove('current-slide')
            }
        }
        SliderItems[i].classList.add('current-slide');
        SliderItems[CurrentSlide].style.animation = "Opacity 0.6s ease-in-out";
    });
}

// Timer
function NextSlide() {
    if(CurrentSlide != 3){
        SliderControllers.children[CurrentSlide].classList.add('slider-controller');
        SliderControllers.children[CurrentSlide].classList.remove('active-slider-controller');
        SliderItems[CurrentSlide].classList.remove('current-slide');
        CurrentSlide+=1;
        SliderControllers.children[CurrentSlide].classList.add('active-slider-controller');
        SliderControllers.children[CurrentSlide].classList.remove('slider-controller');
        SliderItems[CurrentSlide].classList.add('current-slide');
        SliderItems[CurrentSlide].style.animation = "Opacity 0.6s ease-in-out";
    }
    else if(CurrentSlide==3) {
        SliderControllers.children[CurrentSlide].classList.add('slider-controller');
        SliderControllers.children[CurrentSlide].classList.remove('active-slider-controller');
        SliderItems[CurrentSlide].classList.remove('current-slide');
        CurrentSlide=0;
        SliderControllers.children[CurrentSlide].classList.add('active-slider-controller');
        SliderControllers.children[CurrentSlide].classList.remove('slider-controller');
        SliderItems[CurrentSlide].classList.add('current-slide');
        SliderItems[CurrentSlide].style.animation = "Opacity 0.6s ease-in-out";
    }
    else {
        console.log("Undefined error with slider, write to developers, please!");
    }
}

let StartTimer = window.setInterval(NextSlide, 7000);