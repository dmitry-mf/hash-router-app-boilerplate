import { PageRace } from '../pages/race';
import { GarageService } from '../services/garageService';
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
    }

    registerAppServices() {
        registerService(SERVICES.ROUTER, Router)
            .registerService(SERVICES.DEPENDENCY_RESOLVER, DependencyResolver, services)
            .registerService(SERVICES.GARAGE_SERVICE, GarageService);
    }

    registerPages() {
        pages.forEach((page) => {
            this.registerAppRoute(page.route, page.name);
            services.dependencyResolver.register(page);
        });
    }

    registerAppRoute(route: string, name: string) {
        services.router.register(route, name, () => {
            services.dependencyResolver.get<PageRace>(name);
        });

        services.router.init({
            home: PAGES.RACE,
            error: PAGES.ERROR,
        });
    }
}

export default App;
