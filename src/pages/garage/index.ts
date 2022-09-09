import { GarageService } from '../../services/garageService';
import Template from './index.html';

export class PageGarage {
    garageService: GarageService;

    constructor(garageService: GarageService) {
        this.garageService = garageService;
        this.init();

        this.fetchCars();
    }

    async init() {
        const root = document.getElementById('root') as HTMLDivElement;

        const wrapper = document.createElement('div');

        wrapper.innerHTML = Template;

        const pageNodes = wrapper.firstChild as Node;

        root.innerHTML = '';

        root.appendChild(pageNodes);
    }

    fetchCars = async () => {
        const cars = await this.garageService.getCars();
        console.log(cars);
    };
}
