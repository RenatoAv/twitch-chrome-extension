document.getElementById('init-button').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.storage.sync.get('blacklist', (data) => {
            chrome.tabs.sendMessage(tabs[0].id, data.blacklist);
        });
    });
});

function result(qt) {
    document.getElementById('result').innerHTML = `Total filtrados: ${qt}`;
}

document.getElementById('config-button').addEventListener('click', () =>
    chrome.tabs.create({
        url: './config/index.html'
    })
);