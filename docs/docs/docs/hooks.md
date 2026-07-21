---
sidebar_position: 3
---

# Hooks

We provide a hook to access the current consent state.

> **_NOTE:_** The hook must be called inside the subtree of a `ConsentProvider`. Calling it outside a provider will throw: `useConsent must be used within a ConsentProvider`.

## useConsent

Use the provided `useConsent` hook to access or update the current consent and show or hide the banner.

```typescript
/*
 * App.tsx
 */

import { ConsentProvider, useConsent } from 'react-hook-consent';

function ConsentControls() {
  const { consent, setConsent, isBannerVisible, toggleBanner, isDetailsVisible, toggleDetails } = useConsent();
  // ...
}

export default function App() {
  return (
    <ConsentProvider options={/* your options */}>
      <ConsentControls />
    </ConsentProvider>
  );
}
```

### API

#### Return Values

| Object Name      | Type                         | Description                                         |
| ---------------- | ---------------------------- | --------------------------------------------------- |
| consent          | Consent[]                    | Services which have been consent to                 |
| hasConsent       | (id: Consent) => boolean     | Get consent state of specific id                    |
| isBannerVisible  | boolean                      | Indicates if consent banner is visible              |
| toggleBanner     | () => void                   | Shows or hides the consent banner                   |
| setConsent       | (consent: Consent[]) => void | Update consent by providing consent ids to be saved |
| isDetailsVisible | boolean                      | Indicates if details / settings modal is visible    |
| toggleDetails    | () => void                   | Shows or hides the details / settings modal         |
