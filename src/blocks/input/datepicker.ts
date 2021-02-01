import Input from "./input.js";

export default class DatePicker extends Input<Date> {
    constructor(key:Array<any>, placeholder?:string) {
        super(key, "date", (input: string):Date => {
            const parts = input.split('-');
            return new Date(+parts[0], +parts[1] - 1, +parts[2]); 
        });

        this.params.attributes["placeholder"] = placeholder || "yyyy-mm-dd";
    }
}