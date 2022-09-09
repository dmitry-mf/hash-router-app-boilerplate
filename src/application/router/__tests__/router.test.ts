import { Router } from '../index';

describe('router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should subscribe to window hashchange', () => {
        const addEvent = jest.spyOn(window, 'addEventListener');
        new Router();
        expect(addEvent).toBeCalledTimes(1);
        expect(addEvent).toHaveBeenCalledWith('hashchange', expect.any(Function));
    });

    it('should throw error if route doesnt exist', () => {
        expect(router._onRouteChange.bind(router)).toThrow('unregistered route: ');
    });

    it('should notify subscribers', () => {
        const callbackMock = jest.fn();
        const onChangeMock = jest.fn();
        const getUrlPartsMock = jest.fn().mockReturnValue({ url: 'testUrl' });

        router.getUrlParts = getUrlPartsMock;

        router.subscribe(callbackMock);
        router.register('testUrl', 'testName', onChangeMock);
        router._onRouteChange({} as HashChangeEvent);
        expect(callbackMock).toBeCalledTimes(1);
        expect(getUrlPartsMock).toBeCalledTimes(1);
    });

    it('should notify subscribers', () => {
        const callbackMock = jest.fn();
        const onChangeMock = jest.fn();
        const getUrlPartsMock = jest.fn().mockReturnValue({ url: 'testUrl' });

        router.getUrlParts = getUrlPartsMock;

        router.subscribe(callbackMock);
        router.register('testUrl', 'testName', onChangeMock);
        router._onRouteChange({} as HashChangeEvent);
        expect(callbackMock).toBeCalledTimes(1);
        expect(getUrlPartsMock).toBeCalledTimes(1);
    });
});
