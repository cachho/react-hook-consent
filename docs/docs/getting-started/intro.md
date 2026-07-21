---
sidebar_position: 1
---

# Intro

Learn to set up a fully working GDPR compliant consent solution.

## Installation

Install the package with:

```bash
yarn add react-hook-consent

# or

npm install react-hook-consent
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run React Hook Consent.

## Migrating from `react-hook-consent`

This package is a maintained fork of the original `react-hook-consent`. If you are already using the original package, you can switch to this fork **without changing any imports** by using npm's package alias feature:

```bash
npm install react-hook-consent@npm:@cachho/react-hook-consent

# or with yarn
yarn add react-hook-consent@npm:@cachho/react-hook-consent
```

Your `package.json` will show:

```json
"react-hook-consent": "npm:@cachho/react-hook-consent@latest"
```

All existing imports continue to work unchanged:

```typescript
import { ConsentProvider, useConsent } from 'react-hook-consent';
```

**This is recommended because it's just easier to import.**

## Basic usage

### Provider

Wrap the application in the `ConsentProvider`. Provide settings via the `options` prop.

```typescript
/*
 * index.tsx
 */

import { ConsentProvider } from 'react-hook-consent';

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
                cookies: [{ pattern: 'cookie-name' }],
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
</ConsentProvider>;
// ...
```

### Banner

Optionally use the banner component to render a banner to show a consent dialogue.

```typescript
/*
 * index.tsx
 */

import { ConsentBanner } from 'react-hook-consent';

// styling
import 'react-hook-consent/dist/styles/style.css';

// ...
<App />
<ConsentBanner
    settings={{ hidden: false, label: 'More', modal: { title: 'Modal title' } }}
    decline={{ hidden: false, label: 'No' }}
    approve={{ label: 'Yes' }}
>
     <>
        Can we use cookies and external services according to our <a href="test">privacy policy</a> to
        improve the browsing experience?
    </>
</ConsentBanner>
// ...
```
