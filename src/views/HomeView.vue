<script lang="ts" setup>
import CustomSwitchWrapper from '@/components/CustomSwitchWrapper.vue';
import ChangeSwitchValue from '@/components/ChangeSwitchValue.vue';
import { useSwitchStore } from '@/stores/switches';
import { ref } from 'vue';

const switches = useSwitchStore()
function getRandomTargetID(targets: HTMLInputElement[]): number{
    return Math.floor(Math.random() * targets.length)
}
function onAccept(id: number){
    switches.increment()
    if (switches.count == switches.enabled_count){
        //@ts-ignore fish
        const targets = [...document.querySelectorAll('#switch-meme-target input[type="checkbox"]')].filter(x => x.checked) as HTMLInputElement[]
        let random = getRandomTargetID(targets)
        while(random == id){
            random = getRandomTargetID(targets)
        }
        targets[random].click()
        
    }
}
function onReject(){
    switches.decrement()
}
const menuOpen = ref(false)
function toggleMenuOpen(){menuOpen.value = !menuOpen.value}
function newSwitch(){
    switches.texts.push({
        text: "",
        disabled: false
    })
}
</script>
<template>
<div class="wrapper-switches">
    <div id="switch-meme-target">
        <CustomSwitchWrapper v-for="(text, index) in switches.texts" :text="text.text" :disabled="text.disabled" :id="index"
        @accept="onAccept" @reject="onReject"/>
    </div>
    <div class="open-switches-params" @click="toggleMenuOpen">
        {{ `${menuOpen ? "Close" : "Open"} Switches Params` }}
    </div>
    <div v-if="menuOpen">
        <ChangeSwitchValue v-for="(text, index) in switches.texts" :text="text.text" :id="index" :disabled="text.disabled"/>
        <button @click="newSwitch">
            + New Switch
        </button>
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