import { mount, shallowMount, createLocalVue }  from '@vue/test-utils';
import Vuetify from 'vuetify';
import AgileTitle from '../../src/components/AgileTitle.vue';

let wrapper = void 0;
let localVue = createLocalVue();

describe('AgileTitle', () => {
  describe('Test elements', () => {
    describe('methods', () => {
      describe('openDialog', () => {
        it('Should emit parent component method', async () => {
          wrapper= shallowMount(AgileTitle, {
            propsData: {
              type: 'principle'
            }
          });
          wrapper.vm.openDialog();
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('openDialog')).toBeTruthy();
        });
      });
    });

    describe('computed', () => {
      describe('titleContent', () => {
        const expectedOutput = {
          principle: "Agile Method Principles",
          value: "Agile Method Values"
        };
        it('titleContent should return value as expected', () => {
          wrapper= shallowMount(AgileTitle, {
            propsData: {
              type: 'principle'
            }
          });
          expect(wrapper.vm.titleContent).toEqual(expectedOutput);
        });
      });
    });
  });

  describe('Test component template', () => {
    it('openModal should be called when click Add button', async () => {
      wrapper = mount(AgileTitle, {
        localVue,
        vuetify: new Vuetify(),
        propsData: {
          type: 'value'
        }
      });
      wrapper.vm.openDialog = jest.fn();
      const addButton = wrapper.find('.title__button');
      expect(addButton.exists()).toBe(true);
      await addButton.trigger('click');
      expect(wrapper.vm.openDialog).toHaveBeenCalled();
    });
  });
})
