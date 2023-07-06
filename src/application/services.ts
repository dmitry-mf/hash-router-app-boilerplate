import { GarageService } from '../services/garageService';
import { RaceService } from '../services/raceService';
import { DependencyResolver } from './helpers/dependencyResolver';
import { Router } from './router';

export enum SERVICES {
    ROUTER = 'router',
    DEPENDENCY_RESOLVER = 'dependencyResolver',
    GARAGE_SERVICE = 'garageService',
    RACE_SERVICE = 'raceService',
}

interface Service<A = unknown, T = unknown> {
    new (...args: A[]): T;
}

export type AppServices = {
    [name: string]: unknown;
    [SERVICES.ROUTER]: Router;
    [SERVICES.DEPENDENCY_RESOLVER]: DependencyResolver;
    [SERVICES.GARAGE_SERVICE]: GarageService;
    [SERVICES.RACE_SERVICE]: RaceService;
};

export class Services {
    services: AppServices;

    static get instance() {
        return new Services();
    }

    constructor() {
        this.services = {} as AppServices;
    }

    registerService = <T = unknown>(name: string, Service: Service<T>, args: T[]) => {
        this.services[name] = new Service(...args);
        return this;
    };
}

export default Services.instance;
