import ServicesInstance, { Services } from '../services';

describe('services', () => {
    it('should return type of Service instance', () => {
        expect(ServicesInstance instanceof Services).toBe(true);
    });

    it('should register service', () => {
        class ServiceMock {}
        ServicesInstance.registerService('testService', ServiceMock);
        expect(ServicesInstance.services['testService'] instanceof ServiceMock).toBe(true);
    });
});
