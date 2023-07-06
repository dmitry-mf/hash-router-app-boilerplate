export abstract class BasePage<I extends Array<never>> {
    init(...args: I) {
        console.warn('init: does not have an implementation', ...args);
    }
}
