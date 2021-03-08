import { mount, createLocalVue, shallowMount }  from '@vue/test-utils';
import Vuetify from 'vuetify';
import AgileBase from '../../src/components/AgileBase';
import http from '../../src/service/http.js';
jest.mock('../../src/service/http.js');

let wrapper = void 0;
let localVue = createLocalVue();
const error = new Error('Something wrong with network');
const resolvedData = { message: 'successful' };
const dataToAdd = { title: 'Adding title', content: 'Adding content' };
const dataToUpdate = { id: '123', title: 'Updating title', content: 'Updating content' };

describe('AgileBase', () => {
 describe('Testing component elements', () => {
  describe('methods', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    describe('addAgileProperty', () => {
      describe.each`
        condResponseOK | expResult
        ${true}        | ${'isDialogOpen will be reassigned and fetchAgilePropertyList will be called'}
        ${false}       | ${'error will be printed to console log'}
        `(
          'condResponseOK === $condResponseOK, expResult === $expResult',
          ({ condResponseOK, expResult }) => {
            beforeEach(() => {
              jest.spyOn(AgileBase, 'created').mockImplementation();
              if (condResponseOK) {
                http.post.mockResolvedValue(resolvedData);
              } else {
                http.post.mockRejectedValue(error)
              }
              wrapper = shallowMount(AgileBase, {
                propsData: {
                  type: 'value'
                }
              });
              wrapper.vm.sendNotification = jest.fn();
              wrapper.vm.fetchAgilePropertyList = jest.fn();
              wrapper.vm.addAgileProperty(dataToAdd);
            });

            it(expResult,  () => {
              if (condResponseOK) {
                expect(wrapper.vm.isDialogOpen).toBe(false);
                expect(wrapper.vm.fetchAgilePropertyList).toHaveBeenCalled();
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith('Added value successfully');
              } else {
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith(error.message);
              }
            })
          }
        );
    });

    describe('deleteAgileProperty', () => {
      describe.each`
        condResponseOK | expResult
        ${true}        | ${'fetchAgilePropertyList will be called'}
        ${false}       | ${'error will be printed to console log'}
        `(
          'condResponseOK === $condResponseOK, expResult === $expResult',
          ({ condResponseOK, expResult}) => {
            beforeEach(() => {
              const valueId ='123';
              jest.spyOn(AgileBase, 'created').mockImplementation();
              if (condResponseOK) {
                http.delete.mockResolvedValue(resolvedData);
              } else {
                http.delete.mockRejectedValue(error)
              }
              wrapper = shallowMount(AgileBase,{
                propsData: {
                  type: 'value'
                }
              });
              wrapper.vm.sendNotification = jest.fn();
              wrapper.vm.fetchAgilePropertyList = jest.fn();
              wrapper.vm.deleteAgileProperty(valueId);
            });

            it(expResult, () => {
              if (condResponseOK) {
                expect(wrapper.vm.fetchAgilePropertyList).toHaveBeenCalled();
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith('Deleted value successfully');
              } else {
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith(error.message)
              }
            })
          }
        );
    });

    describe('fetchAgilePropertyList', () => {
      const fetchedResolvedData = {
        data: [
            { title: 'test-title', content: 'test-content'}
          ]
      };
      describe.each`
      condResponseOK |  expResult
      ${true}        | ${'propertyList should be assigned to resolved data'}
      ${false}       | ${'error will be printed to console log'}
      `(
        'condResponseOK === $condResponseOK, expResult === $expResult',
        ({ condResponseOK, expResult}) => {
          beforeEach(() => {
            jest.spyOn(AgileBase, 'created').mockImplementation();
            if (condResponseOK) {
              http.get.mockResolvedValue(fetchedResolvedData);
            } else {
              http.get.mockRejectedValue(error);
            }
            wrapper = shallowMount(AgileBase, {
              propsData: {
                type: 'property'
              }
            });
            wrapper.vm.sendNotification = jest.fn();
          });

          it(expResult, async () => {
            await wrapper.vm.fetchAgilePropertyList();
            if (condResponseOK) {
              expect(wrapper.vm.propertyList).toBe(fetchedResolvedData.data);
            } else {
              expect(wrapper.vm.sendNotification).toHaveBeenCalledWith(error.message);
            }
          })
        }
      ); 
    });

    describe('openDialog', () => {
      beforeEach(() => {
        jest.spyOn(AgileBase, 'created').mockImplementation();
        wrapper = shallowMount(AgileBase, {
          propsData: {
            type: 'principle'
          }
        });
      });
      it('isDialogOpen should be true, propertyToUpdate should be assigned to {}', () => {
        wrapper.vm.openDialog();
        expect(wrapper.vm.isDialogOpen).toBe(true);
        expect(wrapper.vm.propertyToUpdate).toEqual({ title: '', content: '' });
      });

      it('isDialogOpen should be true, propertyToUpdate should be assigned to a new object', () => {
        wrapper.vm.openDialog(dataToUpdate);
        expect(wrapper.vm.isDialogOpen).toBe(true);
        expect(wrapper.vm.propertyToUpdate).toEqual(dataToUpdate);
      });
    });

    describe('submitAgileProperty', () => {
      beforeEach(() => {
        jest.spyOn(AgileBase, 'created').mockImplementation();
        wrapper = shallowMount(AgileBase, {
          propsData: {
            type: 'value'
          }
        });
        wrapper.vm.updateAgileProperty = jest.fn();
        wrapper.vm.addAgileProperty = jest.fn();
      });

      it('updateAgileProperty will be called with both parameters', () => {
        wrapper.vm.submitAgileProperty('123', dataToAdd);
        expect(wrapper.vm.updateAgileProperty).toHaveBeenCalledWith('123', dataToAdd);
      });

      it('addAgileProperty will be called with one parameter', () => {
        wrapper.vm.submitAgileProperty(null, dataToAdd);
        expect(wrapper.vm.addAgileProperty).toHaveBeenCalledWith(dataToAdd);
      });
    });

    describe('updateAgileProperty', () => {
      describe.each`
        condResponseOK | expResult
        ${true}        | ${'response will be printed to console log'}
        ${false}       | ${'error will be printed to console log'}
        `(
          'condResponseOK === $condResponseOK, expResult === $expResult',
          ({ condResponseOK, expResult}) => {
            beforeEach(() => {
              const valueId = '123';
              jest.spyOn(AgileBase, 'created').mockImplementation();
              if (condResponseOK) {
                http.put.mockResolvedValue(resolvedData);
              } else {
                http.put.mockRejectedValue(error)
              }
              wrapper = shallowMount(AgileBase, {
                propsData: {
                  type: 'value'
                }
              });
              wrapper.vm.fetchAgilePropertyList = jest.fn();
              wrapper.vm.sendNotification = jest.fn();
              wrapper.vm.updateAgileProperty(valueId, AgileBase);
            });

            it(expResult,  () => {
              if (condResponseOK) {
                expect(wrapper.vm.isDialogOpen).toBe(false);
                expect(wrapper.vm.fetchAgilePropertyList).toHaveBeenCalled();
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith('Updated value successfully');
              } else {
                expect(wrapper.vm.sendNotification).toHaveBeenCalledWith(error.message);
              }
            })
          }
        );
    });

    describe('sendNotification', () => {
      describe.each`
      condMessage          | expNotificationMessage
      ${'Test message 1'}  | ${'Test message 1'}
      ${'Test message 2'}  | ${'Test message 2'}
      `(
        'condMessage === $condMessage, expNotificationMessage === %expNotificationMessage', 
        ({ condMessage, expNotificationMessage }) => {
          beforeEach(() => {
            jest.spyOn(AgileBase, 'created').mockImplementation();
            wrapper = shallowMount(AgileBase, {
              propsData: {
                type: 'value'
              }
            });
            wrapper.vm.sendNotification(condMessage);
          });
          it(`notificationMessage should be assigned to ${expNotificationMessage}`, () => {
            expect(wrapper.vm.notificationSent).toBe(true);
            expect(wrapper.vm.notificationMesage).toBe(expNotificationMessage);
          });
        }
      );
    });
  });
 })

 describe('Test component template', () => {
  describe('Title component', () => {
    jest.spyOn(AgileBase, 'created').mockImplementation();
    wrapper= mount(AgileBase, {
      vuetify: new Vuetify(),
      propsData: {
        type: 'principle'
      }
    });
    it('Component AgileTitle exists', () => {
      const titleComponent = wrapper.findComponent({ name: 'AgileTitle' });
      expect(titleComponent.exists()).toBe(true);
    });
  });

  describe('AgileList component', () => {
    const mockList = [{ title: 'Test title in list', content: 'Test content in list'}];
    describe.each`
    condPropertyList | expResult
    ${null}          | ${'AgileList component should not exist'}
    ${mockList}      | ${'AgileList component should exist'}
    `(
      'condPropertyList === $condPropertyList, expectedResult === $expectedResult',
      ({ condPropertyList, expResult }) => {
        beforeEach(() => {
          wrapper= mount(AgileBase, {
            localVue,
            vuetify: new Vuetify(),
            propsData: {
              type: 'principle'
            }
          });
          wrapper.setData({ propertyList: condPropertyList });
        });

        it(expResult, () => {
          const listComponent = wrapper.findComponent({ name: 'AgileList' });
          if (condPropertyList) {
            expect(listComponent.exists()).toBe(true);
          } else {
            expect(listComponent.exists()).toBe(false);
          }
        });
      }
    );
  });

  describe('AgileInputDialog component', () => {
    const app = document.createElement ("div");
    app.setAttribute ("data-app", true);
    document.body.append (app);
    describe.each`
    condIsDialogOpen | expResult
    ${true}          | ${'AgileInputDialog component should exist'}
    ${false}         | ${'AgileInputDialog component should not exist'}
    `(
      'condIsDialogOpen === $condIsDialogOpen, expResult === $expResult',
      ({ condIsDialogOpen, expResult }) => {
        beforeEach(() => {
          wrapper= mount(AgileBase, {
            localVue,
            vuetify: new Vuetify(),
            propsData: {
              type: 'principle'
            }
          });
          wrapper.setData({ isDialogOpen: condIsDialogOpen });
        });

        it(expResult, () => {
          const agileInputDialogComponent = wrapper.findComponent({ name: 'AgileInputDialog' });
          if (condIsDialogOpen) {
            expect(agileInputDialogComponent.exists()).toBe(true);
          } else {
            expect(agileInputDialogComponent.exists()).toBe(false);
          }
        });
      }
    );
  });
});
});
