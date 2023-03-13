export class UI{
    pauseMenuDisplayed;
    pauseMenuDiv;
    parentDiv;

    constructor(){
        this.pauseMenuDisplayed = false;
        this.parentDiv = document.getElementById('ui');
        console.log(this.parentDiv);
        // create menu div and append
        this.pauseMenuDiv = document.createElement('div');
        this.pauseMenuDiv.id = 'pauseDiv';
        // create title text div in pause menu
        let innerDivTitle = document.createElement('div')
        innerDivTitle.id = 'pauseDivInnerTitle'
        let pauseMenuDivText = document.createTextNode("GAME PAUSED");
        innerDivTitle.appendChild(pauseMenuDivText);

        // create subtext div in pause menu

        /*let innerDivText = document.createElement('div')
        innerDivText.id = 'pauseDivInnerText'
        let innerDivTextTextnode = document.createTextNode("Press space to continue");
        innerDivText.appendChild(innerDivTextTextnode);*/

        // append inner div to main
        this.pauseMenuDiv.appendChild(innerDivTitle);
        //this.pauseMenuDiv.appendChild(innerDivText);



    }

    switchPauseMenu(){
        console.log(this.parentDiv);
        if(this.pauseMenuDisplayed){
            // stop displaying
            this.parentDiv.removeChild(this.pauseMenuDiv);
            this.pauseMenuDisplayed = false;
        }else{
            // display menu
            this.parentDiv.insertBefore(this.pauseMenuDiv, document.getElementById('speedParentDiv'))  
            this.pauseMenuDisplayed = true;
        }

    }
}