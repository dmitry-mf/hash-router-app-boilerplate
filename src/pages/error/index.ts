import { Router } from '../../application';
import { BasePage } from '../base-page';
import Template from './index.html';

export class PageError extends BasePage<never[]> {
    router: Router;
    nodes: HTMLElement | null;
    constructor(router: Router) {
        super();

        this.router = router;
        this.nodes = null;

        this.init();
        this.addEventListeners();
    }

    init() {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Template;
        const pageNodes = wrapper.firstChild as HTMLElement;
        this.nodes = pageNodes;

        root.innerHTML = '';

        root.appendChild(pageNodes);

        this.router.subscribe(() => {
            console.log('route changes error');
        });
    }

    addEventListeners() {
        this.nodes?.addEventListener('click', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.name === 'toHome') {
                this.handleToHome();
            }
        });
    }

    handleToHome() {
        this.router.push(this.router.settings.home);
    }
}
