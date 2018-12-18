<template>
  <div class="slide-for-more-base-wrap"
       style="padding:0"
       ref="wrap"
       @touchstart="start"
       @touchend="end"
       @touchmove="move">
    <div class="slide-for-more-top-tip-wrap"
         :class="transition"
         :style="tipWrap">
      <slot name="topTip"/>
    </div>
    <div class="slide-for-more-content"
         :class="transition"
         :style="contentStyle"
         ref="content">
      <slot/>
    </div>
    <div class="slide-for-more-tip-wrap"
         :class="transition"
         :style="bottomTipWrap">
      <slot name="tip"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideForMoreBase',
  props: {
    slideValue: {
      default: 100,
      type: Number,
    },
    isSearching: Boolean,
    tipHeight: {
      type: String,
      default: '40px',
    },
  },
  data() {
    return {
      isBottom: false,
      isTop: false,
      startPointer: null,
      heights: { wrap: 0, wrapOffset: 0, content: 0 },
      height: 0,
      type: '',
    }
  },
  computed: {
    distance() {
      return Math.abs(+this.slideValue)
    },
    slideType() {
      return this.isSearching ? this.type : ''
    },
    cHeight() {
      return this.height ? `${Math.abs(+this.height)}px` : this.tipHeight
    },
    tipWrap() {
      return {
        height: this.cHeight,
        opacity: this.height < 0 || this.isSearching ? 1 : 0,
        bottom: `${this.bottom}px`,
      }
    },
    bottom() {
      const { wrap, content } = this.heights
      return Math.min(0, wrap - content)
    },
    bottomTipWrap() {
      return {
        height: this.cHeight,
        opacity: this.height > 0 || this.isSearching ? 1 : 0,
        bottom: `${this.bottom}px`,
      }
    },
    contentStyle() {
      if (this.height) {
        return { bottom: `${this.height < 0 ? '-' : ''}${this.cHeight}` }
      }
      return { bottom: this.isSearching ? `${this.type === 'slideDown' ? '-' : ''}${this.cHeight}` : '0px' }
    },
    transition() {
      return !this.height ? 'transition' : ''
    },
  },
  methods: {
    start(ev) {
      const { wrap, content } = this.heights
      const scrollTop = this.getScrollTop()
      this.isTop = scrollTop <= 0
      this.isBottom = scrollTop >= content - wrap
      this.startPointer = { pageY: ev.changedTouches[0].pageY }
    },
    move(ev) {
      if ((!this.isBottom && !this.isTop) || this.isSearching) return
      const height = this.startPointer.pageY - ev.changedTouches[0].pageY
      if ((height > 0 && this.isBottom) || (height < 0 && this.isTop)) {
        this.height = height
        ev.preventDefault()
      }
    },
    end(ev) {
      if (!this.isBottom && !this.isTop) return
      const distance = this.startPointer.pageY - ev.changedTouches[0].pageY
      if (this.distance <= distance && this.isBottom) {
        this.$emit(this.type = 'slideUp')
        this.$emit('loadMore')
      } else if (this.distance <= -distance && this.isTop) {
        this.$emit(this.type = 'slideDown')
        this.$emit('refresh')
      }
      this.height = 0
    },
    getHeights() {
      this.$nextTick(() => {
        const { wrap, content } = this.$refs
        if (content) {
          this.heights.content = content.offsetHeight
          this.heights.wrap = wrap.clientHeight
          this.validPaddingTopBottom()
        }
      })
    },
    getScrollTop() {
      if (!this.$refs.wrap) return 0
      return this.$refs.wrap.scrollTop
    },
    validPaddingTopBottom() {
      const { wrap } = this.$refs
      const { paddingTop, paddingBottom } = window.getComputedStyle(wrap)
      if (parseInt(paddingTop, 10) || parseInt(paddingBottom, 10)) {
        console.warn('SlideForMore: The wrap element should not have paddingTop and paddingBottom. You can set padding to content element instead')
      }
    },
  },
  mounted() {
    this.getHeights()
  },
  updated() {
    this.getHeights()
  },
}
</script>
