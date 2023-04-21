<script setup>
import {players, groups} from "@/data";
import router from "@/router"
import {GroupBuilder} from '@/scripts/GroupBuilder';
import {Grouper} from "@/scripts/Grouper";
import {ref} from "vue";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import GroupTab from "@/components/GroupTabComponent.vue"
import Button from "primevue/button";
import {onBeforeRouteLeave} from "vue-router";

const hasNoSavedChanges = ref(false);
const playersData = ref(Array.from(players));
const selectedPlayer = ref(null);
const displayingSelectedRow = ref();

const groupBuilder = new GroupBuilder(3, groups)
const grouper = new Grouper(
    groupBuilder.build(),
    player => {
        const index = playersData.value.findIndex(x => x.id === player.id)
        playersData.value.splice(index, 1);
        selectedPlayer.value = null
        hasNoSavedChanges.value = true;
    },
    player => { 
        playersData.value.push(player)
        hasNoSavedChanges.value = true;
    }
)

function onRowSelect (event){
    if (selectedPlayer.value == null){
        selectedPlayer.value = event.data;
        return;
    }

    if (selectedPlayer.value.id !== event.data.id){
        selectedPlayer.value = null
        return;
    }
    
    if (selectedPlayer.value.id === event.data.id){
        grouper.addToGroup(event.data)
    }
}

function removePlayerFromGroup(groupId, index){
    grouper.removeFromGroup(groupId, index)
}

function saveData(){
    const groups = grouper.groups.value
    const keys = Object.keys(groups)
    const requestData = []
    
    keys.forEach(key => {
        const group = groups[key]
        group.data.forEach(element => {
            requestData.push({player_id: element.id, group_id: group.id})
        })
    })
    
    console.log(requestData)
    hasNoSavedChanges.value = false;
}

// eslint-disable-next-line
onBeforeRouteLeave((to, from) => {
    if (hasNoSavedChanges.value === false) return true;

    if (hasNoSavedChanges.value === true && grouper.hasFreeGroup() === true) {
        alert("Для перехода на другую страницу необходимо сохранить изменения");
        return false;
    }

    const confirm = window.confirm("Вы хотите сохранить изменения?");
    if (confirm === false) return false;
    saveData()
    router.push({name: 'home'})
})
</script>

<template>
    <div class="grid">
        <div class="col-1"/>
        <div class="col-5 text-center">
            <p class="text-3xl">Список игроков</p>
            <DataTable v-model:selection="displayingSelectedRow" :value="playersData" @row-select="onRowSelect" selectionMode="single">
                <Column field="id" header="№п/п" style="width: 20%"/>
                <Column field="name" sortable header="Участник" style="width: 30%">
                    <template #body="slotProps">
                        {{slotProps.data.name}}     
                        {{slotProps.data.surname}}
                    </template>
                </Column>
                <Column field="birthday" sortable header="Дата рождения" style="width: 20%"/>
            </DataTable>
        </div>
        <div class="col-1"/>
        <div class="col-4" >
            <div v-for="group in grouper.groups.value" :key="group">
                <GroupTab :group="group" @remove-player="removePlayerFromGroup"/>
            </div>
            <div class="flex justify-content-center">
                <Button :disabled="grouper.hasFreeGroup()" @click="saveData" label="Сохранить" icon="pi pi-check" class="w-3 h-3rem"/>
                <div class="col-6"/>
            </div>
        </div>
    </div>
</template>

<style>
</style>