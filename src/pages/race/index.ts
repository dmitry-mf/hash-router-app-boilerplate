import { Router } from '../../application';
import { toFromJSMixin } from '../../helpers';
import { BasePage } from '../base-page';
import Template from './index.html';

import style from './race.scss';

export class PageRace extends toFromJSMixin(BasePage) {
    router: Router;
    name: string;
    age: string;

    constructor(router: Router) {
        super();

        console.log(style);

        this.name = '';
        this.age = '';

        this.router = router;
        this.init(this.applyClasses(Template, style));

        console.log(this);
    }

    init(template: string) {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        const pageNodes = wrapper.firstChild as HTMLDivElement;
        root.innerHTML = '';

        root.appendChild(pageNodes);
    }

    applyClasses(defaultTemplate: string, styles: Record<string, string>) {
        return Object.keys(styles).reduce(
            (temp, className) => temp.replace(`{{${className}}}`, styles[className]),
            defaultTemplate
        );
    }

    postPage() {
        const body = { age: this.age, name: this.name };
        console.log(body);
    }
}
