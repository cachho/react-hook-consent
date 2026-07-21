import { act, renderHook } from '@testing-library/react';
import { ConsentProvider } from '../Provider';
import { useConsentBannerActions } from './useConsentBannerActions';

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

const mockSetConsent = jest.fn();
const mockUseConsent = jest.fn();

jest.mock('../useConsent', () => ({
    useConsent: (...args: unknown[]) => mockUseConsent(...args),
}));

describe('useConsentBannerActions', () => {
    beforeEach(() => {
        mockSetConsent.mockClear();
        mockUseConsent.mockReset();
        mockUseConsent.mockReturnValue({
            setConsent: mockSetConsent,
            options,
        });
    });

    it('should call setConsent with all service ids when onApprove is called without arguments', () => {
        const { result } = renderHook(() => useConsentBannerActions(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.onApprove();
        });

        expect(mockSetConsent).toHaveBeenCalledWith(['service1', 'service2']);
    });

    it('should call setConsent with given service ids when onApprove is called with arguments', () => {
        const { result } = renderHook(() => useConsentBannerActions(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.onApprove(['service1']);
        });
        expect(mockSetConsent).toHaveBeenCalledWith(['service1']);
    });

    it('should call setConsent with empty array when onDecline is called and no services are mandatory', () => {
        const { result } = renderHook(() => useConsentBannerActions(), {
            wrapper: ({ children }) => <ConsentProvider options={options}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.onDecline();
        });

        expect(mockSetConsent).toHaveBeenCalledWith([]);
    });

    it('should call setConsent with mandatory service ids when onDecline is called and some services are mandatory', () => {
        mockUseConsent.mockReturnValueOnce({
            setConsent: mockSetConsent,
            options: optionsWithMandatory,
        });

        const { result } = renderHook(() => useConsentBannerActions(), {
            wrapper: ({ children }) => <ConsentProvider options={optionsWithMandatory}>{children}</ConsentProvider>,
        });

        act(() => {
            result.current.onDecline();
        });

        expect(mockSetConsent).toHaveBeenCalledWith(['service1']);
    });
});
