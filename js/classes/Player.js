
class Player extends Sprite {
    constructor({collisionBlocks = [], imageSrc, scale, frameRate, frameBuffer, animations, loop, lastDirection}) {
        super({imageSrc, scale, frameRate, frameBuffer, animations, loop, lastDirection})
        this.position = {
            x: 20,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = .4
        this.collisionBlocks = collisionBlocks
        this.lastDirection = lastDirection
    }
 
    updateCameraBox (){
        this.camerabox = {
            position: {
                x: this.position.x - 180,
                y: this.position.y +8
            },
            width: 400,
            height: 10
        }
    }
    shouldPanCameraToTheLeft({canvas, camera}){
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        if(this.camerabox.position.x >= 5396) return
        if(cameraboxRightSide >= canvas.width - 400) {
            camera.position.x = -this.position.x + 400

        background01.position.x += background01.velocity.x
        if(player.velocity.x > 0 && player.velocity.x != 0) background01.velocity.x = player.velocity.x -1
        if(player.velocity.x < 0 && player.velocity.x != 0) background01.velocity.x = player.velocity.x +1
        if(player.velocity.x === 0) background01.velocity.x = 0

        background02.position.x += background02.velocity.x
        if(player.velocity.x > 0 && player.velocity.x != 0) background02.velocity.x = player.velocity.x -2
        if(player.velocity.x < 0 && player.velocity.x != 0) background02.velocity.x = player.velocity.x +2
        if(player.velocity.x === 0) background02.velocity.x = 0
            
        background03.position.x += background03.velocity.x
        if(player.velocity.x > 0 && player.velocity.x != 0) background03.velocity.x = player.velocity.x -3
        if(player.velocity.x < 0 && player.velocity.x != 0) background03.velocity.x = player.velocity.x +3
        if(player.velocity.x === 0) background03.velocity.x = 0
        }
    }
    shouldPanCameraToTheRight({canvas, camera}){

        if(this.camerabox.position.x <= 14) return
        if(this.camerabox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }
    update(){       
        this.updateHitbox()       
        this.position.x += this.velocity.x
        this.updateHitbox() 
        this.colisionHorizontal()
        this.applyGravity()
        this.updateHitbox()        
        this.colisionVertical()
        this.updateCameraBox()
        this.shouldPanCameraToTheLeft({canvas, camera})
        this.shouldPanCameraToTheRight({canvas, camera})
        this.moverObj(proyectiles)
        this.dibujarHitboxC(enemigos)
        this.colisionPlayerHitboxC(enemigos)
        this.colisionProyectilesHitboxC(enemigos)  
        this.posturaEnemigos(enemigos)
        this.moverObj(proyectilesEnemigos)
        this.dibujarHitboxC(proyectilesEnemigos)
        this.colisionPlayerHitboxC(proyectilesEnemigos)
        this.dibujarHitboxObjetos(objetos)
        this.colisionPlayerHitboxO(objetos)
        this.transicionM()
        this.moverObj(enemigos)
    } 
    handleInput(keys){
        if(this.preventInput || muerte === true || preventTransicion === true || lives <= 0) return
        
        this.velocity.x = 0

        if(keys.ArrowRight.pressed  && this.hitbox.position.x + this.hitbox.width <= 6180 && level != 0) {  

            this.velocity.x = 7
            this.lastDirection = 'right'            

            if(keys.Space.pressed) this.switchSprite('ataqueRight')
            else if(this.velocity.y != 0) this.switchSprite('jumpRight')                        
            else if(this.velocity.y === 0) this.switchSprite('runRight')
        }
        else if(keys.ArrowLeft.pressed &&  this.hitbox.position.x >= 10 && level != 0) { 

            this.velocity.x = -7
            this.lastDirection = 'left'

            if(keys.Space.pressed) this.switchSprite('ataqueLeft')
            else if(this.velocity.y === 0) this.switchSprite('runLeft')
            else if(this.velocity.y != 0) this.switchSprite('jumpLeft')            
        }
        else if(this.velocity.y < 0 &&  this.lastDirection === 'right' && !keys.Space.pressed) this.switchSprite('jumpRight') 
        else if(this.velocity.y > 0 &&  this.lastDirection === 'right' && !keys.Space.pressed) this.switchSprite('jumpRight')
        
        else if(this.velocity.y < 0 && this.lastDirection === 'left' && !keys.Space.pressed) this.switchSprite('jumpLeft')

        else if(keys.Space.pressed && this.lastDirection === 'right') {
            this.switchSprite('ataqueRight')
        }
        else if(keys.Space.pressed && this.lastDirection === 'left') {
            this.switchSprite('ataqueLeft')
        }

        else {
            if(this.lastDirection === 'left' && this.velocity.y === 0) this.switchSprite('idleLeft')
            if(this.lastDirection === 'right' && this.velocity.y === 0) this.switchSprite('idleRight')
        }
        if(hit === true) {
            if(this.lastDirection === 'left') this.switchSprite('hurtL')
            if(this.lastDirection === 'right') this.switchSprite('hurtR')
        }
    }
    switchSprite(name) {
        if(this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }
    switchSpriteEnemigos(name, enemigo, indice) {
        for(let i = 0; i < enemigo.length; i++) {
            if(indice.image === indice.animations[name].image) return
            indice.currentFrame = 0
            indice.image = indice.animations[name].image
            indice.frameRate = indice.animations[name].frameRate
            indice.frameBuffer = indice.animations[name].frameBuffer
            indice.loop = indice.animations[name].loop
            indice.currentAnimation = indice.animations[name]
        }
    }
    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 8,
                y: this.position.y + 4 
            },
            width: 46,
            height: 60
        }
    }
    colisionHorizontal() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            if(this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
               this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
               this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
               this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height){
                                      
                    if(this.velocity.x < 0) {
                        player.velocity.x = 0
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                    }
                    if(this.velocity.x > 0) {
                        player.velocity.x = 0
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01
                        break
                    }
            }
        }
    }    
    applyGravity() {

        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
        
    }
    colisionVertical(){
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if(this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
               this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
               this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
               this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height){
                    
                    if(this.velocity.y < 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01                        
                        break
                    }
                    if(this.velocity.y > 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
            }
        }
    }
    disparar() {

        if(this.lastDirection === 'right' && municion >= 1) {

                setTimeout(() => {
                    proyectiles.push(
                        new Sprite({
                            position: {
                                x: this.hitbox.position.x + 34,
                                y: this.hitbox.position.y + 20
                            },
                            velocity: {
                                x: 9 + player.velocity.x/2,
                                y: 0
                            },
                            imageSrc: 'img/proyectiles/naranja.png',
                            frameRate: 1,
                            frameBuffer: 2,
                            scale: 1,
                            identificador: 'disparo',
                            vida: 1,
                            posicion: this.hitbox.position.x + 68
                        })
                    )
                }, 10)
        }
        if(this.lastDirection === 'left' && municion >= 1) {

                setTimeout(() => {

                    proyectiles.push(
                        new Sprite({
                            position: {
                                x: this.hitbox.position.x - 20,
                                y: this.hitbox.position.y + 20
                            },
                            velocity: {
                                x: -9 + player.velocity.x/2,
                                y: 0
                            },
                            imageSrc: 'img/proyectiles/naranja.png',
                            frameRate: 1,
                            frameBuffer: 2,
                            scale: 1,
                            identificador: 'disparo',
                            vida: 1,
                            posicion: this.hitbox.position.x - 100
                        })
                    )
                }, 10)
        }
    }
    dibujarHitboxC(obj) {

        for(let i = 0; i < obj.length; i++) {

            if(obj[i].direccion === 'right') {
                obj[i].hitboxCR.x = obj[i].position.x + obj[i].velocity.x + obj[i].hitboxCR.disX
                obj[i].hitboxCR.y = obj[i].position.y + obj[i].hitboxCR.disY       
            }
            if(obj[i].direccion === 'left') {
                obj[i].hitboxCL.x = obj[i].position.x + obj[i].velocity.x + obj[i].hitboxCL.disX
                obj[i].hitboxCL.y = obj[i].position.y + obj[i].hitboxCL.disY       
            }
        }        
    }
    colisionPlayerHitboxC(obj) {

        for(let i = 0; i < obj.length; i++) {

            let hitBoxX, hitBoxY, hitBoxW, hitBoxH

            if(obj[i].direccion === 'right') {

                hitBoxX = obj[i].hitboxCR.x
                hitBoxW = obj[i].hitboxCR.width
                hitBoxY = obj[i].hitboxCR.y
                hitBoxH = obj[i].hitboxCR.height
            }
            if(obj[i].direccion === 'left') {

                hitBoxX = obj[i].hitboxCL.x
                hitBoxW = obj[i].hitboxCL.width
                hitBoxY = obj[i].hitboxCL.y
                hitBoxH = obj[i].hitboxCL.height
            }

            if(this.hitbox.position.x <= hitBoxX + hitBoxW &&
                this.hitbox.position.x + this.hitbox.width >= hitBoxX &&
                this.hitbox.position.y + this.hitbox.height >= hitBoxY &&
                this.hitbox.position.y <= hitBoxY + hitBoxH && 
                obj[i].vida > 0 && lives >= 1 && muerte === false && 
                level != 0 && ganar === false) {
                    
                    audioCollision.volume = .15       
                    audioCollision.currentTime = 0
                    audioCollision.play()

                    audioMuerte.volume = .2
                    audioMuerte.currentTime = 0
                    audioMuerte.play()

                    obj[i].vida = 0
                    obj[i].velocity.x = 0
                    
                    lives = lives - 5
                    
                    hit = true
                   
                    setTimeout(() => {
                        hit = false
                    }, 200)

                    if(lives <= 0) {
                        audioOver.volume = .2
                        audioOver.play()                            
                    }

                    if(obj[i] != undefined && obj[i].vida <= 0) {

                        let disMX, disMY, hitBMX, hitBMY

                        if(obj[i].direccion === 'right') {

                            hitBMX = obj[i].hitboxCR.x
                            hitBMY = obj[i].hitboxCR.y
                            disMX = obj[i].hitboxCR.efectoMX
                            disMY = obj[i].hitboxCR.efectoMY
                        }

                        if(obj[i].direccion === 'left') {

                            hitBMX = obj[i].hitboxCL.x
                            hitBMY = obj[i].hitboxCL.y
                            disMX = obj[i].hitboxCL.efectoMX
                            disMY = obj[i].hitboxCL.efectoMY
                        }

                        if(obj[i] != undefined && obj[i].vida <= 0) {
                            
                            efectoEnemigos.push(
                                new Sprite({
                                    position: {
                                        x: hitBMX + disMX,
                                        y: hitBMY + disMY
                                    },
                                    velocity: {
                                        x: 0,
                                        y: 0
                                    },
                                    imageSrc: 'img/enemigos/hit2.png',
                                    frameRate: 6,
                                    frameBuffer: 6,
                                    scale: 1,
                                    identificador: 'hit',
                                    vida: 1,
                                    loop: true,
                                    autoplay: true
                                })
                            )
                        }
                        setTimeout(function() {
                            efectoEnemigos.splice(0, 1)
                        }, 500)
                        if(obj[i] != undefined && obj[i].vida <= 0) obj.splice(i,1)

                        if(obj[i] != undefined && obj[i].identificador === 'disparoE' && obj[i].vida <= 0 ) {
                
                            let distanX = - 40
                            let distanY = - 60
                            let sour = 'hitE'
                            let fra = 4
                            let sca = 1
                            let tiemp = 300
            
                            if(obj[i] != undefined && obj[i].direccion === 'right' && obj[i].identificador2 === 'disparoEB') {
                                distanX =  70
                                distanY = -5
                                sour = 'hitB'
                                fra = 7
                                sca = 2.5
                                tiemp = 500
                            }
                            if(obj[i] != undefined && obj[i].direccion === 'left' && obj[i].identificador2 === 'disparoEB') {
                                distanX =  -30
                                distanY = -5
                                sour = 'hitB'
                                fra = 7
                                sca = 2.5
                                tiemp = 500
                            }
                            
                            if(obj[i] != undefined && obj[i].identificador3 === 'disparoB3') sour = 'hitB3'

                            efectoProyectilesEnemigos.push(
                                new Sprite({
                                    position: {
                                        x: proyectilesEnemigos[i].position.x + distanX,
                                        y: proyectilesEnemigos[i].position.y + distanY 
                                    },
                                    velocity: {
                                        x: 0,
                                        y: 0
                                    },
                                    imageSrc: './img/proyectiles/'+sour+'.png',
                                    frameRate: fra,
                                    frameBuffer: 4,
                                    scale: sca,
                                    identificador: 'explosionE',
                                    vida: 1,
                                    loop: false,
                                    autoplay: true
                                })
                            )
                            setTimeout(function() {
                                efectoProyectilesEnemigos.splice(0, 1)
                            }, tiemp)
                        }    
                        
                        if(obj[i] != undefined && obj[i].vida <= 0 && obj[i].identificador === 'disparoE') obj.splice(i,1)
                    }
            }           
        }
    }
    colisionProyectilesHitboxC(obj) {
        
        for(let i = 0; i < obj.length; i++) {
        for(let j = 0; j < proyectiles.length; j++) {


                let hitBoxX, hitBoxY, hitBoxW, hitBoxH

                if(obj[i] != undefined && obj[i].direccion === 'right') {

                    hitBoxX = obj[i].hitboxCR.x
                    hitBoxW = obj[i].hitboxCR.width
                    hitBoxY = obj[i].hitboxCR.y
                    hitBoxH = obj[i].hitboxCR.height
                }
                if(obj[i] != undefined && obj[i].direccion === 'left') {

                    hitBoxX = obj[i].hitboxCL.x
                    hitBoxW = obj[i].hitboxCL.width
                    hitBoxY = obj[i].hitboxCL.y
                    hitBoxH = obj[i].hitboxCL.height
                }

                if(proyectiles[j] != undefined && proyectiles[j].position.x <= hitBoxX + hitBoxW &&
                    proyectiles[j].position.x + proyectiles[j].width >= hitBoxX &&
                    proyectiles[j].position.y + proyectiles[j].height + proyectiles[j].velocity.y >= hitBoxY &&
                    proyectiles[j].position.y <= hitBoxY + hitBoxH && 
                    obj[i].vida > 0 && lives >= 1 && muerte === false && level != 0  && ganar === false) {

                        audioCollision.volume = .15       
                        audioCollision.currentTime = 0
                        audioCollision.play()

                            obj[i].vida = 0
                            obj[i].velocity.x = 0
                        

                        proyectiles[j].vida = 0
                        score = score + 100

                        if(lives <= 0) {
                            audioDeath.volume = .5
                            audioDeath.play()
                        }

                        if(obj[i] != undefined) {

                            let disMX, disMY, hitBMX, hitBMY

                            if(obj[i].direccion === 'right') {

                                hitBMX = obj[i].hitboxCR.x
                                hitBMY = obj[i].hitboxCR.y
                                disMX = obj[i].hitboxCR.efectoMX
                                disMY = obj[i].hitboxCR.efectoMY
                            }

                            if(obj[i].direccion === 'left') {

                                hitBMX = obj[i].hitboxCL.x
                                hitBMY = obj[i].hitboxCL.y
                                disMX = obj[i].hitboxCL.efectoMX
                                disMY = obj[i].hitboxCL.efectoMY
                            }

                            if(obj[i] != undefined) {
                                
                                efectoEnemigos.push(
                                    new Sprite({
                                        position: {
                                            x: hitBMX + disMX,
                                            y: hitBMY + disMY
                                        },
                                        velocity: {
                                            x: 0,
                                            y: 0
                                        },
                                        imageSrc: './img/enemigos/hit2.png',
                                        frameRate: 6,
                                        frameBuffer: 6,
                                        scale: 1,
                                        identificador: 'hit',
                                        vida: 1,
                                        loop: true,
                                        autoplay: true
                                    })
                                )
                            }
                            setTimeout(function() {
                                efectoEnemigos.splice(0, 1)
                            }, 500)
                        }
                        if(proyectiles[j] != undefined && proyectiles[j].vida <= 0) proyectiles.splice(j,1) 
                        if(obj[i] != undefined && obj[i].vida <= 0) obj.splice(i,1)
                }                
            }
        }
    }
    moverObj(obj) {
        for(let i = 0; i < obj.length; i++) {

            obj[i].position.x += obj[i].velocity.x
            obj[i].position.y += obj[i].velocity.y
        
            if(obj[i] != undefined && obj[i].identificador === 'disparo' && obj[i].position.x > obj[i].posicion + 300 ||
            obj[i] != undefined && obj[i].identificador === 'disparo' && obj[i].position.x < obj[i].posicion - 250) {
                
                let disX = 0
                let disY = -24

                if(obj[i] != undefined && obj[i].velocity.x < 0) disX = -30
                if(obj[i] != undefined && obj[i].velocity.x > 0) disX = 0

                efectoProyectiles.push(
                    new Sprite({
                        position: {
                            x: obj[i].position.x + disX,
                            y: obj[i].position.y + disY
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        imageSrc: 'img/proyectiles/hit.png',
                        frameRate: 5,
                        frameBuffer: 4,
                        scale: 2,
                        identificador: 'explo',
                        vida: 1,
                        loop: false,
                        autoplay: true
                    })
                )
                setTimeout(function() {
                    efectoProyectiles.splice(0, 1)
                }, 300)
                obj.splice(i,1)
            }

            if(obj[i] != undefined && obj[i].identificador === 'disparoE' && obj[i].position.x > obj[i].posicion + 450 ||
               obj[i] != undefined && obj[i].identificador === 'disparoE' && obj[i].position.x < obj[i].posicion - 400) {
                
                let distanX = - 30
                let distanY = - 16
                let sour = 'hit'
                let fra = 5
                let sca = 2
                let tiemp = 300
            
                obj[i].vida = 0
                efectoEnemigos.push(
                    new Sprite({
                        position: {
                            x: proyectilesEnemigos[i].position.x + distanX,
                            y: proyectilesEnemigos[i].position.y + distanY 
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        imageSrc: 'img/proyectiles/'+sour+'.png',
                        frameRate: fra,
                        frameBuffer: 4,
                        scale: sca,
                        identificador: 'explosionE',
                        vida: 1,
                        loop: false,
                        autoplay: true
                    })
                )
                setTimeout(function() {
                    efectoEnemigos.splice(0, 1)
                }, tiemp)

                if(obj[i].vida <= 0) obj.splice(i, 1)
            }
            if(obj[i] != undefined && obj[i].identificador2 === 'moverX' && obj[i].vida >= 1) {
                    
                if(obj[i].position.x <= obj[i].movimientoX.posicion - obj[i].movimientoX.distI) {

                    obj[i].direccion = 'right'
                    obj[i].velocity.x = 2
                }
                if(obj[i].position.x >= obj[i].movimientoX.posicion + obj[i].movimientoX.distD) {

                    obj[i].direccion = 'left'
                    obj[i].velocity.x = -2
                }
            }
            if(obj[i] != undefined && obj[i].identificador2 === 'moverY' && obj[i].vida >= 1) {
                    
                if(obj[i].position.y <= obj[i].movimientoY.posicion - obj[i].movimientoY.distI) {

                    obj[i].velocity.y = 2
                }
                if(obj[i].position.y >= obj[i].movimientoY.posicion + obj[i].movimientoY.distD) {

                    obj[i].velocity.y = -5
                }
            }
            if(obj[i] != undefined && obj[i].vida >= 1 && obj[i].identificador === 'murcielago') {

                if(player.hitbox.position.x +15 < obj[i].position.x +70) {
                    obj[i].velocity.x =  -1.5
                }
                if(player.hitbox.position.x -15> obj[i].position.x +70) {
                    obj[i].velocity.x = 1.5
                }
                if(player.hitbox.position.y + 15 < obj[i].position.y + 70) {
                    obj[i].velocity.y =  -1.5
                }
                if(player.hitbox.position.y - 15 > obj[i].position.y +70) {
                    obj[i].velocity.y = 1.5
                }                
            }
        }
    }    
    posturaEnemigos(obj) {
        for(let i = 0; i < obj.length; i++) {

            if(obj[i].velocity.x > 0 && obj[i].velocity.x != 0.001 && obj[i].vida >= 1) {
                obj[i].direccion = 'right'
                this.switchSpriteEnemigos('runR', obj, obj[i])
            }
            if(obj[i].velocity.x < 0 && obj[i].velocity.x != -0.001 && obj[i].vida >= 1) {
                obj[i].direccion = 'left'
                this.switchSpriteEnemigos('runL', obj, obj[i])
            }
            if(obj[i].velocity.x === 0.001 && obj[i].vida >= 1) {

                this.switchSpriteEnemigos('attackR', obj, obj[i])
            }
            if(obj[i].velocity.x === -0.001 && obj[i].vida >= 1) {

                this.switchSpriteEnemigos('attackL', obj, obj[i])
            }
            if(obj[i].velocity.y != 0 && obj[i].vida >= 1 && obj[i].direccion === 'left' && obj[i].velocity.x === 0) {

                this.switchSpriteEnemigos('runL', obj, obj[i])
            }
            if(obj[i].velocity.y != 0 && obj[i].vida >= 1 && obj[i].direccion === 'right' && obj[i].velocity.x === 0) {

                this.switchSpriteEnemigos('runR', obj, obj[i])
            }
            if(obj[i].velocity.x === 0 && obj[i].direccion === 'right' && obj[i].identificador != 'boss' && obj[i].vida >= 1 && obj[i].velocity.y === 0) this.switchSpriteEnemigos('idleR', obj, obj[i])
            if(obj[i].velocity.x === 0 && obj[i].direccion === 'left' && obj[i].identificador != 'boss' && obj[i].vida >= 1 && obj[i].velocity.y === 0) this.switchSpriteEnemigos('idleL', obj, obj[i])

        }
    }
    dibujarHitboxObjetos(obj) {

        for(let i = 0; i < obj.length; i++) {

                obj[i].hitboxO.x = obj[i].position.x + obj[i].hitboxO.disX
                obj[i].hitboxO.y = obj[i].position.y + obj[i].hitboxO.disY       
        }        
    }
    colisionPlayerHitboxO(obj) {
        for(let i = 0; i < obj.length; i++) {

            if(this.hitbox.position.x <= obj[i].hitboxO.x + obj[i].hitboxO.width &&
            this.hitbox.position.x + this.hitbox.width >= obj[i].hitboxO.x &&
            this.hitbox.position.y + this.hitbox.height + this.velocity.y >= obj[i].hitboxO.y &&
            this.hitbox.position.y <= obj[i].hitboxO.y + obj[i].hitboxO.height && obj[i].vida >= 1 && muerte === false && level != 0  && ganar === false){

                
                if(obj[i].identificador === 'municion') {

                    audioVictoria.volume = .07
                    audioVictoria.currentTime = 0
                    audioVictoria.play()

                    municion = municion + obj[i].identificador2
                    obj[i].vida = 0
                }
                if(obj[i].identificador === 'reloj') {

                    audioVictoria.volume = .07
                    audioVictoria.currentTime = 0
                    audioVictoria.play()

                    timer = timer + obj[i].identificador2
                    obj[i].vida = 0
                }
                if(obj[i].identificador === 'corazon') {

                    audioVictoria.volume = .1
                    audioVictoria.currentTime = 0
                    audioVictoria.play()

                    lives = lives + 10
                    obj[i].vida = 0
                }
                if(obj[i].identificador === 'nivel') {

                    player.velocity.x = 0

                    setTimeout(() => {
                        audioTransporte.volume = .07
                        audioTransporte.currentTime = 0
                        audioTransporte.play()
                    }, 300)

                    obj[i].vida = 0
                    player.velocity.x = 0
                    
                    setTimeout(() => {
                       transicionN() 
                    }, 300)
                    
                }
                if(obj[i].identificador === 'ganar' && lives >= 1) {

                    setTimeout(() => {
                        audioVictoria2.volume = .2
                        audioVictoria2.currentTime = 0
                        audioVictoria2.play()                                                    
                    }, 1000)

                    obj[i].vida = 0

                    player.velocity.x = 0
                    ganar = true

                    if(player.lastDirection === 'left' && player.velocity.x === 0) this.switchSprite('idleLeft')
                    if(player.lastDirection === 'right' && player.velocity.x === 0) this.switchSprite('idleRight')

                    setTimeout(() => {
                        transicionG()
                    }, 800)
                }

                if(obj[i] != undefined && obj[i].identificador != 'nivel' && obj[i].identificador != 'ganar') {
                    efectoObjetos.push(
                        new Sprite({
                            position: {
                                x: obj[i].hitboxO.x + obj[i].hitboxO.efectoX,
                                y: obj[i].hitboxO.y + obj[i].hitboxO.efectoY
                            },
                            velocity: {
                                x: 0,
                                y: 0
                            },
                            imageSrc: './img/objetos/'+obj[i].hitboxO.sourc+'.png',
                            frameRate: obj[i].hitboxO.rate,
                            frameBuffer: 6,
                            scale: obj[i].hitboxO.escala,
                            identificador: 'dust',
                            vida: 1,
                            loop: true,
                            autoplay: true
                        })
                    )

                    setTimeout(function() {
                        efectoObjetos.splice(0, 1)
                    }, 700)
                }                       
            }         
            if(obj[i].vida <= 0 && obj[i].identificador != 'nivel' && obj[i].identificador != 'ganar') obj.splice(i,1)

        }
        if(lives <= 0 || timer <= 0) {
            
            if(timer <= 0 && lives != 0) {
                audioOver.volume = .2
                audioOver.play()                          
            }
            if(level != 0) {
                if(this.lastDirection === 'left') this.switchSprite('muerteL')
                if(this.lastDirection === 'right') this.switchSprite('muerteR')

                player.velocity.x = 0
                player.velocity.y = 0
                
                lives = 0
                muerte = true
                resetIntervalos()
                setTimeout(() => {
                    transicionG()
                }, 3000) 
            }            
        }
    }
    transicionM() {
        for(let i = 0; i < transicion.length; i++) {

            transicion[i].position.x += transicion[i].velocity.x
            transicion[i].position.y += transicion[i].velocity.y           

            if(transicion[i].identificador === 'transicion' && transicion[i].position.x  >= 0) {

                transicion[i].position.x = 0
                transicion[i].velocity.x = 0

                levels[level].init()
                portadaV = false
                
                resetIntervalos()
                
                setTimeout(() => {                                       
                    if(ganar === false && lives >= 1) transicion[i].velocity.x = -14
                }, 1000)
                
                timer = 60
                decreaseTimer()
            }
            
            if(transicion[i].identificador === 'transicion' && transicion[i].position.x  <= -1028) {
                
                transicion[i].velocity.x = 0
                player.preventInput = false
                
                preventTransicion = false
            }
             
        }
    }
}

function dispararEnemigos() {
    let rand = Math.round(Math.random() * (5000 - 3100)) + 3100

    myTimeout3 = setTimeout(function() {
        for(let i = 0; i < enemigos.length; i++) {

            distanciaPlayerEnemigos = Math.sqrt((enemigos[i].position.x - player.position.x) * (enemigos[i].position.x - player.position.x) + (enemigos[i].position.y - player.position.y) * (enemigos[i].position.y - player.position.y))

            if(enemigos[i].vida >= 1 && enemigos[i].identificador4 === 'tirador' && distanciaPlayerEnemigos <= 900) {

                let posX, posY, veloX, sourc, rate, scal, dire, tiempo1

                if(enemigos[i].direccion === 'left') {
                    posX = -8
                    posY = 68
                    veloX = -7
                    sourc = 'botella'
                    rate = 4
                    scal = 3
                    dire = 'left'
                    tiempo1 = 10
                }

                if(enemigos[i].direccion === 'right') {
                    posX = 58
                    posY = 68
                    veloX = 7
                    sourc = 'botella'
                    rate = 4
                    scal = 3
                    dire = 'right'
                    tiempo1 = 10
                }
                if(lives >= 1 && ganar === false) {
                    setTimeout(() => {
                        if(enemigos[i].vida >= 1) {
                            proyectilesEnemigos.push(
                                new Sprite({
                                    position: {
                                        x: enemigos[i].position.x + posX,
                                        y: enemigos[i].position.y + posY
                                    },
                                    velocity: {
                                        x: veloX,
                                        y: 0
                                    },
                                    hitboxCR: {
                                        x: 0, 
                                        y: 0, 
                                        width: 34, 
                                        height: 40,
                                        disX: 0,
                                        disY: 0,
                                        efectoX: -6,
                                        efectoY: -14,
                                        efectoMX: -90,
                                        efectoMY: -90,
                                    },
                                    hitboxCL: {
                                        x: 0, 
                                        y: 0, 
                                        width: 34, 
                                        height: 40,
                                        disX: 10,
                                        disY: 0,
                                        efectoX: -6,
                                        efectoY: -14,
                                        efectoMX: -90,
                                        efectoMY: -90,
                                    },
                                    imageSrc: './img/proyectilesEnemigos/'+sourc+'.png',
                                    frameRate: rate,
                                    frameBuffer: 10,
                                    scale: scal,
                                    identificador: 'disparoE',
                                    direccion: dire,
                                    posicion: enemigos[i].position.x,
                                    vida: 1,
                                    loop: true,
                                    autoplay: true
                                })
                            )
                        } 
                    }, tiempo1)
                }
            }
        }
        dispararEnemigos()
    }, rand)
}
function crearMurcielagos() {
    let rand = Math.round(Math.random() * (12000 - 8000)) + 8000
    myTimeout7 = setTimeout(function() {
    
        if(lives >= 1 && ganar === false) {
            enemigos.push(
                new Sprite({
                    position: {
                        x: 4200,
                        y: 60
                    },
                    velocity: {
                        x: 0,
                        y: 0
                    },
                    hitboxCR: {
                        x: 0, 
                        y: 0, 
                        width: 50, 
                        height: 50,
                        disX: 24,
                        disY: 22,
                        efectoX: 6,
                        efectoY: -18,
                        efectoMX: -90,
                        efectoMY: -90,
                    },
                    hitboxCL: {
                        x: 0, 
                        y: 0, 
                        width: 50, 
                        height: 50,
                        disX: 24,
                        disY: 22,
                        efectoX: -6,
                        efectoY: -14,
                        efectoMX: -90,
                        efectoMY: -90,
                    },
                    movimientoX: {
                        posicion: 490,
                        distI: 300,
                        distD: 300,
                    },
                    imageSrc: './img/enemigos/murcielagoRL.png',
                    frameRate: 3,
                    frameBuffer: 6,
                    loop: true,
                    autoplay: true,
                    scale: 1,
                    identificador: 'murcielago',
                    direccion: 'left',
                    velocidad: 2,
                    vida: 1,
                    animations: {
                        idleR:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRR.png',
                        },
                        idleL:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRL.png',
                        },
                        runR:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRR.png',
                        },
                        runL:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRL.png',
                        },
                        attackR:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRR.png',
                        },
                        attackL:{
                            frameRate: 3,
                            frameBuffer: 6,
                            loop: true,
                            autoplay: true,
                            imageSrc: './img/enemigos/murcielagoRL.png',
                        },
                    },
                }),
            )
            crearMurcielagos()
        }
    }, rand);
}
function transicionN() {
    for(let i = 0; i < transicion.length; i++) {

        transicion[i].velocity.x = 14
        level++
        preventTransicion = true
    }
}
function transicionG() {
    for(let i = 0; i < transicion.length; i++) {
        if(ganar === true) {

            transicion[i].velocity.x = 14
            preventTransicion = true 
        }

        if(muerte === true) {

            transicion[i].velocity.x = 14
            preventTransicion = true               
        }
        
    }
}
function resetIntervalos() {
    clearTimeout(myTimeout7)
    clearTimeout(myTimeout3)
    clearTimeout(timerId)
}
function decreaseTimer() {    
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--   
    }
    
}
