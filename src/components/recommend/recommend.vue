<template>
  <div class="recommend">
    <div class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends" :key="item.index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
export default {
  name: 'Recommend',
  components: {
    Scroll,
    Slider
  },
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .remcommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .remcommend-content
      height 100%
      overflow hidden
  .slider-wrapper
    position relative
    width 100%
    overflow hidden
</style>
