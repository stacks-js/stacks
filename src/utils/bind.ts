interface String {
    bind(object: any): Array<any>;
}

String.prototype.bind = function(object): Array<any> {
    const states = object.states || object;
    return [states, this];
}