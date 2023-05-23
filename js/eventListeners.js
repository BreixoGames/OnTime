window.addEventListener('keydown', (event) => {

    if(player.preventInput) return

    switch (event.key){
        case 'Enter':
            if(level === 0){
                
                for(let i = 0; i < transicion.length; i++) {

                    transicion[i].velocity.x = 14
                    level = 1
                    preventTransicion = true
                    enemigos.splice(0, 50)
                    lives = 100
                }
            }
            if(muerte === true){

                resetIntervalos()
                muerte = false
                lives = 100
                timer = 60
                municion = 30
                score = 0
                intro = false
                player.preventInput = false  
                level= 1
                levels[level].init()
                clearTimeout(timerId)

            }
            break

            case 'c':
                if(muerte === true){

                    resetIntervalos()
                    timer = 60
                    municion = 30
                    score = 0
                    intro = false
                    muerte = false
                    player.preventInput = false  
                    lives = 100
                    levels[level].init()
                    clearTimeout(timerId) 

                }
                break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break

        case 'ArrowUp':           
        if(player.velocity.y === 0 && lives > 0 && ganar === false && level != 0 && keys.ArrowUp.pressed === false) {
                keys.ArrowUp.pressed = true
                player.velocity.y = -12
            }
            break

        case ' ':
            if(level != 0 && controlDisparo === true && lives > 0 && municion >= 1) {

                audioShoot.volume = .2        
                audioShoot.currentTime = 0
                audioShoot.play()
                keys.Space.pressed = true            
                controlDisparo = false
                municion--
                player.disparar()                
            }
            break

        case 'a':
            mutear()     
            break
    }
})
window.addEventListener('keyup', (event) => {

    switch (event.key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

        case 'ArrowRight':            
            keys.ArrowRight.pressed = false
            break 

        case 'ArrowUp':            
            keys.ArrowUp.pressed = false
            break 
            
        case ' ':
            keys.Space.pressed = false
            controlDisparo = true
            break
    }
})
