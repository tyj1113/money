<template>
  <div class="numberPad">
    <div class="numberInput">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>0</button>
      <button>.</button>
      <button>ok</button>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberPad'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .numberInput {
    @extend %innerShadow;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;

  }

  .buttons {
    position: relative;

    button {
      width: 25%;
      height: 64px;
      border: none;
      background: transparent;
    }

    $bg: #f2f2f2;;

    :nth-child(1) {
      background: $bg;
    }

    :nth-child(2), :nth-child(5) {
      background: darken($bg, 3%);
    }

    :nth-child(3), :nth-child(6), :nth-child(9) {
      background: darken($bg, 9%);
    }

    :nth-child(4), :nth-child(7), :nth-child(10) {
      background: darken($bg, 12%);
    }

    :nth-child(8), :nth-child(11) {
      background: darken($bg, 15%);
    }

    :nth-child(12) {
      background: darken($bg, 15%);
      width: 50%;
    }

    :nth-child(13) {
      background: darken($bg, 18%);
    }

    :nth-child(14) {
      height: 128px;
      position: absolute;
      bottom: 0;
      right: 0;
      background: darken($bg, 21%);
    }

  }
}
</style>