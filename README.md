![publish workflow](https://github.com/cachho/react-hook-consent/actions/workflows/publish.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40cachho%2Freact-hook-consent.svg)](https://badge.fury.io/js/%40cachho%2Freact-hook-consent)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# @cachho/react-hook-consent

> Fork of [react-hook-consent](https://github.com/lukaskupczyk/react-hook-consent) by Lukas Kupczyk.

React consent management solution and banner for cookies, local storage, session storage and (external) scripts.

![react-hook-consent Screenshot](/assets/screenshot.png)

## Documentation

-   [Documentation](https://cachho.github.io/react-hook-consent/)

## Features

-   Provides the consent context to components
-   Loads (external) scripts based on consent state
-   Deletes cookies, local storage and session storage when consent declined
-   Hook to retrieve and change the current consent
-   Optional Banner with detailed settings to approve / decline consent
-   Persists the selection to local storage
-   Ready for Next.js
-   Dark and light mode
-   Styling via css

## Installation

```bash
yarn add @cachho/react-hook-consent

# or

npm install @cachho/react-hook-consent
```

## Basic usage

Wrap the application in the `ConsentProvider`. Provide settings via the `options` prop. Optionally use the `ConsentBanner` component to display a consent banner to the user.

```typescript
/*
 * index.tsx
 */

import { ConsentBanner, ConsentProvider } from '@cachho/react-hook-consent';

// styling
import '@cachho/react-hook-consent/dist/styles/style.css';

// ...
<ConsentProvider
    options={{
        services: [
            {
                id: 'myid',
                name: 'MyName',
                scripts: [
                    { id: 'external-script', src: 'https://myscript.com/script.js' },
                    { id: 'inline-code', code: `alert("I am a JavaScript code");` },
                ],
                cookies: [{ pattern: 'cookie-name' }, { pattern: /regex/ }],
                localStorage: ['local-storage-key'],
                sessionStorage: ['session-storage-key'],
                mandatory: true,
            },
        ],
        // customHash: 'my-custom-hash', // optional, e.g. when changing the options based on language
        theme: 'light',
    }}
>
    <App />
    <ConsentBanner
        settings={{ hidden: false, label: 'More', modal: { title: 'Modal title' } }}
        decline={{ hidden: false, label: 'No' }}
        approve={{ label: 'Yes' }}
    >
        <>
            Can we use cookies and external services according to our <a href="test">privacy policy</a> to improve the
            browsing experience?
        </>
    </ConsentBanner>
</ConsentProvider>;
// ...
```
