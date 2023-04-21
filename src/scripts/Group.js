import {computed} from "vue";

/**
 * @constructor
 */
export class Group {
    #id;
    /**
     * @property {Array} data Слоты группы 
     */
    data;
    #capacity;

    /**
     * @param id {Number} Id группы
     * @param capacity {Number} Кол-во слотов
     */
    constructor(id, capacity) {
        this.#id = id;
        this.#capacity = capacity;

        this.#initData();
    }

    /**
     * Инициализирует слоты
     */
    #initData() {
        this.data = [];
        for (let i = 0; i < this.#capacity; i++) {
            this.data.push(null);
        }
    }

    id = computed(() => {
        return this.#id;
    }) 
}