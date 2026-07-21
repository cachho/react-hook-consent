import { act, renderHook } from "@testing-library/react";
import { ConsentProvider } from "./Provider";
import { useConsent } from "./useConsent";

const options = {
	services: [
		{ id: "service1", name: "Service 1" },
		{ id: "service2", name: "Service 2" },
	],
};

const optionsWithMandatory = {
	services: [
		{ id: "service1", name: "Service 1", mandatory: true },
		{ id: "service2", name: "Service 2" },
	],
};

describe("useConsent", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("should always include mandatory services in consent when setConsent is called without them", () => {
		const { result } = renderHook(() => useConsent(), {
			wrapper: ({ children }) => (
				<ConsentProvider options={optionsWithMandatory}>
					{children}
				</ConsentProvider>
			),
		});

		act(() => {
			result.current.setConsent([]);
		});

		expect(result.current.consent).toContain("service1");
		expect(result.current.consent).not.toContain("service2");
	});

	it("should always include mandatory services in consent when setConsent is called with other services", () => {
		const { result } = renderHook(() => useConsent(), {
			wrapper: ({ children }) => (
				<ConsentProvider options={optionsWithMandatory}>
					{children}
				</ConsentProvider>
			),
		});

		act(() => {
			result.current.setConsent(["service2"]);
		});

		expect(result.current.consent).toContain("service1");
		expect(result.current.consent).toContain("service2");
	});

	it("should toggle isDetailsVisible state when toggleDetails is called", () => {
		const { result } = renderHook(() => useConsent(), {
			wrapper: ({ children }) => (
				<ConsentProvider options={options}>{children}</ConsentProvider>
			),
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
