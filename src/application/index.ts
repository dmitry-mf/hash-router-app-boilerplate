import { GarageService } from '../services/garageService';
import { RaceService } from '../services/raceService';
import { DependencyResolver } from './helpers/dependencyResolver';
import { PAGES, pages } from './pages';
import { Router } from './router';
import appServices, { SERVICES } from './services';

export * from './router';
export * from './pages';
export * from './routes';

const { services, registerService } = appServices;

class App {
    start() {
        this.registerAppServices();
        this.registerPages();

        services.router.init({
            home: PAGES.RACE,
            error: PAGES.ERROR,
        });
    }

    registerAppServices() {
        registerService(SERVICES.ROUTER, Router, [])
            .registerService(SERVICES.DEPENDENCY_RESOLVER, DependencyResolver, [services])
            .registerService(SERVICES.GARAGE_SERVICE, GarageService, [])
            .registerService(SERVICES.RACE_SERVICE, RaceService, []);
    }

    registerPages() {
        pages.forEach((page) => {
            services.dependencyResolver.register(page);
            this.registerAppRoute(page.route, page.name);
        });
    }

    registerAppRoute(route: string, name: string) {
        services.router.register(route, name, () => {
            services.dependencyResolver.get(name);
        });
    }
}

export default App;
