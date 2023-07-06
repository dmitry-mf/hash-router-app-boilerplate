import { PageGarage } from '../index';
import { GarageService } from '../../../services/garageService';
import { Router } from '../../../application';

jest.mock('../index.html', () => ({
    __esModule: true,
    default: `<div>test</div>`,
}));

describe('page garage', () => {
    let page: PageGarage;
    const garageService = new GarageService();
    const router = new Router();
    const getCarsMock = jest.fn();

    document.body.innerHTML = '<div id="root"></div>';

    beforeEach(() => {
        page = new PageGarage(garageService, router);
        garageService.getCars = getCarsMock;
    });

    it('should render ragae page', () => {
        page.init();

        expect(document.body.innerHTML).toBe(`<div id=\"root\"><div>test</div></div>`);
    });

    it('should call getCars', () => {
        expect(getCarsMock).toBeCalledTimes(1);
    });
});
