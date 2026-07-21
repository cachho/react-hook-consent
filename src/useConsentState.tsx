import hash from "object-hash";
import { useCallback, useEffect, useState } from "react";
import type { Consent, ConsentOptions } from "./Context";
import { addServices } from "./core/add-services";
import { getFromLocalStorage } from "./core/local-storage/get";
import { isValidInLocalStorage } from "./core/local-storage/valid";
import { updateServices } from "./core/update-services";

type ConsentState = {
	consent: Consent[];
	isBannerVisible: boolean;
	isDetailsVisible: boolean;
	hash: string;
};

export function useConsentState(options: ConsentOptions) {
	const [state, setState] = useState<ConsentState>({
		consent: [],
		isBannerVisible: false,
		isDetailsVisible: false,
		hash: options.customHash ?? hash(options),
	});

	useEffect(() => {
		if (!isValidInLocalStorage(state.hash)) {
			const mandatoryServices = options.services.filter(
				(service) => service.mandatory,
			);
			const consent = mandatoryServices.map((service) => service.id);

			setState((state) => ({
				...state,
				consent,
				isBannerVisible: true,
				isDetailsVisible: false,
			}));
			addServices(mandatoryServices);
			return;
		}

		const { consent, isBannerVisible, isDetailsVisible } = getFromLocalStorage(
			state.hash,
		);

		const serviceIds = new Set(options.services.map((service) => service.id));
		const mandatoryIds = options.services
			.filter((service) => service.mandatory)
			.map((service) => service.id);
		const consentWithMandatory = [...new Set([...mandatoryIds, ...consent])].filter((id) =>
			serviceIds.has(id),
		);
		setState((state) => ({
			...state,
			consent: consentWithMandatory,
			isBannerVisible,
			isDetailsVisible,
		}));

		const approvedServices = options.services.filter((service) =>
			consentWithMandatory.includes(service.id),
		);
		addServices(approvedServices);
	}, [options.services, state.hash]);

	const setConsent = useCallback(
		(consent: Consent[]) => {
			const serviceIds = new Set(options.services.map((service) => service.id));
			const mandatoryIds = options.services
				.filter((service) => service.mandatory)
				.map((service) => service.id);
			const consentWithMandatory = [...new Set([...mandatoryIds, ...consent])].filter((id) =>
				serviceIds.has(id),
			);
				...state,
				consent: consentWithMandatory,
				isBannerVisible: false,
			}));
			updateServices(options, consentWithMandatory, state.hash);
		},
		[options, state.hash],
	);

	const hasConsent = useCallback(
		(id: Consent) => state.consent.includes(id),
		[state.consent],
	);

	const toggleBanner = useCallback(() => {
		setState((state) => ({
			...state,
			isBannerVisible: !state.isBannerVisible,
		}));
	}, []);

	const toggleDetails = useCallback(() => {
		setState((state) => ({
			...state,
			isDetailsVisible: !state.isDetailsVisible,
		}));
	}, []);

	return {
		consent: state.consent,
		hasConsent,
		isBannerVisible: state.isBannerVisible,
		isDetailsVisible: state.isDetailsVisible,
		toggleBanner,
		toggleDetails,
		setConsent,
	};
}
