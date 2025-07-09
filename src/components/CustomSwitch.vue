<script lang="ts" setup>
type Props = {
    value?: boolean
    disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    value: false,
    disabled: false
})
const emits = defineEmits<{
(e: "change", value: boolean): void,
}>()
function change(payload: Event){
    const target = payload.target as HTMLInputElement
    emits("change", target.checked)
}
</script>
<template>
<label class="switch">
    <input type="checkbox" @change="change" :disabled="disabled" :checked="props.value">
    <span class="slider"></span>
</label>
</template>
<style scoped>
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    min-width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

input:disabled + .slider{
    background-color: rgb(126, 73, 73);
    display: inline-block;
    content: "\00d7";
}
</style>