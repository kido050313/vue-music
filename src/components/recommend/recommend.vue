<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider">
          <div v-if="showSwiper" class="slider-wrapper">
            <swiper :options="swiperOption">
              <!-- slides -->
              <swiper-slide v-for="item of recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img class="needsclick swiper-img" :src="item.picUrl" @load="loadImage"/>
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
            <li @click="selectItem(item)" class="item" v-for="item in discList" :key="item.index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
// import Slider from 'base/slider/slider'

import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  name: 'Recommend',
  components: {
    Scroll,
    Loading
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
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
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
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
  .slider >>> .swiper-pagination-bullet
    background rgba(255, 255, 255, 1) !important
    opacity 1
  .slider >>> .swiper-pagination-bullet-active
    width 20px
    border-radius 6px
    background: rgba(249, 247, 249, .8) !important
  .slider
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
      .text
        display flex
        flex-direction column
        justify-content center
        flex 1
        line-height 20px
        overflow hidden
        font-size $font-size-medium
        .name
          margin-bottom 10px
          color $color-text
        .desc
          color $color-text-d
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
