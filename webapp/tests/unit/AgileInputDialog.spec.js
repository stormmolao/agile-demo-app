import { mount, shallowMount, createLocalVue }  from '@vue/test-utils';
import Vuetify from 'vuetify';
import AgileInputDialog from '../../src/components/AgileInputDialog.vue';
let wrapper = void 0;
let localVue = createLocalVue();
const objectToTest = { id: '123', title: 'Testing', content: 'Testing content'};
describe('AgileInputDialog', () => {
  describe('Testing component elements', () => {
    describe('methods', () => {
      describe('submitData', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          wrapper = shallowMount(AgileInputDialog, {
            propsData: {
              objectToUpdate: objectToTest,
              type: 'value'
            }
          });  
        });
        
        it('Should not emit parent component method with invalid input', async () => {
          wrapper.vm.$refs.form.validate = jest.fn().mockReturnValue(false);
          await wrapper.setData({ inputTitle: '' });
          await wrapper.setData({ inputContent: '' });
          wrapper.vm.submitData();
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('submit', '123', { title: '', content: '' })).toBeFalsy();
        });

        it('Should emit parent component method with valid input', async () => {
          wrapper.vm.$refs.form.validate = jest.fn().mockReturnValue(true);
          await wrapper.setData({ inputTitle: 'Testing' });
          await wrapper.setData({ inputContent: 'Testing content confirmed' });
          wrapper.vm.submitData();
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('submit', '123', { title: 'Testing', content: 'Testing content confirmed' })).toBeTruthy();
        });

      });
    });

    describe('computed', () => {
      describe('screenType', () => {
        wrapper = shallowMount(AgileInputDialog, {
          propsData: {
            type: 'value',
            objectToUpdate: objectToTest
          }
        });
        const expOutput = {
          principle: "Principle",
          value: "Value"
        };
        it('should return as expected output', () => {
          expect(wrapper.vm.screenType).toEqual(expOutput);
        }); 
      });

      describe('dialogTitle', () => {
        const testComputed = {
          principle: "Principle",
          value: "Value"
        };
        describe.each`
        condObjectToUpdate       | condType       | expOutput
        ${{ id: '123' }}         | ${'value'}     | ${'Update Value'}
        ${{ id: '123' }}         | ${'principle'} | ${'Update Principle'}
        ${{ content: 'test' }}   | ${'value'}     | ${'Add Value'}
        ${{ content: 'test' }}   | ${'principle'} | ${'Add Principle'}
        `(
          'condObjectToUpdate === $condObjectToUpdate, condType === $condType',
          ({ condObjectToUpdate, condType, expOutput}) => {
            beforeEach(() => {
              wrapper = shallowMount(AgileInputDialog, {
                propsData: {
                  objectToUpdate: condObjectToUpdate,
                  type: condType
                },
                computed: {
                  screenType: () => testComputed
                }
              });
            });

            it(`dialogTitle should be ${expOutput}`, () => {
              expect(wrapper.vm.dialogTitle).toBe(expOutput);
            });
          }
        );
      });
    });
  });

  describe('Testing against user action', () => {
    beforeEach(() => {   
      wrapper = mount(AgileInputDialog, {
        localVue,
        propsData: {
          objectToUpdate: objectToTest,
          type: 'principle'
        },
        vuetify: new Vuetify()
      });
    });

    it('submitData should be called when button clicked with valid input data', async () => {
      const submitButton = wrapper.find('.dialog__input__submitButton'); 
      wrapper.vm.submitData = jest.fn();
      expect(submitButton.exists()).toBe(true);
      await submitButton.trigger('click');
      expect(wrapper.vm.submitData).toHaveBeenCalled();
    });

    it('submitData should not be called when button clicked with invalid input data', async () => {
      const submitButton = wrapper.find('.dialog__input__submitButton'); 
      wrapper.vm.submitData = jest.fn();
      expect(submitButton.exists()).toBe(true);
      await wrapper.setData({ inputTitle: ''});
      await wrapper.setData({ inputContent: ''});
      await submitButton.trigger('click');
      expect(wrapper.vm.submitData).not.toHaveBeenCalled();
    });
  });
});
