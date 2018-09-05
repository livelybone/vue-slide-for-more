import { shallowMount } from '@vue/test-utils';
import SlideForMoreBase from '../src/components/SlideForMoreBase.vue';
import { getScroll } from '../src/utils/browser-default';

describe('SlideForMoreBase', () => {
  it('Component Rendered', () => {
    const wrapper = shallowMount(SlideForMoreBase);
    expect(wrapper.find('.slide-for-more-base-wrap').exists()).to.equal(true);
    expect(wrapper.find('.slide-for-more-base-wrap').element.getAttribute('style')).to.not.equal('');
  });

  it('The style of component will crash when the value of prop baseSize is invalid or the value of prop wrapClass exists', () => {
    const wrapper = shallowMount(SlideForMoreBase);
    wrapper.setProps({ baseSize: '11a' });
    expect(wrapper.find('.slide-for-more-base-wrap').element.getAttribute('style')).to.equal('');
    wrapper.setProps({ baseSize: '100px', wrapClass: 'wrap' });
    expect(wrapper.find('.slide-for-more-base-wrap').element.getAttribute('style')).to.equal('');
  });

  it('Slide when not top and not bottom', () => {
    const wrapper = shallowMount(SlideForMoreBase);
    const { slideValue } = wrapper.vm;
    const height = slideValue + 1;

    wrapper.vm.start({ changedTouches: [{ pageY: 0 }] });

    wrapper.setData({ isTop: false, isBottom: false });

    wrapper.vm.move({ changedTouches: [{ pageY: height }] });
    expect(wrapper.vm.height).to.equal(0);

    wrapper.vm.end({ changedTouches: [{ pageY: height }] });
    expect(wrapper.emittedByOrder().length).to.equal(0);
  });

  it('Slide when on the top', () => {
    const wrapper = shallowMount(SlideForMoreBase);
    const { slideValue } = wrapper.vm;
    const height = slideValue + 1;

    wrapper.vm.start({ changedTouches: [{ pageY: 0 }] });
    wrapper.setData({ isTop: true, isBottom: false });

    wrapper.vm.move({ changedTouches: [{ pageY: -height }] });
    expect(wrapper.vm.height).to.equal(0);

    wrapper.vm.move({ changedTouches: [{ pageY: height }] });
    expect(wrapper.vm.height).to.equal(-height);

    wrapper.vm.end({ changedTouches: [{ pageY: height }] });
    expect(wrapper.emitted('refresh').length).to.equal(1);

    wrapper.vm.end({ changedTouches: [{ pageY: height - 2 }] });
    expect(wrapper.emitted('refresh').length).to.equal(1);
  });

  it('Slide when at the bottom', () => {
    const wrapper = shallowMount(SlideForMoreBase);
    const { slideValue } = wrapper.vm;
    const height = slideValue + 1;

    wrapper.vm.start({ changedTouches: [{ pageY: 0 }] });
    wrapper.setData({ isTop: false, isBottom: true });

    wrapper.vm.move({ changedTouches: [{ pageY: -height }] });
    expect(wrapper.vm.height).to.equal(height);

    wrapper.vm.end({ changedTouches: [{ pageY: -height }] });
    expect(wrapper.emitted('loadMore').length).to.equal(1);

    wrapper.vm.end({ changedTouches: [{ pageY: -height + 2 }] });
    expect(wrapper.emitted('loadMore').length).to.equal(1);

    wrapper.setProps({ isSearching: true });
    expect(wrapper.vm.slideType).to.equal('slideUp');
  });
});

describe('browser-default', () => {
  it('sdf', () => {
    const o = getScroll();
    expect(o).to.deep.equal({ left: 0, top: 0 });
  })
});
