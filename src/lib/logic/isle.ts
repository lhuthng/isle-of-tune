import MusicalEntity from "./musical-entity"
import Road from "./road";

export default class Isle {

    private rows: number;
    private cols: number;
    private grid: (MusicalEntity | Road | null)[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows).fill(null).map(() => new Array(cols).fill(null));
    }

    get(x: number, y: number): MusicalEntity | Road | null {

        if (x < 0 || x >= this.rows) {
            return null;
        }

        if (y < 0 || y >= this.cols) {
            return null;
        }

        return this.grid[x][y];
    }

    put(x: number, y: number, entity: MusicalEntity | Road) {
        if (this.grid[x][y] !== null) {
            this.delete(x, y);
        }

        this.grid[x][y] = entity;

        if (entity instanceof Road) {
            entity.clear();
            this.getNeighbors(x, y, neighbor => {
                if (neighbor instanceof MusicalEntity) entity.put(neighbor);
            })
        }
        else if (entity instanceof MusicalEntity) {
            this.getNeighbors(x, y, neighbor => {
                if (neighbor instanceof Road) neighbor.put(entity);
            })
        }
    }


    delete(x: number, y: number) {
        const entity = this.grid[x][y];

        if (entity === null) {
            return;
        }

        if (entity instanceof Road) {
            entity.clear();
            return;
        }

        if (entity instanceof MusicalEntity) {
            this.getNeighbors(x, y, neighbor => {
                if (neighbor instanceof Road) neighbor.delete(entity);
            })
        }
    }

    getNeighbors(x: number, y: number, fn: (entity: MusicalEntity | Road | null) => void) {
        [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dy]) => {
            const neighbor = this.get(x + dx, y + dy);
            fn(neighbor);
        })
    }
}