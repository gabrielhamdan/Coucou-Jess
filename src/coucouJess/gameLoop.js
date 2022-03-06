const playArea = document.querySelector('.play-area');

const player = document.createElement('div');
player.classList.add('jess');

playArea.appendChild(player);



let currentPos = 0;
let jumpHeight = 0;
let onGround = true;

function slide(flip) {
    player.style.left = currentPos + 'px';
    flip === "left" ? player.style.transform = "scaleX(-1)" : player.style.transform = "scaleX(1)";
}

function jump() {
    if(!onGround){
        return
    }
    let jumpTimerId = setInterval(function(){

        if(jumpHeight > 250){
            clearInterval(jumpTimerId);
            let gravityTimerId = setInterval(function() {
                jumpHeight -= 100
                player.style.bottom = jumpHeight + 'px';
                if(jumpHeight < 0) {
                    clearInterval(gravityTimerId);
                    player.style.bottom = '0'
                    onGround = true
                }
            }, 20)
        }

        jumpHeight += 80
        player.style.bottom = jumpHeight + 'px';
    }, 20)
}

function move(e) {
    switch (e.key) {
        case 'ArrowLeft':
            currentPos -= 15
            slide("left")
            break
        case 'ArrowRight':
            currentPos += 15
            slide()
            break
            case ' ':
                jump()
                onGround = false
    }
}

document.addEventListener('keydown', move, jump)