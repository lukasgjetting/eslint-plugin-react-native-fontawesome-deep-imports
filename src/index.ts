import { Rule } from 'eslint';
import { ImportDeclaration, ImportSpecifier } from 'estree';

// This is an object instead of an array to speed up the checking
const iconPackages = {
    "@fortawesome/free-brands-svg-icons": true,
    "@fortawesome/free-regular-svg-icons": true,
    "@fortawesome/free-solid-svg-icons": true,
    "@fortawesome/pro-duotone-svg-icons": true,
    "@fortawesome/pro-light-svg-icons": true,
    "@fortawesome/pro-regular-svg-icons": true,
    "@fortawesome/pro-solid-svg-icons": true,
};


const reactNativeFontAwesomeDeepImports = (context: Rule.RuleContext) : Rule.RuleListener => {
    return {
        ImportDeclaration(node: ImportDeclaration) {
            const source = node.source.value;

            // If import is not from a package we care about, ignore it
            if (
                typeof source !== 'string' ||
                iconPackages[source] !== true
            ) {
                return;
            }

            const importedIcons = node.specifiers.filter((s): s is ImportSpecifier => s.type === 'ImportSpecifier')

            // We ignore default imports
            if (importedIcons.length === 0) {
                return;
            }

            const sourceCode = context.getSourceCode();

            context.report({
                node,
                messageId: 'fontAwesomeIconNotDeepImport',
                fix: (fixer) => {
                    const newImports = importedIcons.map((i) => `import { ${i.local.name} } from '${source}/${i.local.name}';`);

                    return fixer.replaceText(node, newImports.join('\n'));
                },
            });
        },
    };
};

module.exports = {
    rules: {
        'react-native-fontawesome-deep-imports': {
            meta: {
                fixable: 'code',
                messages: {
                    fontAwesomeIconNotDeepImport: 'Icons should be imported from the exact module (i.e. `import { faCode } from \'@fortawesome/free-brands-svg-icons/faCode\';`).',
                },
            },
            create: reactNativeFontAwesomeDeepImports,
        },
    },
};