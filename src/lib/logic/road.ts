import MusicalEntity from "./musical-entity";

export default class Road {

    private set: Set<MusicalEntity>;

    constructor() {
        this.set = new Set<MusicalEntity>();
    }

    put(entity: MusicalEntity) {
        this.set.add(entity);
    }

    delete(entity: MusicalEntity) {
        this.set.delete(entity);
    }

    clear() {
        this.set.clear();
    }

    trigger() {
        this.set.forEach(entity => {
            entity.trigger();
        });
    }
}