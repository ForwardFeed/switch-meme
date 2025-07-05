import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import { useRoute } from 'vue-router';

export type Switch = {
    text: string;
    disabled?: boolean;
}

function setURL(switches: Switch[]){
    router.push({
        query: {
            d: switches.map(x => {
                return `${x.text}${x.disabled ? "1": "0"}`
            })
        }
    })
}

function parseURLparameters(): Switch[]{
    const default_data = [
        {text: "#Bug #10"},
        {text: "#Bug #99"},
        {text: "#Bug 120"},
        {text: "Reasonnable deadlines", disabled: true},
    ]
    const query = useRoute().query
    if (query.d){
        // @ts-ignore fish
        return query.d.map(x => {
            const text = x.slice(0, -1)
            const disabled = !!+x.slice(-1)
            return {
                text,
                disabled
            }
        })
    }
    return default_data
}

export const useSwitchStore = defineStore('switches', () => {
    const count = ref(0)
    const enabled_count = ref(0)
    const texts = reactive([] as Switch[])
    function increment() {
        count.value+= 1
    }
    function decrement() {
        count.value-= 1
    }
    function init(switches: Switch[]){
        texts.length = 0
        texts.push(...switches)
        count.value = 0
        enabled_count.value = texts.filter(x => !x.disabled).length
    }
    watch(texts, function(){
        setURL(texts)
    })
    init(parseURLparameters())
    return { count, enabled_count, texts, decrement, increment, init}
})
