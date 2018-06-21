import { shallowMount } from '@vue/test-utils';
import SlideForMore from '../src/component/SlideForMore.vue';

describe('SlideForMore', () => {
  it('Component Rendered', () => {
    const wrapper = shallowMount(SlideForMore);
    expect(wrapper.find('slideformorebase-stub').exists()).to.equal(true);
    expect(wrapper.vm.style).to.have.property('tip');
  });
});
