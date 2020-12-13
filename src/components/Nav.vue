<template>
      <nav>
        <router-link to="/money">
          <svg>
            <use xlink:href="#money"></use>
          </svg>
          记账</router-link>
        <router-link to="/labels">
          <svg>
            <use xlink:href="#label"></use>
          </svg>标签</router-link>
        <router-link to="/statistics">
          <svg>
            <use xlink:href="#statistics"></use>
          </svg>统计</router-link>
      </nav>
</template>

<script lang="ts">
const importAll = (requireContext )=> requireContext.keys().forEach(requireContext);
try{
  importAll( require.context('../assets/icons', true, /\.svg$/))
}catch(err){
  console.log(err)
}
export default {
name: "Navs"
}
</script>

<style lang="scss" scoped>
nav{
  border: 1px solid blue;
}
</style>