<template>
    <div>
        <input type="text" id="input1" @change="discharge('input1')">
        <input type="text" id="input2" @change="discharge('input2')">
        <button @click="sum">sum</button>
        {{arr}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: 'ww'
        }
    },
    methods: {
        discharge(id) {
            let list = document.getElementById(id);
            list.value = list.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        },
        sum() {
            let list1 = document.getElementById('input1');
            let list2 = document.getElementById('input2');

            let summ = +list1.value.replace(/ /g,"") + +list2.value.replace(/ /g,"")

            this.arr = summ.toFixed(2)

        }
    }
}
</script>