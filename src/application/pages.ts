import { PageError } from '../pages/error';
import { PageGarage } from '../pages/garage';
import { PageRace } from '../pages/race';
import { ROUTES } from './routes';
import { SERVICES } from './services';

export enum PAGES {
    GARAGE = 'garage',
    RACE = 'race',
    RESULTS = 'results',
    ERROR = 'error',
}

export const pages = [
    {
        name: PAGES.RACE,
        route: ROUTES.RACE,
        model: PageRace,
        services: [SERVICES.ROUTER, SERVICES.DEPENDENCY_RESOLVER, SERVICES.RACE_SERVICE],
    },
    {
        name: PAGES.ERROR,
        route: ROUTES.ERROR,
        model: PageError,
        services: [SERVICES.ROUTER],
    },
    {
        name: PAGES.GARAGE,
        route: ROUTES.GARAGE,
        model: PageGarage,
        services: [SERVICES.GARAGE_SERVICE, SERVICES.ROUTER],
    },
];
