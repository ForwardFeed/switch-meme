<script lang="ts" setup>
import type { Switch } from '@/stores/switches';
import CustomSwitch from './CustomSwitch.vue';

type Props = {
    data: Switch
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
(e: "change", value: boolean, id:number): void,
}>()
function change(value: boolean){
    // changing that two lines order will fugg things up
    props.data.checked = value
    emits("change", value, props.data.id)
}

</script>
<template>
<div class="wrapper-switch" data-switch-target="cs">
    <CustomSwitch :disabled="props.data.disabled" @change="change"/>
    <span class="text">{{ data.text }}</span>
</div>

</template>
<style scoped>
.wrapper-switch{
    display: flex;
    flex-direction: row;
    margin: 0.4em;
}

.text{
    margin: auto;
    margin-left: 2em;
    font-size: 1.2em;
}
</style>