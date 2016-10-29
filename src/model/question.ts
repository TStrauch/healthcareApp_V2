export class Question{

    constructor(
        public id?: number,
        public description?: string,
        public category?: number,
        public invertScale?: boolean
    ) { };
}
