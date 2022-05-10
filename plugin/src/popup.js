"use strict"

// Initialize button
let detectPost = document.getElementById("detectPost");

// When the button is clicked, inject addFakePostLabel into current page
detectPost.addEventListener("click", async () => {
    //let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.message)
            alert(response.message);
        });
    });
});

// Initialize close button
let closeBtn = document.getElementById('x');

// When the close button is clicked, close the popup window
closeBtn.addEventListener("click", async () => {
    window.close();
})





