const MENU = document.getElementById('menu');
const SANDWICH = document.getElementById('sandwich');
const NAVIGATION = document.querySelector('.navigation');
const HEADING = document.querySelector('h1');

let items = document.querySelectorAll('.slider');
let currentItem = 0;
let isEnabled = true;

let VER_IPHONE = document.getElementById('iphone-ver');
let BLACK_VER_IPHONE = document.querySelector('.black_screen_ver');

let HOR_IPHONE = document.getElementById('iphone-hor');
let BLACK_HOR_IPHONE = document.querySelector('.black_screen_hor');

let BUTTONS = document.getElementById('buttons');
let PORTFOLIO = document.getElementById('projects_container');


const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');


// Задание №1. Меню с переключением
MENU.addEventListener('click', (event) => {
    if (event.target.tagName == "A") {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }
});

// Появление панели меню слева при нажатии на "сендвич" для устройств 375px <= width < 768px
SANDWICH.addEventListener('click', (event) => {
    NAVIGATION.classList.toggle('nav-active');
    SANDWICH.classList.toggle('rotation');
    HEADING.classList.toggle('heading-transformation');
    MENU.addEventListener('click', (event) => {
        if (event.target.tagName == "A") {
            MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            NAVIGATION.classList.remove('nav-active');
            SANDWICH.classList.remove('rotation');
        }
    });

});

// Активизация ссылок при скролле
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset;
    let header = 90;
    let servicesPos = document.getElementById("services").offsetTop - header;
    let portfolioPos = document.getElementById("portfolio").offsetTop - header;
    let aboutPos = document.getElementById("about").offsetTop - header;
    let contactsPos = document.getElementById("quote").offsetTop - header;

    if (currentScroll < servicesPos) {
        activateMenuElem(0);
    } else if (currentScroll >= servicesPos && currentScroll < portfolioPos) {
        activateMenuElem(1);
    } else if (currentScroll >= portfolioPos && currentScroll < aboutPos) {
        activateMenuElem(2);
    } else if (currentScroll >= aboutPos && currentScroll < contactsPos) {
        activateMenuElem(3);
    } else if (currentScroll >= contactsPos) {
        activateMenuElem(4);
    }

});

function activateMenuElem(index) {
    let links = MENU.querySelectorAll('a');
    links.forEach(el => el.classList.remove('active'));
    links[index].classList.add('active');
}



// Задание №2. Переключение слайдов
function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}


document.querySelector('.cher').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.cher_right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

// Задание №3. Slider. Активация экранов телефонов
VER_IPHONE.addEventListener('click', () => {
    BLACK_VER_IPHONE.classList.toggle('on');
});

HOR_IPHONE.addEventListener('click', () => {
    BLACK_HOR_IPHONE.classList.toggle('on');

});

// Задание №4. Portfolio. Переключение табов
BUTTONS.addEventListener('click', (event) => {
    if (event.target.tagName == "BUTTON") {
        BUTTONS.querySelectorAll('button').forEach(el => el.classList.remove('active_button'));
        event.target.classList.add('active_button');
        mixProject();
    }
});

function mixProject() {
    for (var i = PORTFOLIO.children.length; i >= 0; i--) {
        PORTFOLIO.appendChild(PORTFOLIO.children[Math.random() * i | 0]);
    }
}
/* второй вариант решения для функции mixProject(): 

function mixProject() {
    let PROJECT = document.querySelector('.project');
    PORTFOLIO.appendChild(PROJECT);
    PROJECT.classList.toggle(".project")
    } 
}

*/


// Задание №5. Portfolio. Взаимодействие с картинками
PORTFOLIO.addEventListener('click', (event) => {
    if (event.target.classList.contains("project")) {
        PORTFOLIO.querySelectorAll('.project').forEach(el => el.classList.remove('active_project'));
        event.target.classList.add('active_project');
    }
});


// Задание №6. Get a Quote, сообщение об отправке письма
BUTTON.addEventListener('click', () => {
    event.preventDefault();
    const subject = document.getElementById('subject').value.toString();
    const description = document.getElementById('description').value.toString();
    if (subject == '') {
        document.getElementById('subject_result').innerText = "Без темы";
    } else {
        document.getElementById('subject_result').innerText = "Тема: " + subject;
    }
    if (description == '') {
        document.getElementById('describe_result').innerText = "Без описания";
    } else {
        document.getElementById('describe_result').innerText = "Описание: " + description;
    }
    document.getElementById('message-block').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subject_result').innerText = '';
    document.getElementById('describe_result').innerText = '';
    document.getElementById('message-block').classList.add('hidden');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('description').value = '';
});
