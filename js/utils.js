Array.prototype.parse2D = function () {
    const rows = []
    for(let i = 0; i < this.length; i += 200) {
        rows.push(this.slice(i, i + 200))
    }

    return rows
    
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if(symbol === 1){
                objects.push(new CollisionBlock({
                    position:{
                        x: x * 32,
                        y: y * 32,
                    }
                }))
            }
        })
    })
    return objects
    
}


