/* tslint:disable */

import * as Lint from 'tslint'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
	/* tslint:disable:object-literal-sort-keys */
	public static metadata: Lint.IRuleMetadata = {
		ruleName: 'no-app-state',
		description: Lint.Utils.dedent`
            Disallows using the app state in particular areas.`,
		rationale: Lint.Utils.dedent`
            This should encourage awareness of module boundaries.`,
		optionsDescription: 'None.',
		options: {},
		optionExamples: [ true ],
		type: 'functionality',
		typescriptOnly: false,
		hasFix: false,
	}

	public static FAILURE_STRING = 'Do not use app state here. Find or write a getter, or re-evaluate your approach.'

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithFunction(sourceFile, walk, this.ruleArguments)
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
	ts.forEachChild(ctx.sourceFile, (node: ts.Node): void => {
		if (node.getText().includes('appState')) {
			ctx.addFailureAtNode(node, Rule.FAILURE_STRING)
		}
	})
}
