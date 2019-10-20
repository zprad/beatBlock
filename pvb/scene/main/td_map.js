class TDMap {
    constructor(game, tileSize) {
        this.game = game
        this.w = 6
        this.h = 4
        this.tileSize = tileSize
        this.setInputs()
    }
    static new(...args) {
        return new this(...args)
    }
    setInputs() {
        let grids = []
        for (let i = 0; i < this.w; i++) {
            let column = []
            for (let j = 0; j < this.h; j++) {
                column[j] = 0
            }
            grids.push(column)
        }
        this.grids = grids
    }
    computeRowAndColumn(x, y) {
        let i = Math.floor(x / this.tileSize)
        let j = Math.floor(y / this.tileSize)
        return [i, j]
    }
    addTower(x, y) {
        // 0表示地图上无障碍物，可以行走
        // 10表示地图上有tower，无法行走
        let [row, col] = this.computeRowAndColumn(x, y)
        this.grids[row][col] = 10
    }
    normalGrid() {
        let grids = this.grids
        let pathGraph = []
        for (const column of grids) {
            let colOfGraph = []
            for (const t of column) {
                if (t != 0) {
                    colOfGraph.push(0)
                } else {
                    colOfGraph.push(1)
                }
            }
            pathGraph.push(colOfGraph)
        }
        return pathGraph
    }
}