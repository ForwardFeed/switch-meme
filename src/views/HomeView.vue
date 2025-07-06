<script lang="ts" setup>
import CustomSwitchWrapper from '@/components/CustomSwitchWrapper.vue';
import ChangeSwitchValue from '@/components/ChangeSwitchValue.vue';
import { useSwitchStore } from '@/stores/switches';
import { ref } from 'vue';

const switches = useSwitchStore()

function onChange(value: boolean, id: number){
    if (value){
        switches.NoAllChecked(id)
    }
}

const menuOpen = ref(false)
function toggleMenuOpen(){menuOpen.value = !menuOpen.value}
function newSwitch(){
    switches.add_new("")
}
</script>
<template>
<div class="wrapper-switches">
    <div id="switch-meme-target">
        <CustomSwitchWrapper v-for="text in switches.switches" :data="text" @change="onChange"/>
    </div>
    <div class="open-switches-params" @click="toggleMenuOpen">
        {{ `${menuOpen ? "Close" : "Open"} Switches Params` }}
    </div>
    <div v-if="menuOpen">
        <ChangeSwitchValue v-for="text in switches.switches" :data="text"/>
        <button @click="newSwitch">+ New Switch</button>
    </div>
</div>
</template>
<style scoped>
.wrapper-switches{
    display: flex;
    flex-direction: column;
}
.open-switches-params{
    cursor: pointer;
}
.open-switches-params:hover{
    color: #2196F3;
}
</style>