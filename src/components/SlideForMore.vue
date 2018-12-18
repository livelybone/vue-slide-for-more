<template>
  <slide-for-more-base
    :slideValue="slideValue"
    :isSearching="isSearching"
    :tipHeight="tipHeight"
    @refresh="$emit('refresh')"
    @slideUp="$emit('slideUp')"
    @loadMore="$emit('loadMore')"
    @slideDown="$emit('slideDown')">
    <div class="slide-for-more-top-tip" slot="topTip">
      <template v-if="isSearching">
        正在刷新...
      </template>
      <template v-else="">刷新</template>
    </div>
    <slot/>
    <div class="slide-for-more-tip" slot="tip">
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
    }
  },
  components: { SlideForMoreBase },
}
</script>
