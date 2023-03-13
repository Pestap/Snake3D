export class UI{
    pauseMenuDisplayed;
    startInfoDisplayed;
    pauseMenuDiv;
    startInfoDiv;
    scoreDiv;
    speedDiv;
    parentDiv;

    constructor(){
        this.parentDiv = document.getElementById('ui');
        this.createScoreInfo();
        this.createSpeedInfo();
        this.createPauseInfo();
        this.createStartInfo();
        
    }

    createPauseInfo(){
        this.pauseMenuDisplayed = false;


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
    }

    createStartInfo(){
        // create start info div
        this.startInfoDisplayed = true;
        this.startInfoDiv = document.createElement('div');
        this.startInfoDiv.id = 'startDiv';
        // create inside div
        let innerDivStartTitle = document.createElement('div');
        innerDivStartTitle.id = 'startDivInnerTitle';

        // create text node
        let startMenuText = document.createTextNode("PRESS SPACE TO START");
        innerDivStartTitle.appendChild(startMenuText);

        this.startInfoDiv.appendChild(innerDivStartTitle);
    }

    createScoreInfo(){
        this.scoreDiv = document.createElement('div');
        this.scoreDiv.id = "scoreParentDiv";

        let innerScoreDiv = document.createElement('div');

        let textNode1 = document.createTextNode("Score: ");
        innerScoreDiv.appendChild(textNode1);

        let span = document.createElement('span');
        span.id = 'score';
        innerScoreDiv.appendChild(span);

        this.scoreDiv.appendChild(innerScoreDiv);

        this.parentDiv.appendChild(this.scoreDiv);

    }

    createSpeedInfo(){
        this.speedDiv = document.createElement('div');
        this.speedDiv.id = "speedParentDiv";

        let innerSpeedDiv = document.createElement('div');

        let textNode1 = document.createTextNode("Speed: ");
        innerSpeedDiv.appendChild(textNode1);

        let span = document.createElement('span');
        span.id = 'speed';
        innerSpeedDiv.appendChild(span);

        let textNode2 = document.createTextNode(" ticks/s");
        innerSpeedDiv.appendChild(textNode2);

        this.speedDiv.appendChild(innerSpeedDiv);



        this.parentDiv.appendChild(this.speedDiv);
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