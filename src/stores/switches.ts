import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import { useRoute } from 'vue-router';

export type Switch = {
    text: string;
    disabled?: boolean;
    checked: boolean,
    id: number
}

function getRandomTargetID(length: number): number{
    return Math.floor(Math.random() * length)
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
const default_data = [
        {text: "Fix Bug #10"},
        {text: "Fix Bug #99"},
        {text: "Fix Bug #120"},
        {text: "Reasonnable deadlines", disabled: true},
    ].map((x, i) => {
         return {
            ...x,
            checked: true,
            id: i
        }
    })
function parseURLparameters(): Switch[]{
    
    const query = useRoute().query
    if (query.d){

        if (!query.d || typeof query.d == "string"){
            return default_data
        }
        return query.d.map((x,id) => {
            if (!x){
                return {
                    text: "Fix Bug #10",
                    id,
                    checked: false,
                }
            }
            const text = x.slice(0, -1)
            const disabled = !!+x.slice(-1)
            return {
                text,
                disabled,
                checked: false,
                id
            }
        })
    }
    return default_data
}

export const useSwitchStore = defineStore('switches', () => {
    const switches = reactive([] as Switch[])
    function enabled_count(): number{
        return switches.filter(x => !x.disabled).length
    }
    function count(): number{
        return switches.filter(x => x.checked).length
    }
    function init(new_switches: Switch[]){
        switches.length = 0
        switches.push(...new_switches)
    }
    function add_new(text: string){
            switches.push({
            text,
            disabled: false,
            checked: false,
            id: switches.length
        })
    }
    function remove(id: number){
        // update ids of all the one after because ID are sync with their real place
        for(let i = id + 1; i < switches.length; i++){
            switches[i].id -= 1
        }
        const removed = switches.splice(id, 1)[0]
        const first_target = switches.findIndex(x => x.checked)
        if (~first_target){
            NoAllChecked(first_target)
        }   
    }
    function NoAllChecked(id: number){
        if ( count() == enabled_count()){
            // if you have disabled everything...
            if (switches.filter(x => x.checked && !x.disabled).length <= 1){
                const target = document.querySelectorAll('[data-switch-target="cs"] input')[id] as HTMLInputElement
                target.checked = false
                return
            }
            // so I don't close the one I'm clicking on, while still making things random
            let random = getRandomTargetID(switches.length)
            while(random == id || switches[random].disabled){
                random = getRandomTargetID(switches.length)
            }
            const target = document.querySelectorAll('[data-switch-target="cs"] input')[random] as HTMLInputElement
            target.checked = false
            
        }
    }
        watch(switches, function(){
            setURL(switches)
        })
    init(parseURLparameters())
    return { enabled_count, switches, init, add_new, remove, NoAllChecked}
})
