import { BasePage } from '../pages/base-page';

interface IToFromJSExtender {
    toJS: () => Record<string, string>;
    fromJS: (model: Record<string, string>) => void;
}

export const toFromJSMixin = (SuperClass: typeof BasePage) =>
    class ToFromJSExtender extends SuperClass<never[]> implements IToFromJSExtender {
        model = {};
        toJS() {
            return {
                ...Object.entries(this.model).reduce(
                    (fields, [key, value]) => ({ ...fields, [key]: String(value) || null }),
                    {}
                ),
            };
        }

        fromJS(model = {}) {
            Object.assign(this.model, model);
        }
    };
