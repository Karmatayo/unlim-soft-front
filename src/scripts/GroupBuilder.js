import {Group} from "@/scripts/Group";

/**
 * @constructor
 */
export class GroupBuilder {
    #capacity
    #data
    
    /**
     * @param capacity {Number} Размер групп
     * @param {Array<{group_id: number}>} data Данные
     */
    constructor(capacity, data) {
        this.#capacity = capacity
        this.#data = data
    }

    /**
     * @return {Array<Group>} Создать группы
     */
    build() {
        const result = {}
        for(let i = 0; i < this.#data.length; i++){
            const id = this.#data[i].group_id
            result[id] = new Group(id, this.#capacity)
        }
        
        return result;
    }
}