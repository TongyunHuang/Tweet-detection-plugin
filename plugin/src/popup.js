"use strict"

// Initialize button
let detectPost = document.getElementById("detectPost");

// When the button is clicked, inject addFakePostLabel into current page
detectPost.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['script.js']
  });
});





