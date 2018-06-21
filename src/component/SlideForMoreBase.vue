<template>
  <div class="slide-for-more-base-wrap"
       :class="wrapClass"
       :style="style.baseWrap"
       @touchstart="start" @touchend="end"
       @touchmove="move">
    <div class="slide-for-more-top-tip-wrap"
         :style="style.tipWrap('top',
         {height:slideType==='slideDown'?tipHeight:-height+'px'},
         slideType==='slideDown'?style.transitionStyle:'')">
      <slot name="topTip"/>
    </div>
    <div class="slide-for-more-content"
         :style="style.content({
         top:slideType==='slideDown'?tipHeight:slideType==='slideUp'?'-'+tipHeight:-height+'px',
         minHeight:contentMinHeight
         },isSearching?style.transitionStyle:'')">
      <slot/>
    </div>
    <div class="slide-for-more-tip-wrap"
         :style="style.tipWrap('bottom',
         {height:slideType==='slideUp'?tipHeight:height+'px'},
         slideType==='slideUp'?style.transitionStyle:'')">
      <slot name="tip"/>
    </div>
  </div>
</template>

<script>
import { getScroll } from '../utils/browser-default';

const c = (f, baseSize) => `calc(${f} * ${baseSize})`;

const style = (baseSize = '100px', defaultStyle = true) => ({
  baseWrap: defaultStyle ?
    {
      position: 'relative',
      background: '#f5f5f5',
    } : {},
  content: (_style = {}, transitionStyle = {}) => Object.assign(
    (defaultStyle ?
      {
        position: 'relative',
        zIndex: 2,
        boxShadow: `0 ${c(0.02, baseSize)} ${c(0.05, baseSize)} rgba(0, 0, 0, .05)`,
        background: '#fafafa',
      } : {}),
    _style,
    transitionStyle,
  ),
  tipWrap: (bottomOrTop = 'bottom', _style = {}, transitionStyle = {}) => Object.assign(
    (defaultStyle ?
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        [bottomOrTop]: 0,
        width: '100%',
        lineHeight: c(0.4, baseSize),
        color: '#ccc',
        overflow: 'hidden',
      } : {}),
    _style,
    transitionStyle,
  ),
  transitionStyle: {
    transition: 'all .5s cubic-bezier(0, 1, 1, 1)', // 请看贝塞尔曲线 https://www.jianshu.com/p/d999f090d333
  },
});

export default {
  name: 'SlideForMoreBase',
  props: {
    baseSize: {
      default: '100px',
      type: String,
    },
    wrapClass: String, // 一旦设置，内置样式全部失效，需要重写所有样式
    slideValue: {
      default: 100,
      type: Number,
    },
    isSearching: Boolean,
    tipHeight: {
      type: String,
      default: '40px',
    },
    contentMinHeight: String,
  },

  data() {
    return {
      isBottom: false,
      isTop: false,
      startPointer: null,
      height: 0,
      type: '',
    };
  },
  computed: {
    distance() {
      return Math.abs(this.slideValue);
    },
    slideType() {
      return this.isSearching ? this.type : '';
    },
    style() {
      const valid = /\d(rem|px|em)$/.test(this.baseSize);
      return style(this.baseSize, !this.wrapClass && valid);
    },
  },
  methods: {
    start(ev) {
      this.isTop = getScroll().top <= 0;
      this.isBottom = getScroll().top
        >= document.body.offsetHeight - (window.screen.availHeight * window.devicePixelRatio);
      // 上面的表达式有一定误差：手机浏览器可能会有状态栏。
      // 但是如果使用 document.documentElement.clientHeight
      // 有些浏览器（比如UC）到达页面底部的时候
      // window.pageYOffset + document.documentElement.clientHeight 的值会小于 document.body.offsetHeight
      // => window.pageYOffset < document.body.offsetHeight - document.documentElement.clientHeight
      // 导致无法触发 move 和 end
      this.startPointer = { pageY: ev.changedTouches[0].pageY };
    },
    move(ev) {
      if ((!this.isBottom && !this.isTop) || this.isSearching) return;
      const height = this.startPointer.pageY - ev.changedTouches[0].pageY;
      if ((height > 0 && this.isBottom) || (height < 0 && this.isTop)) this.height = height;
    },
    end(ev) {
      if (!this.isBottom && !this.isTop) return;
      const distance = this.startPointer.pageY - ev.changedTouches[0].pageY;
      if (this.distance <= distance && this.isBottom) {
        this.$emit(this.type = 'slideUp');
        this.$emit('loadMore');
      } else if (this.distance <= -distance && this.isTop) {
        this.$emit(this.type = 'slideDown');
        this.$emit('refresh');
      }
      this.height = 0;
    },
  },
};
</script>
