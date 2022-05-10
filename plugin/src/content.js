
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

    // extract post text from dom
    //css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0
    //css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0
    //css-901oao r-18jsvk2 r-37j5jr r-1b43r93 r-16dba41 r-hjklzo r-bcqeeo r-bnwqim r-qvutc0
    //css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0
    //css-901oao r-18jsvk2 r-37j5jr r-1b43r93 r-16dba41 r-hjklzo r-bcqeeo r-bnwqim r-qvutc0
    const className="css-901oao r-18jsvk2 r-37j5jr r-1b43r93 r-16dba41 r-hjklzo r-bcqeeo r-bnwqim r-qvutc0";
    const classNameList = ".css-901oao.r-37j5jr.r-16dba41.r-bcqeeo.r-bnwqim.r-qvutc0"
    // let list = document.getElementsByClassName(classNameList);
    let list = document.querySelectorAll(classNameList);
    
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

    // add button listener
    const btnList = ".css-18t94o4.css-1dbjc4n.r-1777fci.r-bt1l66.r-1ny4l3l.r-bztko3.r-lrvibr"
    let btnElemList = document.querySelectorAll(classNameList);
    for (brn of btnElemList){
        
    }



    console.log(labelList)
    console.log('detectPost content jsx')
    // insert label
    for (let i=0; i < labelList.length; i++){
        if (labelList[i] == '1'){
            
            let labelContainer = list[i].querySelector("labelContainer") || list[i].appendChild(document.createElement("div"));
            labelContainer.className = "labelContainer";
            labelContainer.style.cssText = "display: flex; justify-content:flex-end;  margin:10px 0px 10px auto;";
            let labelDiv = labelContainer.appendChild(document.createElement("div"));
            addLable(labelDiv, "trust");
            let labelDiv1 = labelContainer.appendChild(document.createElement("div"));
            addLable(labelDiv1, "harm");
            
        }
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        
        if (request.greeting == "hello"){
            sendResponse({farewell: "goodbye"});
            addFakePostLabel();
        }
        //let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        
        //return true;
});