let blockedGames = [];
let count = 0;
let mo = null;
const mainCardIndex = 10;

function init() {
    const streamGames = findStreamGames();

    for(let streamGame of streamGames) {
        const display = blockedGames.every(bg => bg !== streamGame.innerHTML);
        const mainCard = getParentByIndex(streamGame, mainCardIndex);
        displayStream(mainCard, display);
    }

    function findStreamGames() {
        return document.querySelectorAll('a[data-a-target="preview-card-game-link"]');
    }
    
    function getParentByIndex(element, parentIndex) {
        let parentByIndex = element;
    
        for(let i = 0; i < parentIndex; i++) 
            parentByIndex = parentByIndex.parentElement;
    
        return parentByIndex;
    }
    
    function displayStream(element, display) {
        if(display) {
            element.style.display = 'block'
            count++;
        } else {
            element.style.display = 'none';
        }
    }
    console.log(count);
    return count;
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
    blockedGames = request;

    if(!mo) {
        const mainPanel = document.querySelector(".tw-tower");
        mo = new MutationObserver(init);
        mo.observe(mainPanel, { childList: true, subtree: true });
    }

    init();
});