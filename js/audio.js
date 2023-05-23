const audioMuerte = new Audio('./audio/muerte.mp3')
const audioShoot = new Audio('./audio/shoot.mp3')
const audioCollision = new Audio('./audio/collision.mp3')
const audioVictoria = new Audio('./audio/victoria.mp3')
const audioVictoria2 = new Audio('./audio/victoria2.mp3')
const audioOver = new Audio('./audio/over.mp3')
const audioTransporte = new Audio('./audio/transporte.mp3')

function mutear() {
    audioMuerte.muted = !audioMuerte.muted
    audioShoot.muted = !audioShoot.muted
    audioCollision.muted = !audioCollision.muted
    audioVictoria.muted = !audioVictoria.muted
    audioVictoria2.muted = !audioVictoria2.muted
    audioOver.muted = !audioOver.muted
    audioTransporte.muted = !audioTransporte.muted
}
