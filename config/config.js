let blacklist = [];

chrome.storage.sync.get('blacklist', (data) => {
    if(data.blacklist) {
        blacklist = data.blacklist;
        blacklist.forEach(element => createElement(element));
    }
});

document.getElementById('adicionar-submit').addEventListener('click', () => {
    const gameToBlock = document.getElementById('adicionar-input').value;
    blacklist.push(gameToBlock);
    updateStorage();
    createElement(gameToBlock);
});

function updateStorage() {
    chrome.storage.sync.set({blacklist}, () => console.log('storage updated'));
}

function createElement(gameToBlock) {
    const element = document.createElement('div');
    element.classList.add('item');
    element.innerHTML = gameToBlock;
    element.style.backgroundColor = 'gray';
    element.onclick = removeElement;
    document.getElementById('blocked-list').appendChild(element);
}

function removeElement(event) {
    blacklist.splice(blacklist.indexOf(event.target), 1);
    updateStorage();
    document.getElementById('blocked-list').removeChild(event.target);
}