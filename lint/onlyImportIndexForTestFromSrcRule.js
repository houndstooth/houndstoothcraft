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
var tsutils_1 = require("tsutils");
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
        ruleName: 'only-import-index-for-test-from-src',
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            When importing from 'src', only lets you import 'src/indexForTest'."], ["\n            When importing from 'src', only lets you import 'src/indexForTest'."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            This should prevent undefined modules resulting from circular dependencies when testing."], ["\n            This should prevent undefined modules resulting from circular dependencies when testing."]))),
        optionsDescription: 'None.',
        options: {},
        optionExamples: [true],
        type: 'functionality',
        typescriptOnly: false,
        hasFix: false
    };
    Rule.FAILURE_STRING = 'Do not import anything from "src" except "src/indexForTest".';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    for (var _i = 0, _a = tsutils_1.findImports(ctx.sourceFile, 31 /* All */); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        if (importsAnythingFromSrcOtherThanIndexForTest(name_1.text)) {
            ctx.addFailureAtNode(name_1, Rule.FAILURE_STRING);
        }
    }
}
function importsAnythingFromSrcOtherThanIndexForTest(path) {
    var splitPath = path.split('/');
    if (splitPath.includes('src')) {
        return !(splitPath[splitPath.length - 1] === 'indexForTest' && splitPath[splitPath.length - 2] === 'src');
    }
    return false;
}
var templateObject_1, templateObject_2;
