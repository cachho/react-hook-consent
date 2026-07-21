import { useContext } from 'react';
import { ConsentContext } from './Context';

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === null) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
}
