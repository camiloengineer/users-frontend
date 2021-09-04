"use strict";
var core_1 = require('@angular/core');
var rutHelpers = require('rut-helpers');
var RutDirective = (function () {
    function RutDirective() {
        this.rutChange = new core_1.EventEmitter();
    }
    RutDirective.prototype.onFocus = function (ev) {
        var htmlInputElement = ev.target;
        htmlInputElement.value = rutHelpers.rutClean(htmlInputElement.value);
    };
    RutDirective.prototype.onBlur = function (ev) {
        var htmlInputElement = ev.target;
        htmlInputElement.value = rutHelpers.rutFormat(htmlInputElement.value) || '';
    };
    RutDirective.prototype.onChange = function (ev) {
        var htmlInputElement = ev.target;
        this.rutChange.emit(rutHelpers.rutClean(htmlInputElement.value));
    };
    RutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[formatRut]',
                    host: {
                        '(blur)': 'onBlur($event)',
                        '(focus)': 'onFocus($event)',
                        '(input)': 'onChange($event)',
                    },
                },] },
    ];
    /** @nocollapse */
    RutDirective.ctorParameters = function () { return []; };
    RutDirective.propDecorators = {
        'rutChange': [{ type: core_1.Output },],
    };
    return RutDirective;
}());
exports.RutDirective = RutDirective;
