export class UI{
    pauseMenuDisplayed;
    startInfoDisplayed;
    pauseMenuDiv;
    startInfoDiv;
    parentDiv;

    constructor(){
        this.pauseMenuDisplayed = false;
        this.parentDiv = document.getElementById('ui');

        // create menu div and append
        this.pauseMenuDiv = document.createElement('div');
        this.pauseMenuDiv.id = 'pauseDiv';
        // create title text div in pause menu
        let innerDivTitle = document.createElement('div')
        innerDivTitle.id = 'pauseDivInnerTitle'
        let pauseMenuDivText = document.createTextNode("GAME PAUSED");
        innerDivTitle.appendChild(pauseMenuDivText);

        // append inner div to main
        this.pauseMenuDiv.appendChild(innerDivTitle);
        //this.pauseMenuDiv.appendChild(innerDivText);

        // create start info div
        this.startInfoDisplayed = true;
        this.startInfoDiv = document.createElement('div');
        this.startInfoDiv.id = 'startDiv';
        let innerDivStartTitle = document.createElement('div');
        innerDivStartTitle.id = 'startDivInnerTitle';
        let startMenuText = document.createTextNode("PRESS SPACE TO START");
        innerDivStartTitle.appendChild(startMenuText);

        this.startInfoDiv.appendChild(innerDivStartTitle);



    }

    switchPauseMenu(){
        this.pauseMenuDisplayed ? this.removePauseInfo() : this.displayPauseInfo();
    }

    displayPauseInfo(){
        this.parentDiv.insertBefore(this.pauseMenuDiv, document.getElementById('speedParentDiv'))  
        this.pauseMenuDisplayed = true;
    }

    removePauseInfo(){
        this.parentDiv.removeChild(this.pauseMenuDiv);
        this.pauseMenuDisplayed = false;
    }

    switchStartInfo(){
        this.startInfoDisplayed ? this.removeStartInfo() : this.displayStartInfo();
    }

    displayStartInfo(){
        this.parentDiv.insertBefore(this.startInfoDiv, document.getElementById('speedParentDiv'));
        this.startInfoDisplayed = true;
    }

    removeStartInfo(){
        this.parentDiv.removeChild(this.startInfoDiv);
        this.startInfoDisplayed = false;
    }
}