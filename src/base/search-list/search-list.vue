<template>
  <div class="search-list">
    <ul>
      <li class="search-item" v-for="(item, index) in searches" :key="index">
        <span class="text">{{item}}</span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'search-list',
  props: {
    searches: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .search-item
    display flex
    align-items center
    height 40px
    overflow hidden
    .text
      flex 1
      color: $color-text-l
    .icon
      position relative
      .icon-delete
        font-size $font-size-small
        color $color-text-d
</style>
