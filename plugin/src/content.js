
function addLable(labelDiv, labelType){
    let dict = {"trust": {"color": "yellow", 
                          "img": "https://img.icons8.com/external-sbts2018-flat-sbts2018/24/000000/external-warning-ecommerce-basic-1-sbts2018-flat-sbts2018.png",
                          "text": "This post is not trustworthy! " },
                "harm":  {"color": "red", 
                          "img": "https://img.icons8.com/color/24/000000/cancel-2--v1.png" ,
                          "text": "This post is harmful!" },
                "verify":{"color": "green", 
                          "img": "https://img.icons8.com/color/24/000000/checked--v4.png",
                          "text": "This claim is verifiable." }
            }
    
    labelDiv.style.display = "flex";
    labelDiv.style.borderStyle = "solid";
    labelDiv.style.borderColor = dict[labelType]["color"];
    labelDiv.style.borderRadius = "5px";
    labelDiv.style.width = "250px";
    labelDiv.style.padding = "3px";
    
    let trustImgDiv = labelDiv.appendChild(document.createElement("div"));
    trustImgDiv.style.flex="15%";
    trustImgDiv.style.margin="auto";
    let trustImg = trustImgDiv.appendChild(document.createElement("img")).src = dict[labelType]["img"];
    
    let trustText = labelDiv.appendChild(document.createElement("div"));
    const trustWarn = dict[labelType]["text"];
    trustText.appendChild(document.createTextNode(trustWarn));
    trustText.style.flex="85%";
    trustText.style.margin="auto 3px";
}

async function addFakePostLabel() {
    // extract containers
    containerName = ".css-1dbjc4n.r-j5o65s.r-qklmqi.r-1adg3ll.r-1ny4l3l"
    let containerList = document.querySelectorAll(containerName);

    // extract post text container, post text, share button from containers
    const textDivName = ".css-901oao.r-37j5jr.r-16dba41.r-bcqeeo.r-bnwqim.r-qvutc0"
    let textContainerList = [];
    let textList = [];
    let btnList = [];
    for (let container of containerList){
        // extract text div and post text
        let textContainer = container.querySelector(textDivName)
        textContainerList.push(textContainer)
        textList.push(textContainer.innerText)
        // extract button div
        let btnDiv = container.querySelector('[aria-label="Share Tweet"]');
        btnList.push(btnDiv);
    }
    
    // Retrive post label by sending api request
    let labelList = [];
    let subtask = ['random', 'random','random']
    for (let postText of textList){
        let curLabel = []
        for (let task of subtask){
            let response = await fetch(`http://127.0.0.1:5000/api/${task}?text=${postText}`);
            let data = await response.text();
            curLabel.push(data.slice());
        }
        labelList.push(curLabel);
    }

    // Log debugging info here
    console.log(labelList);
    console.log('detectPost content jsx');

    // Insert label
    for (let i=0; i < labelList.length; i++){
        for (let j=0; j < labelList[i].length; j++){
            if (labelList[i][j] == '1'){
                let labelContainer = textContainerList[i].querySelector("labelContainer") || textContainerList[i].appendChild(document.createElement("div"));
                labelContainer.className = "labelContainer";
                labelContainer.style.cssText = "display: flex; justify-content:flex-end;  margin:10px 0px 10px auto;";
                if (j===0){
                    let labelDiv = labelContainer.appendChild(document.createElement("div"));
                addLable(labelDiv, "trust");
                }
                else if (j===1){
                    let labelDiv1 = labelContainer.appendChild(document.createElement("div"));
                addLable(labelDiv1, "harm");
                }
                else{
                    let labelDiv1 = labelContainer.appendChild(document.createElement("div"));
                addLable(labelDiv1, "verify");
                }
                
                
            }
        }
    }

    // Add button listener
    for (let i=0; i < btnList.length; i++){
        btn = btnList[i];
        if (labelList[i][1] == '1'){
            btn.addEventListener('click', event => {
                 alert( 'Be careful! This post contains harmful content! ' );
            });
        }
    }
}

/**
 * Message Listener: execute addFakePostLabel Function when receive message from popup.js
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        
        if (request.greeting == "hello"){
            sendResponse({message:"Start Detecting!"});
            addFakePostLabel();
        }
        
});

