// ShowDescriptionBtn
let NewsShowDescriptionBtn = document.querySelectorAll('.news-manager-button-show');
let NewsManagerItem = document.querySelectorAll('.news-manager-item');
for(let i = 0; i < NewsShowDescriptionBtn.length; i++){
    NewsShowDescriptionBtn[i].addEventListener('click', () => {
        NewsManagerItem[i].children[2].style.height = "auto";
        NewsManagerItem[i].style.height = "auto";
        NewsManagerItem[i].style.minHeight = "220px";
        if(window.innerWidth <= 600){
            NewsManagerItem[i].style.minHeight = "400px";
        }
    })
}
// Edit Btn
let NewsManagerEditBtn = document.querySelector('.news-manager-edit-button');
let NewsManagerSaveBtn = document.querySelector('.news-manager-save-button');
let NewsManagerDeleteBtn = document.querySelectorAll('.news-manager-item-title');
let DeleteNewsDataArr = [];
let DeleteNewsDataObj = {
    DeleteNewsId: null,
    DeleteNewsName: null
}
let DeleteNewsDataJSON;

NewsManagerEditBtn.addEventListener('click', () => {
    NewsManagerSaveBtn.style.display = "flex";
    for(let i = 0; i < NewsManagerDeleteBtn.length; i++) {
        NewsManagerDeleteBtn[i].children[1].style.display = "flex";
    }
    // Delete News
    for(let i = 0; i < NewsManagerDeleteBtn.length; i++) {
        NewsManagerDeleteBtn[i].children[1].addEventListener('click', () => {
            NewsManagerItem[i].style.background = "#E7DAFF";
            if(NewsManagerDeleteBtn[i].children[1].classList.contains("bx-x")){
                NewsManagerDeleteBtn[i].children[1].classList.replace("bx-x", "bx-undo");
            }
            else {
                NewsManagerDeleteBtn[i].children[1].classList.replace("bx-undo", "bx-x");
                NewsManagerItem[i].style.background = "#f1f3f6";
            }
        })
    }
});

// Save Btn
NewsManagerSaveBtn.addEventListener('click', () => {
    DeleteNewsDataArr = [];
    for(let i = 0; i < NewsManagerItem.length; i++){
        if(NewsManagerDeleteBtn[i].children[1].classList.contains("bx-undo")){
            let DeleteNewsDataArrs = [];
            DeleteNewsDataArrs[0] = NewsManagerItem[i].children[0].children[0].innerHTML;
            DeleteNewsDataArrs[1] = NewsManagerItem[i].children[1].children[0].innerHTML;
            DeleteNewsDataArr.push(DeleteNewsDataArrs);
            NewsManagerItem[i].style.display = "none";
        }
    }
    // Parse to JSON
    DeleteNewsDataJSON = JSON.stringify(DeleteNewsDataArr);
    // Fetch
    fetch('/news', {
        method: 'DELETE',
        body: DeleteNewsDataJSON,
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
        window.location.href='/news';
    })
    .catch((err) => {
        console.log(err);
        window.location.href='/news';
    })
});