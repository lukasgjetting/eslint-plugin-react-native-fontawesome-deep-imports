import { RuleTester } from 'eslint';
import path from 'path';

const parserOptions = {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true,
    },
};

const rule = require('../src/index').rules['react-native-fontawesome-deep-imports'];
const ruleTester = new RuleTester({
    parser: path.join(__dirname, '../node_modules', '@typescript-eslint/parser'),
    parserOptions,
});

ruleTester.run('react-native-fontawesome-deep-imports', rule, {
    valid: [
        `
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
        `,
        `
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
        `,
    ],
    invalid: [
        {
            code: `
import { faCode } from '@fortawesome/free-solid-svg-icons';
            `,
            errors: [{ messageId: 'fontAwesomeIconNotDeepImport' }],
            output: `
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
            `,
        },
        {
            code: `
import {
    faImage,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
            `,
            errors: [{ messageId: 'fontAwesomeIconNotDeepImport' }],
            output: `
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
            `,
        },
    ],
});