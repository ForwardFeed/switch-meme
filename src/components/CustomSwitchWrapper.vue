<script lang="ts" setup>
import CustomSwitch from './CustomSwitch.vue';

type Props = {
    text: string,
    id: number,
    disabled?: boolean
}
const emits = defineEmits<{
(e: "accept", id: number): void,
(e: "reject", id: number): void
}>()
function change(value: boolean){
    if (value) emits("accept", props.id)
    else emits("reject", props.id)
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false
})
</script>
<template>
<div class="wrapper-switch">
    <CustomSwitch :disabled="props.disabled" @change="change"/>
    <span class="text">{{ text }}</span>
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