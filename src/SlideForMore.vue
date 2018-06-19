<template>
    <slide-for-more-base
            :wrapClass="wrapClass"
            :slideValue="slideValue"
            :isSearching="isSearching"
            :contentMinHeight="contentMinHeight"
            :baseSize="baseSize"
            :tipHeight="tipHeight"
            @refresh="$emit('refresh')"
            @slideUp="$emit('slideUp')"
            @loadMore="$emit('loadMore')"
            @slideDown="$emit('slideDown')">
        <div class="slide-for-more-top-tip" :style="style.tip" slot="topTip">
            <template v-if="isSearching">
                正在刷新...
            </template>
            <template v-else="">刷新</template>
        </div>
        <slot/>
        <div class="slide-for-more-tip" :style="style.tip" slot="tip">
            <template v-if="isSearching">
                正在获取...
            </template>
            <template v-else="">获取更多</template>
        </div>
    </slide-for-more-base>
</template>

<script>
  import SlideForMoreBase from './SlideForMoreBase.vue'

  export default {
    name: 'SlideForMore',
    props: {
      wrapClass: String, // 一旦设置，内置样式全部失效，需要重写所有样式
      slideValue: {
        default: 100,
        validator(val) {
          return typeof val === 'number' && val > 0;
        }
      },
      isSearching: Boolean,
      contentMinHeight: String,
      baseSize: {
        validator(val) {
          return !val || /\d(rem|px|em)$/.test(val)
        },
        default: '100px'
      },
      tipHeight: {
        type: String,
        default: '40px',
      },
    },
    data() {
      return {
        style: {
          tip: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#ccc',
          }
        }
      }
    },
    computed: {},
    watch: {},
    components: {SlideForMoreBase}
  }
</script>
