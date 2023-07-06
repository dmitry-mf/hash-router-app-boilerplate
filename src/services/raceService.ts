export class RaceService {
    getStatus() {
        return new Promise((resolve) => setTimeout(() => resolve(false), 1000));
    }
}
