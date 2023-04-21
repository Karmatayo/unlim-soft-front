<script setup>
import Fieldset from "primevue/fieldset";
import {ref} from "vue";

// eslint-disable-next-line
const props = defineProps({
    group: {
        required: true
    }
})

// eslint-disable-next-line
const emits = defineEmits(['removePlayer'])
const selectedPlayer = ref(null)

const unselectClass = 'text-center bg-purple-100 mb-1 p-1'
const selectClass = 'text-center bg-purple-100 mb-1 p-1 border-1'

function selectPlayer(player, index){
    if(selectedPlayer.value === null){
        selectedPlayer.value = player;
        return;
    }
    
    if(selectedPlayer.value.id !== player.id){
        selectedPlayer.value = null;
        return;
    }
    
    emits('removePlayer', props.group.id, index);
    selectedPlayer.value = null;
}
</script>

<template>
    <Fieldset :legend="`Группа ${props.group.id}`" class="my-3" style="width: 50%">
        <div v-for="(data, index) in props.group.data" :key="index">
            <div v-if="data == null" class="text-center bg-purple-100 mb-1 h-2rem">
            </div>
            <div v-else
                 @click="() => selectPlayer(data, index)" 
                 style="cursor: pointer"
                 :class="selectedPlayer != null && selectedPlayer.id === data.id ? selectClass : unselectClass">
                {{data.name}} {{data.surname}}
            </div>
        </div>
    </Fieldset>
</template>

<style scoped>

</style>