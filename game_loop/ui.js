export class UI{
    pauseMenuDisplayed;
    startInfoDisplayed;
    pauseMenuDiv;
    startInfoDiv;
    scoreDiv;
    speedDiv;
    userDiv;

    parentDiv;

    constructor(){
        this.parentDiv = document.getElementById('ui');
        //this.createLoginDiv();
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

        // create current score div
        let innerScoreDiv = document.createElement('div');

        let textNode1 = document.createTextNode("Score: ");
        innerScoreDiv.appendChild(textNode1);

        let span = document.createElement('span');
        span.id = 'score';
        innerScoreDiv.appendChild(span);

        this.scoreDiv.appendChild(innerScoreDiv);
        // create high score span

        let highScoreDiv = document.createElement('div');
        highScoreDiv.id = 'highScoreDiv';
        let textNode3 = document.createTextNode("High score: ");
        highScoreDiv.appendChild(textNode3);
        
        let span2 = document.createElement('span');
        span2.id = 'highscore';
        highScoreDiv.appendChild(span2);

        this.scoreDiv.appendChild(highScoreDiv);

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

    createLoginDiv(){
        this.userDiv = document.createElement('div');
        this.userDiv.id = 'userDiv';

        // create login form
        let form = document.createElement('form');
        form.id = 'loginForm';

        
        // create label for login
        let userNameLabel = document.createElement('label');
        userNameLabel.for = 'username';
        userNameLabel.classList.add('formLabel');

        let userNameLabelText = document.createTextNode('Login: ');
        userNameLabel.appendChild(userNameLabelText);

        // create input for login
        let userNameInput = document.createElement('input');
        userNameInput.type = 'text';
        userNameInput.id = 'username';
        userNameInput.classList.add('textInput');

        // add input to label
        userNameLabel.appendChild(userNameInput);

        // add login input with label to form
        form.appendChild(userNameLabel);


        // create label for password
        let passwordLabel = document.createElement('label');
        passwordLabel.for = 'password';
        passwordLabel.classList.add('formLabel');

        let passwordLabelText = document.createTextNode("Password: ");
        passwordLabel.appendChild(passwordLabelText);

        // create input for password
        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.classList.add('textInput');

        // add input to label
        passwordLabel.appendChild(passwordInput);

        // add label with input to form
        form.appendChild(passwordLabel);
        
        this.userDiv.appendChild(form);
        this.parentDiv.appendChild(this.userDiv);
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

    initValues(){
        let score_span = document.getElementById('score');
        score_span.innerText = this.snake.size-1;

        let highscore_span = document.getElementById('highscore');
        if(localStorage.getItem('highscore') !== null){
            highscore_span.innerText = localStorage.getItem('highscore');
        }
    }

    updateScore(new_value){
        let score_span = document.getElementById('score');
        score_span.innerText = new_value;
    }
    updateSpeed(new_value){
        let speed_span = document.getElementById('speed');
        speed_span.innerText = new_value;
    }
    updateHighScore(new_value){
        let hscore_span = document.getElementById('highscore');
        hscore_span.innerText = new_value;
    }
}