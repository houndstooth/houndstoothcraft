import * as Lint from 'tslint'
import { findImports, ImportKind } from 'tsutils'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
	/* tslint:disable:object-literal-sort-keys */
	public static metadata: Lint.IRuleMetadata = {
		ruleName: 'no-reaching-imports',
		description: Lint.Utils.dedent`
            Disallows importing any submodule.`,
		rationale: Lint.Utils.dedent`
            I hope this will help prevent circular dependencies.`,
		optionsDescription: 'None.',
		options: {},
		optionExamples: [ true ],
		type: 'functionality',
		typescriptOnly: false,
	}

	public static FAILURE_STRING = 'Do not reach into a module to import its submodules; maybe this module needs to expose this submodule?'

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithFunction(sourceFile, walk, this.ruleArguments)
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
	for (const name of findImports(ctx.sourceFile, ImportKind.All)) {
		if (isSubmodulePath(name.text)) {
			ctx.addFailureAtNode(name, Rule.FAILURE_STRING)
		}
	}
}

function isSubmodulePath(path: string): boolean {
	const steps = path.split('/')
	let badSteps = 0
	steps.forEach(step => {
		if (step !== '..' && step !== '.') {
			badSteps = badSteps + 1
		}
	})
	return badSteps > 1
}
