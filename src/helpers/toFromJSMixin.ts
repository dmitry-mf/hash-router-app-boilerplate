import { BasePage } from '../pages/base-page';

interface ToFromJSExtender {
    toJS: () => Record<string, string>;
    fromJS: (model: Record<string, string>) => void;
}

export const toFromJSMixin = (SuperClass: typeof BasePage) =>
    class ToFromJSExtender extends SuperClass {
        toJS() {
            return {
                ...Object.entries(this).reduce(
                    (fields, [key, value]) => ({ ...fields, [key]: (value && value.toString()) || null }),
                    {}
                ),
            };
        }

        fromJS(model: Record<string, string>) {
            Object.assign(this, model);
        }
    };
