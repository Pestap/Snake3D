export class UI{
    pauseMenuDisplayed;
    pauseMenuDiv;
    parentDiv;

    constructor(){
        this.pauseMenuDisplayed = false;
        this.parentDiv = document.getElementsByTagName('body')[0];
        console.log(this.parentDiv);
        // create menu div and append
        this.pauseMenuDiv = document.createElement('div');
        this.pauseMenuDiv.id = 'pauseDiv';
        // create main text div in pause menu
        let innerDiv = document.createElement('div')
        innerDiv.id = 'pauseDivInnerTextDiv'
        let pauseMenuDivText = document.createTextNode("Game paused");
        innerDiv.appendChild(pauseMenuDivText);

        //append inner div to main
        this.pauseMenuDiv.appendChild(innerDiv);



    }

    switchPauseMenu(){
        console.log(this.parentDiv);
        if(this.pauseMenuDisplayed){
            // stop displaying
            this.parentDiv.removeChild(this.pauseMenuDiv);
            this.pauseMenuDisplayed = false;
        }else{
            // display menu
            this.parentDiv.appendChild(this.pauseMenuDiv);
            this.pauseMenuDisplayed = true;
        }

    }
}