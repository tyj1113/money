<template>
  <svg class="icon" :class="{[classPrefix+'-item']:classPrefix}">
    <use :xlink:href="'#'+this.name"></use>
  </svg>
</template>

<script lang="ts">
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (err) {
  console.log(err);
}
export default {
  name: 'Icon',
  props: ['name','classPrefix']
};
</script>

<style lang="scss" scoped>

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>