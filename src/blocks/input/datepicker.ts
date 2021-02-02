import Input from "./input.js";

/**
 * This is a Date Picker input.
 * ```javascript
 * new DatePicker("date".bind(this))
 *  .onChange((value) => {
 *      console.log(`New value is ${value}`);
 *  });
 * 
 * //value can also be accessed through this.states.date because that is what it was bound to in the first line.
 * ```
 * 
 * The value will be of type Date, as is built into Javascript. 
 */
export default class DatePicker extends Input<Date> {
    constructor(key:Array<any>, placeholder?:string) {
        super(key, "date", (input: string):Date => {
            const parts = input.split('-');
            return new Date(+parts[0], +parts[1] - 1, +parts[2]); 
        });

        this.params.attributes["placeholder"] = placeholder || "yyyy-mm-dd";
    }
    
    /**
     * Sets the maximum date that a user can select with the date picker
     * @param date Max date as a Javascript Date
     */
    max(date:Date) {
        this.setAttribute("max", date.toISOString());
        return this;
    }

    /**
     * Sets the minimum date that a user can select with the date picker
     * @param date Min date as a Javascript Date
     */
    min(date:Date) {
        this.setAttribute("min", date.toISOString());
        return this;
    }
}