import {ref} from "vue";

/**
 * @constructor
 */
export class Grouper {
    #groups
    #addToGroup
    #removeFromGroup

    /**
     * @param {Array<Group>} groups Группы
     * @param {function} onAddCallback Функция, отвечающая при добавлении
     * @param {function} onRemoveCallback Функция, отвечающая при удалении
     */
    constructor(groups, onAddCallback, onRemoveCallback) {
        this.#groups = ref(groups);
        this.#addToGroup = onAddCallback;
        this.#removeFromGroup = onRemoveCallback;
    }

    /**
     * Добавить игрока в группу
     * @param {Player} player Игрок
     */
    addToGroup(player){
        const {groupId, elementIndex } = this.#findEmptyGroupSlot();
        
        if(groupId === -1){
            return
        }
        
        this.#groups.value[groupId].data[elementIndex] = player
        this.#addToGroup(player)
    }

    /**
     * Удалить из группы
     * @param {Number} groupId ID группы
     * @param {Player} elementIndex Игрок
     */
    removeFromGroup(groupId, elementIndex){
        const element = this.#groups.value[groupId].data[elementIndex];
        if(element === null){
            return;
        }

        this.#groups.value[groupId].data[elementIndex] = null;
        this.#removeFromGroup(element)
    }

    /**
     * Проверить наличие свободного места в группе
     * @return {boolean}
     */
    hasFreeGroup(){
        const freeElement = this.#findEmptyGroupSlot()
        return freeElement.groupId !== -1
    }
    
    #findEmptyGroupSlot() {
        const keys = Object.keys(this.#groups.value)
        
        for (let i = 0; i < keys.length; i++) {
            
            const group = this.#groups.value[keys[i]]
            for (let j = 0; j < group.data.length; j++) {
                const element = group.data[j]
                if (element === null) {
                    return {groupId: group.id, elementIndex: j}
                }
            }
        }

        return {groupId: -1, elementIndex: -1};
    }

    /**
     * Получить группы
     * @return {Array<Group>}
     */
    get groups(){
        return this.#groups
    }
}