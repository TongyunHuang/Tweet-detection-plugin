
// ($=>{
    
    customElements.define("post-label",
    class extends HTMLElement
    {   
        
        constructor()
        {
            super();
		    this.shadow = this.attachShadow({ mode: 'closed' });
        }

        render()
		{
            
            let toast = this.shadow.querySelector("div") || this.shadow.appendChild(document.createElement("div"));
            toast.classList = ["toast-container"];

            // left col
            let imgBox = toast.getElementsByClassName("toast-img")[0] || toast.appendChild(document.createElement("div"));
            imgBox.classList=["toast-img"]
            let icon =  imgBox.querySelector("img") || imgBox.appendChild(document.createElement("img"));
            icon.src = "https://img.icons8.com/color/48/000000/microsoft-teams.png";

            // right col
            let textBox = toast.getElementsByClassName("toast-text")[0] || toast.appendChild(document.createElement("div"));
            textBox.classList = ["toast-text"];

            let title = textBox.querySelector("h3") || textBox.appendChild(document.createElement("h3"));
            title.appendChild(document.createTextNode( "Empty Toast title"));

            let body =textBox.querySelector("p") || textBox.appendChild(document.createElement("p"));
            body.appendChild(document.createTextNode( "Empty body"));
        }
    })



//})();