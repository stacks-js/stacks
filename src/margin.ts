export default class Margin {
    static min: string = "-10px";
    static default: string = "0px";

    static size(size:number, unit?:string) {
        return size.toString() + (unit ? unit : "px");
    }
}