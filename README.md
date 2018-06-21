# vue-slide-for-more <img src="https://img.shields.io/badge/vue--slide--for--more-static-blue.svg">
A vuejs(vue2) component for loading more data when the content was slide to the bottom on mobile, provided refresh function, supported SSR.

Repository: https://github.com/livelybone/vue-slide-for-more.git.

You can rewrite all style by set prop `wrapClass`. the css file content maybe like:
```scss
  .[wrapClass] {
    ...
    
    .slide-for-more-top-tip-wrap {
      /* The refresh tip wrap style */
      ...
      
      .slide-for-more-top-tip {
        /* The refresh tip wrap style, in SlideForMore module */
        ...
      }
    }
    
    .slide-for-more-content {
      /* The content wrap style */
      ...
    }
        
    .slide-for-more-tip-wrap {
      /* The loadMore tip wrap style */
      ...
      
      .slide-for-more-tip {
        /* The loadMore tip wrap style, in SlideForMore module */
        ...
      }
    }
  }
```

## Installation
```bash
npm install vue-slide-for-more --save-dev
```

## Register the component
```javascript
// import all
import {SlideForMore, SlideForMoreBase} from 'vue-slide-for-more';

// import what you just need
import SlideForMore from 'vue-slide-for-more/lib/SlideForMore';
// or
import SlideForMoreBase from 'vue-slide-for-more/lib/SlideForMoreBase';


// Global register
Vue.component('slide-for-more', SlideForMore);
Vue.component('slide-for-more-base', SlideForMoreBase);

// Local register
new Vue({
  components:{SlideForMore, SlideForMoreBase}
})

```

## Apply

### SlideForMoreBase
```html
// template
<template>
    <SlideForMoreBase
        :wrapClass="''" 
        tipHeight="40px"
        contentMinHeight="100vh"
        baseSize="100px" 
        :slideValue="100" 
        :isSearching="isSearching">
        <div class="top-tip" slot="topTip">{{isSearching?'正在刷新...':'刷新'}}</div>
        <div v-for="el in list">{{el}}</div>
        <div class="bottom-tip" slot="tip">{{isSearching?'正在查询...':'获取更多'}}</div>
 </SlideForMoreBase>
</template>
```

### SlideForMore
```html
// template. SlideForMore is a simple packaging of SlideForMoreBase
<template>
    <SlideForMore 
        :wrapClass="''" 
        tipHeight="40px"
        contentMinHeight="100vh"
        baseSize="100px" 
        :slideValue="100" 
        :isSearching="false">
        <div v-for="el in list">{{el}}</div>
    </SlideForMore>
</template>
```
## Props
| Name                  | Type                                      | DefaultValue      | Description  |
| --------------------  | ----------------------------------------- | -------------     | ------------ |
| `wrapClass`           | `String`                                  | none              | Used to set the class of wrap. When it Used, the prop 'baseSize' will be ignored, and you must rewrite all the style of the component module in global |
| `tipHeight`           | `String`                                  | `40px`            | Used to set the height of both `div.slide-for-more-top-tip-wrap` which shows refreshing and `div.slide-for-more-tip-wrap` which shows loading more |
| `contentMinHeight`    | `String`                                  | none              | Used to set the min-height of `div.slide-for-more-content` |
| `baseSize`            | `String`                                  | `100px`           | Used to set size of content shadow and line-height of tip. The component style will crash when it's invalid. Tested by reg: /\d(rem&#124;px&#124;em)$/ |
| `slideValue`          | `Number`                                  | `100` (px)        | Used to set min value of slide distance to trigger events |
| `isSearching`         | `Boolean`                                 | `false`           | Used to tell the component whether you are searching or not. If you are searching, it will show the loading text. `This is an important prop` |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `refresh`             | none                  | Event for refresh                                 |
| `slideDown`           | none                  | An alias of `refresh` event                       |
| `loadMore`            | none                  | Event for load more                               | 
| `slideUp`             | none                  | An alias of `loadMore` event                      |


