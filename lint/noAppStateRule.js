"use strict";
/* tslint:disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: 'no-app-state',
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Disallows using the app state in particular areas."], ["\n            Disallows using the app state in particular areas."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            This should encourage awareness of module boundaries."], ["\n            This should encourage awareness of module boundaries."]))),
        optionsDescription: 'None.',
        options: {},
        optionExamples: [true],
        type: 'functionality',
        typescriptOnly: false,
        hasFix: false
    };
    Rule.FAILURE_STRING = 'Do not use app state here. Find or write a getter, or re-evaluate your approach.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function (node) {
        if (node.getText().includes('appState')) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    });
}
var templateObject_1, templateObject_2;
