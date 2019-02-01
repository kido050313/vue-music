<template>
  <div class="recommend">
    <div class="recommend-content">
      <div>
        <div class="wrapper">
          <div v-if="showSwiper" class="slider-wrapper">
            <swiper :options="swiperOption">
              <!-- slides -->
              <swiper-slide v-for="item of recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img class="swiper-img" :src="item.picUrl" />
                </a>
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.index">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Slider from 'base/slider/slider'

import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
export default {
  name: 'Recommend',
  components: {
    Scroll
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false
      },
      recommends: [],
      discList: []
    }
  },
  computed: {
    showSwiper () {
      return this.recommends.length
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .wrapper >>> .swiper-pagination-bullet
    background rgba(255, 255, 255, 1) !important
    opacity 1
  .wrapper >>> .swiper-pagination-bullet-active
    width 20px
    border-radius 6px
    background: rgba(249, 247, 249, .8) !important
  .wrapper
    overflow: hidden
    position relative
    height: 0
    padding-bottom: 40%
    background: #eee
    .swiper-img
      width: 100%
  .recommend-list
    .list-title
      height: 65px
      line-height: 65px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    .item
      display flex
      box-sizing border-box
      align-items center
      padding 0 20px 20px 20px
      .icon
        flex 0 0 60px
        width 60px
        padding-right 20px
</style>
