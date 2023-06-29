// Получение данных
let ChatManagerUsers = document.querySelector('.chat-manager-users');
let ChatManagerNotSelectedUser = document.querySelector('.chat-manager-notselected-user');
let ChatManagerMessenger = document.querySelector(".chat-manager-messenger-content");
let MessagesBlock = ChatManagerMessenger.children[1];
let ChatManagerSelectedUser = document.querySelector('.chat-manager-selected-user-name');
let ChatManagerSelectedUserId = document.querySelector('.chat-manager-selected-user-id');
let ChatManagerSelectedUserImg = document.querySelector('.chat-manager-selected-user-img');
let ChatManagerSearchField = document.querySelector('.chat-manager-search').children[1];
let ChatField = document.querySelector('.chat-manager-controller').children[0].children[0];
let ChatSend = document.querySelector('.chat-manager-controller').children[1].children[0];
let ChatManagerYou = document.querySelector('.chat-manager-header-user');
let ChatDataObj = {
    receiverId: null
}
let ChatDataJSON;
let CurrentChatData;
let GetMessageData;
const userID=document.querySelector('.chat-manager-user-id').innerHTML;
const socket = io("http://localhost:8000")

socket.on(`message:${userID}`, (data) => {
        console.log(data);
        GetMessageData = data;
        getMessage(GetMessageData.text, GetMessageData.date, GetMessageData.time, GetMessageData.userRecipientID, GetMessageData.userSenderID);
})
// Фикс с разрешением экрана
if(window.innerWidth < 600){
    ChatSend.innerHTML = '<i class="bx bx-send"></i>';
}
else {
    ChatSend.innerHTML = 'Отправить <i class="bx bx-send"></i>';
}

// Поиск сотрудников
ChatManagerSearchField.addEventListener('keyup', () => {
    for(let i = 0; i < ChatManagerUsers.children.length; i++){
        ChatManagerUsers.children[i].style.display = "none";
    }
    for(let i = 0; i < ChatManagerUsers.children.length; i++){
        if(ChatManagerUsers.children[i].children[2].innerHTML.includes(ChatManagerSearchField.value)){
            ChatManagerUsers.children[i].style.display = "flex";
        }
    }
})
// Пользователь выбрал чат
for(let i = 0; i < ChatManagerUsers.children.length; i++) {
    ChatManagerUsers.children[i].addEventListener('click', () => {
        ChatManagerNotSelectedUser.classList.remove('chat-manager-active');
        ChatManagerMessenger.classList.add('chat-manager-active');
        ChatManagerSelectedUser.innerHTML = ChatManagerUsers.children[i].children[2].innerHTML;
        ChatManagerSelectedUserId.innerHTML = ChatManagerUsers.children[i].children[0].innerHTML;
        ChatManagerSelectedUserImg.src = ChatManagerUsers.children[i].children[1].src;
        for (let j = 0; j < ChatManagerMessenger.children[1].children.length; j++){
            ChatManagerMessenger.children[1].innerHTML = "";
        }
        ChatDataObj.receiverId = ChatManagerSelectedUserId.innerHTML;
        // Parse Object to JSON
        ChatDataJSON = JSON.stringify(ChatDataObj);
        // Fetch
        fetch('/getMessages', {
            method: 'POST',
            body: ChatDataJSON,
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
            CurrentChatData = data;
            for(let i = 0; i < CurrentChatData.length; i++) {
                createMessage(CurrentChatData[i].chat_message, CurrentChatData[i].chat_date, CurrentChatData[i].chat_time, CurrentChatData[i].user_id_from, CurrentChatData[i].user_id_to);
            }
            MessagesBlock.scrollBy(0,MessagesBlock.scrollHeight);
        })
        .catch((err) => {
            console.log(err);
        })
    });
}

// Создание сообщений
function createMessage(chat_message, chat_date, chat_time, user_id_from, user_id_to) {
    let chatManagerMessage = document.createElement('div');
    chatManagerMessage.classList.add('chat-manager-message');
    if(user_id_from == userID){
        chatManagerMessage.classList.add('my-message');
    }
    else {
        chatManagerMessage.classList.add('other-message');
    }
   
    let div = document.createElement('div');

    // MessagesItemUser
    let messagesItemUser = document.createElement('div');
        messagesItemUser.classList.add('messages-item-user');
        let spanID = document.createElement('span');
        spanID.classList.add('messages-item-user-id');
        if(user_id_from == userID){
            spanID.innerHTML = ChatManagerYou.children[0].innerHTML;
        }
        else {
            spanID.innerHTML = user_id_to;
        }
        let img = document.createElement('img');
        img.classList.add('messages-item-user-img');
        if(user_id_from == userID) {
            img.src = ChatManagerYou.children[1].src;
        }
        else {
            img.src = ChatManagerSelectedUserImg.src;
        }
        let spanName = document.createElement('span');
        spanName.classList.add('messages-item-user-name');
        if(user_id_from == userID) {
            spanName.innerHTML = ChatManagerYou.children[2].innerHTML;
        }
        else {
            spanName.innerHTML = ChatManagerSelectedUser.innerHTML;
        }
        messagesItemUser.append(spanID, img, spanName);

        // MessageText
        let MessageText = document.createElement('div');
        MessageText.classList.add('messages-text')
        let spanText = document.createElement('span');
        spanText.innerHTML = chat_message;
        MessageText.append(spanText);

        // MessagesDate
        let MessageDate = document.createElement('div');
        MessageDate.classList.add('messages-date')
        let spanDate = document.createElement('span');
        spanDate.innerHTML = chat_date;

        // MessagesTime
        let MessageTime = document.createElement('div');
        MessageTime.classList.add('messages-time')
        let spanTime = document.createElement('span');
        spanTime.innerHTML = chat_time;

    MessageDate.append(spanDate);
    MessageTime.append(spanTime)

    div.append(messagesItemUser, MessageText, MessageDate, MessageTime);

    chatManagerMessage.append(div);

    let ChatManagerMessages = document.querySelector('.chat-manager-messages');
    ChatManagerMessages.append(chatManagerMessage);
}

// Получение сообщений
function getMessage(text, date, time, userRecipientId, userSenderID) {
    let chatManagerMessage;
    let div;
    if(userSenderID == ChatManagerSelectedUserId.innerHTML){
        chatManagerMessage = document.createElement('div');
        chatManagerMessage.classList.add('chat-manager-message');
        chatManagerMessage.classList.add('other-message');
        div = document.createElement('div');
    }

    // MessagesItemUser
    let messagesItemUser = document.createElement('div');
    messagesItemUser.classList.add('messages-item-user');
    let spanID = document.createElement('span');
    spanID.classList.add('messages-item-user-id');
    if(userSenderID == ChatManagerSelectedUserId.innerHTML){
            spanID.innerHTML = ChatManagerSelectedUserId.innerHTML;
        }
        let img = document.createElement('img');
        img.classList.add('messages-item-user-img');
        if(userSenderID == ChatManagerSelectedUserId.innerHTML) {
            img.src = ChatManagerSelectedUserImg.src;
        }
        let spanName = document.createElement('span');
        spanName.classList.add('messages-item-user-name');
        if(userSenderID == ChatManagerSelectedUserId.innerHTML) {
            spanName.innerHTML = ChatManagerSelectedUser.innerHTML;
        }
        messagesItemUser.append(spanID, img, spanName);

        // MessageText
        let MessageText = document.createElement('div');
        MessageText.classList.add('messages-text')
        let spanText = document.createElement('span');
        if(userSenderID == ChatManagerSelectedUserId.innerHTML) {
            spanText.innerHTML = text;
        }
        MessageText.append(spanText);

        // MessagesDate
        let MessageDate = document.createElement('div');
        MessageDate.classList.add('messages-date')
        let spanDate = document.createElement('span');
        if(userSenderID == ChatManagerSelectedUserId.innerHTML) {
            spanDate.innerHTML = date;
        }
        // MessagesTime
        let MessageTime = document.createElement('div');
        MessageTime.classList.add('messages-time')
        let spanTime = document.createElement('span');
        if(userSenderID == ChatManagerSelectedUserId.innerHTML) {
            spanTime.innerHTML = time;
        }

    MessageDate.append(spanDate);
    MessageTime.append(spanTime)

    div.append(messagesItemUser, MessageText, MessageDate, MessageTime);

    chatManagerMessage.append(div);

    let ChatManagerMessages = document.querySelector('.chat-manager-messages');
    ChatManagerMessages.append(chatManagerMessage);
}

// Отправка сообщения Frontend
ChatSend.addEventListener('click', () => {
    if(ChatField.value.length == 0){
        return;
    }
    else {
        // ChatManagerMessage
        let chatManagerMessage = document.createElement('div');
        chatManagerMessage.classList.add('chat-manager-message');
        chatManagerMessage.classList.add('my-message');
        let div = document.createElement('div');
        // MessagesItemUser
        let messagesItemUser = document.createElement('div');
        messagesItemUser.classList.add('messages-item-user');
        let spanID = document.createElement('span');
        spanID.classList.add('messages-item-user-id');
        spanID.innerHTML = ChatManagerYou.children[0].innerHTML;
        let img = document.createElement('img');
        img.classList.add('messages-item-user-img');
        img.src = ChatManagerYou.children[1].src;
        let spanName = document.createElement('span');
        spanName.classList.add('messages-item-user-name');
        spanName.innerHTML = ChatManagerYou.children[2].innerHTML;
        messagesItemUser.append(spanID, img, spanName);
        // MessageText
        let MessageText = document.createElement('div');
        MessageText.classList.add('messages-text')
        let spanText = document.createElement('span');
        spanText.innerHTML = ChatField.value;
        MessageText.append(spanText);
        // MessagesDate
        let MessageDate = document.createElement('div');
        MessageDate.classList.add('messages-date')
        let spanDate = document.createElement('span');
        // MessagesTime
        let MessageTime = document.createElement('div');
        MessageTime.classList.add('messages-time')
        let spanTime = document.createElement('span');

        function ChatManagerDateTime(year,month,day,time, fieldDate, fieldTime) {
            year = year + '-';
            if(month.toLocaleString().length == 1) {
                month = '0' + month;
            }
            month = month + '-';
            if(day.toLocaleString().length == 1) {
                day = '0' + day;
            }
            fieldDate.innerHTML = year + month + day;
            fieldTime.innerHTML = time;
            
            return fieldDate, fieldTime;
        }
        // Переменные, хранящее в значение текущее время
        let Year = new Date().getFullYear();
        let Month = new Date().getMonth()+1;
        let Day = Date().split(' ')[2];
        let Time = Date().split(' ')[4];
        // Вызов функции
        ChatManagerDateTime(Year, Month, Day, Time,spanDate, spanTime);
        // Отправка дочерних элементов в родительские элементы
        MessageDate.append(spanDate);
        MessageTime.append(spanTime)
        div.append(messagesItemUser, MessageText, MessageDate, MessageTime);
        chatManagerMessage.append(div);
        let ChatManagerMessages = document.querySelector('.chat-manager-messages');
        ChatManagerMessages.append(chatManagerMessage);
        ChatField.value = '';

        const userRecipientID=ChatManagerSelectedUserId.innerHTML;
        socket.emit('message', 
         { 
            text:spanText.innerHTML,
            time:spanTime.innerHTML,
            date:spanDate.innerHTML,
            userRecipientId: ChatManagerSelectedUserId.innerHTML //id того чувака кому нужно отправить сообщение (выбранный юзер)
         }
        )
    }
})