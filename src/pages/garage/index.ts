import { ROUTES, Router } from '../../application';
import { toFromJSMixin } from '../../helpers';
import { GarageService } from '../../services/garageService';
import { BasePage } from '../base-page';
import Template from './index.html';

export class PageGarage extends toFromJSMixin(BasePage) {
    garageService: GarageService;
    router: Router;
    nodes: HTMLElement | null;

    constructor(garageService: GarageService, router: Router) {
        super();

        this.garageService = garageService;
        this.router = router;
        this.nodes = null;

        this.init();

        this.fetchCars();
        this.addEventListeners();

        this.router.subscribe(() => {
            console.log('route changes: events unsubscribed');
            this.removeEventListeners();
        });
    }

    async init() {
        const root = document.getElementById('root') as HTMLDivElement;

        const wrapper = document.createElement('div');

        wrapper.innerHTML = Template;

        const pageNodes = wrapper.firstChild as HTMLElement;
        this.nodes = pageNodes;

        root.innerHTML = '';

        root.appendChild(pageNodes);
    }

    addEventListeners() {
        this.nodes?.addEventListener('click', this.handleClick.bind(this));
    }

    removeEventListeners() {
        this.nodes?.removeEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e: MouseEvent) {
        const target = e.target as HTMLInputElement;
        if (target.name === 'toRace') {
            this.handleToRace();
        }
    }

    handleToRace() {
        this.router.push(ROUTES.RACE);
    }

    fetchCars = async () => {
        const cars = await this.garageService.getCars();
        console.log(cars);
    };
}
