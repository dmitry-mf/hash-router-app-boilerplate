import { ROUTES, Router } from '../../application';
import { DependencyResolver } from '../../application/helpers/dependencyResolver';
import { toFromJSMixin } from '../../helpers';
import { RaceService } from '../../services/raceService';
import { BasePage } from '../base-page';
import Template from './index.html';

import style from './race.scss';

export class PageRace extends toFromJSMixin(BasePage) {
    model: {
        cars: never[];
        started: boolean;
        name: string;
        model: string;
        result: string;
    };

    nodes: HTMLElement | null;

    router: Router;
    dependencyResolver: DependencyResolver;
    raceService: RaceService;

    constructor(router: Router, dependencyResolver: DependencyResolver, raceService: RaceService) {
        super();

        this.model = {
            cars: [],
            started: false,
            name: '',
            model: '',
            result: '',
        };

        this.nodes = null;

        this.router = router;
        this.dependencyResolver = dependencyResolver;
        this.raceService = raceService;

        this.init(this.applyClasses(Template, style));
        this.addEventListeners();

        console.log(this);
    }

    init(template: string) {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        const pageNodes = wrapper.firstChild as HTMLDivElement;
        this.nodes = pageNodes;
        root.innerHTML = '';

        root.appendChild(pageNodes);
    }

    addEventListeners() {
        this.nodes?.addEventListener('click', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.name === 'toGarage') {
                this.handleToGarage();
            }
        });

        this.nodes?.addEventListener('submit', (e) => {
            e.preventDefault();

            const form = document.getElementById('raceForm') as HTMLFormElement;
            const inputs = [...form.elements] as HTMLInputElement[];

            inputs.forEach((input) => {
                this.fromJS({ ...this.model, ...(input.name ? { [input.name]: input.value } : {}) });
            });

            console.log(this.toJS());
        });
    }

    handleToGarage() {
        this.router.push(ROUTES.GARAGE);
    }

    applyClasses(defaultTemplate: string, styles: Record<string, string>) {
        return Object.keys(styles).reduce(
            (temp, className) => temp.replace(`{{${className}}}`, styles[className]),
            defaultTemplate
        );
    }

    createPageModel() {
        console.log(this.toJS());
    }
}
