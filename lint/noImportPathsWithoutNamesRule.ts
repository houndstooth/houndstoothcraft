/* tslint:disable */

import * as Lint from 'tslint'
import { findImports, ImportKind } from 'tsutils'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
	/* tslint:disable:object-literal-sort-keys */
	public static metadata: Lint.IRuleMetadata = {
		ruleName: 'no-import-paths-without-names',
		description: Lint.Utils.dedent`
            Disallows importing from paths like '../', '../../', and './'.`,
		rationale: Lint.Utils.dedent`
            This should encourage awareness of module boundaries.`,
		optionsDescription: 'None.',
		options: {},
		optionExamples: [ true ],
		type: 'functionality',
		typescriptOnly: false,
		hasFix: false,
	}

	public static FAILURE_STRING = 'Do not import from a parent index. Import directly from modules by their name.'

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithFunction(sourceFile, walk, this.ruleArguments)
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
	for (const name of findImports(ctx.sourceFile, ImportKind.All)) {
		if (importPathLacksName(name.text)) {
			ctx.addFailureAtNode(name, Rule.FAILURE_STRING)
		}
	}
}

function importPathLacksName(path: string): boolean {
	return path.split('/').every(step => {
		return step === '..' || step === '.' || step === ''
	})
}
