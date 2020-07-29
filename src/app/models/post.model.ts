export class Post {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public title?: string,
        public text?: string,
        public category?: string,
        public images?: any,
        public date?: Date,
        public mobileImg?: Object
    ) {}
}
