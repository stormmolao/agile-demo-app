import { shallowMount, mount, createLocalVue }  from '@vue/test-utils';
import Vuetify from 'vuetify';
import AgileList from '../../src/components/AgileList.vue';

let wrapper = void 0;
let localVue = createLocalVue();
const dataList = [{ title: 'Test title in AgileList', content: 'Test content in AgileList'}];

describe('List', () => {
  describe('Test component elements', () => {
    describe('methods', () => {
      beforeEach(() => {
        wrapper = shallowMount(AgileList, {
          propsData: {
            dataList: dataList
          }
        });
      });

      describe('updateData', () => {
        it('Should emit parent component method', async () => {
          const dataToUpdate = dataList[0];
          wrapper.vm.updateData(dataToUpdate);
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('update')).toBeTruthy();
        });
      });

      describe('deleteData', () => {
        it('Should emit parent component method', async () => {
          const valueId = '123';
          wrapper.vm.deleteData(valueId);
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('delete')).toBeTruthy();
        });
      });
    });
  });

  describe('Test component template', () => {
    beforeEach(() => {
      wrapper = mount(AgileList, {
        localVue,
        vuetify: new Vuetify(),
        propsData: {
          dataList: dataList
        }
      });
    });

    it('updateData should be called when click update button', () => {
      wrapper.vm.updateData = jest.fn();
      const updateButton = wrapper.find('.list__item__button__update');
      expect(updateButton.exists()).toBe(true);
      updateButton.trigger('click');
      expect(wrapper.vm.updateData).toHaveBeenCalled();
    });

    it('deleteData should be called when click update button', () => {
      wrapper.vm.deleteData = jest.fn();
      const deleteButton = wrapper.find('.list__item__button__delete');
      expect(deleteButton.exists()).toBe(true);
      deleteButton.trigger('click');
      expect(wrapper.vm.deleteData).toHaveBeenCalled();
    });
  });
});
