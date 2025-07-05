<script lang="ts" setup>
import { useSwitchStore, type Switch } from '@/stores/switches';
import CustomSwitch from './CustomSwitch.vue';

type Props = {
    text: string,
    id: number,
    disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false
})

const switches = useSwitchStore()
function onInput(payload: Event){
    const target = payload.target as HTMLInputElement
    switches.texts[props.id].text = target.value
}
function onChange(value: boolean){
    switches.texts[props.id].disabled = value
}
function deleteSwitch(){
    switches.texts.splice(props.id, 1)
}
</script>
<template>
<div class="text-input-wrapper">
    <CustomSwitch @change="onChange" :value="props.disabled"/>
    <label class="label-input">
        <input type="text" :value="props.text" @input="onInput">
    </label>
    <button class="delete" @click="deleteSwitch">
        X
    </button>
</div>
</template>
<style scoped>
.text-input-wrapper{
    display: flex;
    width: 100%;
    margin: 0.4em;
}

label{
    display: flex;
    width: 100%;
}
input{
    flex-grow: 1;
    height: 100%;
    margin-left: 2em;
}
.delete{
    margin-left: 2em;
    background-color: rgb(207, 118, 118);
}
</style>