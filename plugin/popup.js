// Initialize button
let detectPost = document.getElementById("detectPost");

// When the button is clicked, inject addFakePostLabel into current page
detectPost.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addFakePostLabel,
  });
});


// The body of this function will be execuetd as a content script inside the
// current page
async function addFakePostLabel() {

    // extract post text from dom
    const className="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"
    //const className = "css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0";
    let list = document.getElementsByClassName(className);
    let textList = [];
    for(let post of list)
        textList.push(post.innerText);
    
    // get label 
    let labelList = [];
    for (let postText of textList){
        let response = await fetch(`http://127.0.0.1:5000/api?text=${postText}`);
        let data = await response.text();
        labelList.push(data.slice());
        
    }
    
    // insert label
    for (let i=0; i < labelList.length; i++){
        // if (labelList[i] == '1'){
            let div = list[i].appendChild(document.createElement("div"));
            let textDiv = div.appendChild(document.createElement("div"));
            let textNode = textDiv.appendChild(document.createTextNode("Be careful! This might be a fake post"));

            div.style.cssText = "display: flex; justify-content:flex-end;  margin:10px 0px 10px auto;";
            textDiv.style.cssText = "display: block;color:white; padding:5px;";
            textDiv.style.backgroundColor = "red";
        //}
    }
}

