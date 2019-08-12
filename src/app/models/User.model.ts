export class User{
    constructor(
        public name:string,
        public items:Array<object>=[],
        public total:number=0
    ){}
}