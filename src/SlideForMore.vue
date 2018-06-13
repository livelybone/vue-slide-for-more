<template>
    <slide-for-more-base
            :class="wrapClass"
            :slideHeight="slideHeight"
            :isSearching="isSearching"
            :contentMinHeight="contentMinHeight"
            baseSize="1rem"
            tipHeight=".4rem"
            @slideUp="$emit('slideUp')"
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
      wrapClass: String,
      slideHeight: Number,
      isSearching: Boolean,
      contentMinHeight: String,
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
