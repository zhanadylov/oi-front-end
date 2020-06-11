<template>
  <div>
    <input type="text" id="input1" @change="sum('input1')" />
    <input type="text" id="input2" @change="sum('input2')" />
    <button @click="sum">sum</button>
    {{arr}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: 'ww'
    };
  },
  methods: {
    sum(num) {
      //bitNumber
      // let arr = document.getElementsByClassName('bitNumber')

      // for (let i = 0; i <= arr.length; i++) {
      //   return arr[i].value.toLocaleString('ru')
      // }
      let input = document.getElementById(num);
      input.value.replace(/\s/g, '');
      let val = Number(input.value).toLocaleString('ru');
      console.log(input);
      return (input.value = val);
    }
  }
};
</script>