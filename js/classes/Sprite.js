class Sprite {
    constructor({position, velocity, imageSrc, scale = 1, frameRate = 1, frameBuffer = 2, animations, loop = true, autoplay = true,
        vida, direccion, velocidad, posicion,  identificador, identificador2, identificador3, identificador4, identificador5,
        hitboxCR = {x: 0, y: 0, width: 0, height:0, disX: 0, disY: 0, efectoMX: 0, efectoMY: 0},
        hitboxCL = {x: 0, y: 0, width: 0, height:0, disX: 0, disY: 0, efectoMX: 0, efectoMY: 0},
        hitboxO = {x: 0, y: 0, width: 0, height:0, disX: 0, disY: 0, efectoX: 0, efectoY: 0, sourc: '', escala: 1, rate: 1},
        movimientoX ={posicion: 0, distI: 0, distD: 0},
        movimientoY ={posicion: 0, distU: 0, distD: 0}}) {

        this.position = position
        this.velocity = velocity
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = (this.image.width / this.frameRate) * scale
            this.height = this.image.height * scale
        }
        this.image.src = imageSrc
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = frameBuffer
        this.animations = animations
        this.loop = loop
        this.autoplay = autoplay
        this.currentAnimation
        this.identificador = identificador
        this.identificador2 = identificador2
        this.identificador3 = identificador3
        this.identificador4 = identificador4
        this.identificador5 = identificador5
        this.vida = vida
        this.velocidad = velocidad
        this.posicion = posicion
        this.direccion = direccion
        this.hitboxCR = hitboxCR
        this.hitboxCL = hitboxCL
        this.hitboxO = hitboxO
        this.movimientoX = movimientoX
        this.movimientoY = movimientoY

        if(this.animations) {
            for(let key in this.animations){
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
        }
        
    }
    draw(){
        
        if(!this.loaded) return
        
        const cropbox = {
            position: {
                x: (this.width * this.currentFrame)/this.scale,
                y: 0
            },
            width: this.width/this.scale,
            height: this.height/this.scale
        }
        c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)
    
        this.updateFrames()
    }

    updateFrames() {

        if(!this.autoplay) return

            this.elapsedFrames++ 

            if(this.elapsedFrames % this.frameBuffer === 0){
                if(this.currentFrame < this.frameRate -1) this.currentFrame++
                else if(this.loop) this.currentFrame = 0
            }
            if(this.currentAnimation?.onComplete) {
                if(this.currentFrame === this.frameRate -1 && !this.currentAnimation.isActive) {
                    this.currentAnimation.onComplete()
                    this.currentAnimation.isActive = true
                }
            }
    }
}