export class GarageService {
    getCars() {
        return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
    }
}
