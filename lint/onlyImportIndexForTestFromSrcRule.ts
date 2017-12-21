/* tslint:disable */

import * as Lint from 'tslint'
import { findImports, ImportKind } from 'tsutils'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
	/* tslint:disable:object-literal-sort-keys */
	public static metadata: Lint.IRuleMetadata = {
		ruleName: 'only-import-index-for-test-from-src',
		description: Lint.Utils.dedent`
            When importing from 'src', only lets you import 'src/indexForTest'.`,
		rationale: Lint.Utils.dedent`
            This should prevent undefined modules resulting from circular dependencies when testing.`,
		optionsDescription: 'None.',
		options: {},
		optionExamples: [ true ],
		type: 'functionality',
		typescriptOnly: false,
		hasFix: false,
	}

	public static FAILURE_STRING = 'Do not import anything from "src" except "src/indexForTest".'

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithFunction(sourceFile, walk, this.ruleArguments)
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
	for (const name of findImports(ctx.sourceFile, ImportKind.All)) {
		if (importsAnythingFromSrcOtherThanIndexForTest(name.text)) {
			ctx.addFailureAtNode(name, Rule.FAILURE_STRING)
		}
	}
}

function importsAnythingFromSrcOtherThanIndexForTest(path: string): boolean {
	const splitPath: string[] = path.split('/')
	if (splitPath.includes('src')) {
		return !(splitPath[splitPath.length - 1] === 'indexForTest' && splitPath[splitPath.length - 2] === 'src')
	}

	return false
}