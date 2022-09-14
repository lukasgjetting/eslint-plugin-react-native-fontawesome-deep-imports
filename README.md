# eslint-plugin-react-native-fontawesome-deep-imports

An ESLint rule to enforce deep imports when importing FontAwesome icons in React Native.

## Why?

As documented in the [FontAwesome 6 documentation](https://fontawesome.com/v6/docs/web/use-with/react-native#same-icon-different-styles), icons should always be imported from the exact module.

Instead of doing this:

```js
import { faCode } from '@fortawesome/free-solid-svg-icons';
```

... you should be doing this:

```js
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
```

This avoids certain issues with treeshaking, causing build times to greatly increase.

## Installation

First, make sure you have ESLint installed and set up.

Then, install `eslint-plugin-react-native-fontawesome-deep-imports`:

```sh
npm install --save-dev eslint-plugin-react-native-fontawesome-deep-imports

# or

yarn add --dev eslint-plugin-react-native-fontawesome-deep-imports
```

## Usage

Add `react-native-fontawesome-deep-imports` to your ESLint plugins in `.eslintrc`:

```json
{
  "plugins": ["react-native-fontawesome-deep-imports"]
}
```

Then enable the rule in the `rules` section of `.eslintrc`:

```json
{
  "rules": {
    "react-native-fontawesome-deep-imports/react-native-fontawesome-deep-imports": "error"
  }
}
```

### Automatic fix

Incorrect code can be automatically fixed by running eslint with the `--fix` argument.

### Incorrect code for this rule

```js
import { faCode } from '@fortawesome/free-solid-svg-icons';
```

```js
import {
  faImage,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
```

### Correct code for this rule

```js
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
```

```js
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
```

## Contributing

Issues and PRs are more than welcome. Thanks!
