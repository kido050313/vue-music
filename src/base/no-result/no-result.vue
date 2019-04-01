<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: 'no-result',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .no-result
    text-align center
    .no-result-icon
      width 115px
      height 66px
      margin 0 auto
      background-image url('./no-result.png')
      background-size 115px 66px
    .no-result-text
      margin-top  30px
      font-size $font-size-medium
      color: $color-text-d
</style>
