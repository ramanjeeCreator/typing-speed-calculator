let btn = document.querySelector('button#btn');
let changePara = document.querySelector('h2#typed-word');
let userPara = document.querySelector('textarea#user-type');
let start = 0;
let end = 0;
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.keyCode === 13) {
            btn.click();
    } else if (event.keyCode === 123) {
        event.preventDefault(); // Prevent the default behavior (opening developer tools)
    }
});

const startTime = (x) => {
    const date = new Date();
    let time = date.getTime();
    x = time;
    return x;
}
const endTime = (y) => {
    const date = new Date();
    let time = date.getTime();
    y = time;
    return y;
}

let paragraphs =
    [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Quaerat non nemo, omnis similique alias eum qui voluptate nulla exercitationem.',
        'Officia est fugiat a illum distinctio necessitatibus rerum maxime tenetur.',
        'Illo tempora quis, officiis deserunt eum, cupiditate animi quas autem voluptatum quae quisquam',
        'reprehenderit magnam deleniti cumque voluptatibus dolorem doloribus velit? Natus est amet asperiores possimus',
        'harum ipsa animi debitis architecto obcaecati, omnis necessitatibus quo repellendus.',
        'Illo recusandae iusto nulla placeat odio debitis ex ipsa quibusdam nobis adipisci provident modi,',
        'doloribus autem iste earum, officiis corporis magnam aliquam esse beatae veritatis.'
    ]

const rand = () => {
    let x = Math.floor(Math.random() * 5);

    return x;
}

let randPara;
let sec = 0
let timing;

btn.addEventListener('click', () => {
    btn.style.transform = 'translate(2px, 2px)';

    randPara = paragraphs[rand()];
    changePara.innerHTML = randPara;

    setTimeout(() => {
        btn.style.transform = '';
    }, 100);

    if (btn.innerHTML == 'Start') {
        userPara.removeAttribute('readonly')
        btn.innerHTML = 'Stop';
        start += startTime();
        timing = setInterval(() => {
            sec++;
            document.getElementById('time-count').innerHTML = sec;
            updateCPMWPM();
        }, 1000);
        document.getElementById('total-words').innerHTML = document.querySelector('#typed-word').innerHTML.split(" ").length;
        document.getElementById('total-characters').innerHTML = document.querySelector('#typed-word').innerHTML.split("").length;
    } else {
        clearInterval(timing);
        sec = 0
        end = endTime();
        userPara.setAttribute('readonly', "true");
        btn.innerHTML = 'Start';
    }
})

function updateResults() {
    let totalWords = document.querySelector('textarea#user-type').value.split(" ").length;
    document.getElementById('word-count').innerHTML = totalWords;
    document.getElementById('char-count').innerHTML = userPara.value.split("").length;
    let words = document.querySelector('textarea#user-type').value.split(" ");
    let toTypeWords = document.querySelector('#typed-word').innerHTML.split(" ");
    let characters = document.querySelector('textarea#user-type').value.split("");
    let toTypeCharacter = document.querySelector('#typed-word').innerHTML.split("");
    let noOfWrongWord = 0;
    let noOfWrongCharacter = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i] != toTypeWords[i]) {
            noOfWrongWord += 1;
        }
    }
    for (let i = 0; i < characters.length; i++) {
        if (characters[i] != toTypeCharacter[i]) {
            noOfWrongCharacter += 1;
        }
    }
    document.getElementById('wrong-words').innerHTML = noOfWrongWord;
    document.getElementById('wrong-characters').innerHTML = noOfWrongCharacter;
}
function updateCPMWPM() {
    document.getElementById('cpm').innerHTML = `${((userPara.value.split("").length) / (sec / 60)).toFixed()}`;
    document.getElementById('wpm').innerHTML = `${((document.querySelector('textarea#user-type').value.split(" ").length) / (sec / 60)).toFixed()}`;
}