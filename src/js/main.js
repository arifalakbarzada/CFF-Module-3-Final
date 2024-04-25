const insertButtons = document.querySelectorAll(".insert-buttons");
const outButtons = document.querySelectorAll('.out-buttons');
const activedInsert = document.querySelector('.active-insert');
const activeOut = document.querySelector('.active-out');
const outInput = document.querySelector('.out-input');
const insertInput = document.querySelector('.insert-input');
const notificationInsert = document.querySelector('.notification-insert');
const notificationOut = document.querySelector('.notification-out');
let activeBtnInsert = `RUB`;
let activeBtnOut = 'USD';
insertButtons.forEach((button) => button.addEventListener('click', selectInsert));
outButtons.forEach((button) => button.addEventListener('click', selectOut));
function updateInsertNotification(rate) {
    notificationInsert.textContent = `1 ${activeBtnInsert} = ${rate} ${activeBtnOut}`;
}

function updateOutNotification(rate) {
    notificationOut.textContent = `1 ${activeBtnOut} = ${rate} ${activeBtnInsert}`;
}

function selectInsert(event) {
    let clickedButton = event.target;
    insertButtons.forEach((node) => node.classList.remove('active-insert'));
    clickedButton.classList.add("active-insert");
    activeBtnInsert = clickedButton.textContent;
    if (activeBtnInsert !== activeBtnOut) {
        fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnInsert}`)
        .then(response => response.json())
        .then(data => {
            updateInsertNotification(data.conversion_rates[activeBtnOut]);
            // outInput.value = parseFloat(+insertInput.value) * parseFloat(+data.conversion_rates[activeBtnOut]);
        })
    fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnOut}`)
        .then(response => response.json())
        .then(data => {
            updateOutNotification(data.conversion_rates[activeBtnInsert]);
        })
        changeOut()
    }
}

function selectOut(event) {
    let clickedButton = event.target;
    outButtons.forEach((node) => node.classList.remove('active-out'));
    clickedButton.classList.add("active-out");
    activeBtnOut = clickedButton.textContent;
    if (activeBtnOut !== activeBtnInsert) {
          fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnOut}`)
        .then(response => response.json())
        .then(data => {
            updateOutNotification(data.conversion_rates[activeBtnInsert]);
            // insertInput.value = parseFloat(+outInput.value) * parseFloat(+data.conversion_rates[activeBtnInsert]);
        })
    fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnInsert}`)
        .then(response => response.json())
        .then(data => {
            updateInsertNotification(data.conversion_rates[activeBtnOut]);
        })
        changeInsert()
    }
  
}

function changeInsert(){
    fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnInsert}`)
    .then(response => response.json())
    .then(data => {
        outInput.value = parseFloat(+insertInput.value) * parseFloat(+data.conversion_rates[activeBtnOut]);
    })
}
insertInput.addEventListener('keydown',changeInsert)
insertInput.addEventListener('focus',changeInsert)
function changeOut() {
    fetch(`https://v6.exchangerate-api.com/v6/f74916ad5e126616b7d10861/latest/${activeBtnOut}`)
    .then(response => response.json())
    .then(data => {
        insertInput.value= parseFloat(+outInput.value) * parseFloat(+data.conversion_rates[activeBtnInsert])
    })
}
outInput.addEventListener('keyup',changeOut)
outInput.addEventListener('focus',changeOut)
