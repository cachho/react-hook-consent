import { act, renderHook } from '@testing-library/react';
import { ConsentProvider } from './Provider';
import { useConsent } from './useConsent';

const options = {
    services: [
        { id: 'service1', name: 'Service 1' },
        { id: 'service2', name: 'Service 2' },
    ],
};

const optionsWithMandatory = {
    services: [
        { id: 'service1', name: 'Service 1', mandatory: true },
        { id: 'service2', name: 'Service 2' },
    ],
};

describe('useConsent', () => {
    beforeEach(() => {
        localStorage.clear();
    });

it('should throw when used outside a ConsentProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
        expect(() => renderHook(() => useConsent())).toThrow('useConsent must be used within a ConsentProvider');
    } finally {
        consoleSpy.mockRestore();
    }
});

    it('should return false for hasConsent on non-mandatory services before consent is given', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        expect(result.current.hasConsent('service1')).toBe(false);
        expect(result.current.hasConsent('service2')).toBe(false);
    });

    it('should return true for hasConsent on mandatory services and false for non-mandatory', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={optionsWithMandatory}>{children}</ConsentProvider>,
        });

        expect(result.current.hasConsent('service1')).toBe(true);
        expect(result.current.hasConsent('service2')).toBe(false);
    });

    it('should toggle isBannerVisible when toggleBanner is called', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        const initialVisibility = result.current.isBannerVisible;

        act(() => {
            result.current.toggleBanner();
        });
        expect(result.current.isBannerVisible).toBe(!initialVisibility);

        act(() => {
            result.current.toggleBanner();
        });
        expect(result.current.isBannerVisible).toBe(initialVisibility);
    });

    it('should always include mandatory services in consent when setConsent is called without them', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={optionsWithMandatory}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.setConsent([]);
        });

        expect(result.current.consent).toContain('service1');
        expect(result.current.consent).not.toContain('service2');
    });

    it('should always include mandatory services in consent when setConsent is called with other services', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={optionsWithMandatory}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.setConsent(['service2']);
        });

        expect(result.current.consent).toContain('service1');
        expect(result.current.consent).toContain('service2');
    });

    it('should toggle isDetailsVisible state when toggleDetails is called', () => {
        const { result } = renderHook(() => useConsent(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        expect(result.current.isDetailsVisible).toBe(false);

        act(() => {
            result.current.toggleDetails();
        });
        expect(result.current.isDetailsVisible).toBe(true);

        act(() => {
            result.current.toggleDetails();
        });
        expect(result.current.isDetailsVisible).toBe(false);
    });
});
