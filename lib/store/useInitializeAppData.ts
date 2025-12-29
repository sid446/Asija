import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchHeroContent } from '@/lib/store/slices/heroSlice';
import { fetchServices } from '@/lib/store/slices/servicesSlice';
import { fetchInsights } from '@/lib/store/slices/insightsSlice';
import { fetchRegions } from '@/lib/store/slices/regionsSlice';
import { fetchFAQs } from '@/lib/store/slices/faqsSlice';
import { fetchIndustries } from '@/lib/store/slices/industriesSlice';
import { fetchContactContent, fetchLocations } from '@/lib/store/slices/contactSlice';
import { fetchGlobalServiceContent, fetchGlobalRegions, fetchGlobalOfferings } from '@/lib/store/slices/globalServicesSlice';
import { fetchAboutContent } from '@/lib/store/slices/aboutSlice';
import { fetchAboutCards } from '@/lib/store/slices/aboutCardsSlice';
import { fetchPolicies } from '@/lib/store/slices/policiesSlice';

// Global refs to prevent multiple fetches across component remounts
const industriesFetchedRef = { current: false };
const servicesFetchedRef = { current: false };
const insightsFetchedRef = { current: false };
const regionsFetchedRef = { current: false };
const faqsFetchedRef = { current: false };
const contactFetchedRef = { current: false };
const locationsFetchedRef = { current: false };
const globalContentFetchedRef = { current: false };
const globalRegionsFetchedRef = { current: false };
const globalOfferingsFetchedRef = { current: false };
const aboutContentFetchedRef = { current: false };
const aboutCardsFetchedRef = { current: false };
const policiesFetchedRef = { current: false };

export function useInitializeAppData() {
  const dispatch = useAppDispatch();
  const { content: heroContent, loading: heroLoading } = useAppSelector((state) => state.hero);
  const { services, loading: servicesLoading } = useAppSelector((state) => state.services);
  const { insights, loading: insightsLoading } = useAppSelector((state) => state.insights);
  const { regions, loading: regionsLoading } = useAppSelector((state) => state.regions);
  const { faqs, loading: faqsLoading } = useAppSelector((state) => state.faqs);
  const { industries, loading: industriesLoading } = useAppSelector((state) => state.industries);
  const { contactContent, locations, loading: contactLoading } = useAppSelector((state) => state.contact);
  const { content: globalContent, regions: globalRegions, offerings, loading: globalServicesLoading } = useAppSelector((state) => state.globalServices);
  const { content: aboutContent, loading: aboutLoading } = useAppSelector((state) => state.about);
  const { cards: aboutCards, loading: aboutCardsLoading } = useAppSelector((state) => state.aboutCards);
  const { policies, loading: policiesLoading } = useAppSelector((state) => state.policies);

  useEffect(() => {
    // Initialize all data on app start
    const initializeData = async () => {
      // Fetch hero content if not loaded
      if (!heroContent && !heroLoading) {
        dispatch(fetchHeroContent());
      }

      // Fetch services if not loaded
      if (services.length === 0 && !servicesLoading && !servicesFetchedRef.current) {
        servicesFetchedRef.current = true;
        dispatch(fetchServices());
      }

      // Fetch insights if not loaded
      if (insights.length === 0 && !insightsLoading && !insightsFetchedRef.current) {
        insightsFetchedRef.current = true;
        dispatch(fetchInsights());
      }

      // Fetch regions if not loaded
      if (regions.length === 0 && !regionsLoading && !regionsFetchedRef.current) {
        regionsFetchedRef.current = true;
        dispatch(fetchRegions());
      }

      // Fetch FAQs if not loaded
      if (faqs.length === 0 && !faqsLoading && !faqsFetchedRef.current) {
        faqsFetchedRef.current = true;
        dispatch(fetchFAQs());
      }

      // Fetch industries if not loaded
      if (industries.length === 0 && !industriesLoading && !industriesFetchedRef.current) {
        industriesFetchedRef.current = true;
        dispatch(fetchIndustries());
      }

      // Fetch contact content if not loaded
      if (!contactContent && !contactLoading && !contactFetchedRef.current) {
        contactFetchedRef.current = true;
        dispatch(fetchContactContent());
      }

      // Fetch locations if not loaded
      if (locations.length === 0 && !contactLoading && !locationsFetchedRef.current) {
        locationsFetchedRef.current = true;
        dispatch(fetchLocations());
      }

      // Fetch global service content if not loaded
      if (!globalContent && !globalServicesLoading && !globalContentFetchedRef.current) {
        globalContentFetchedRef.current = true;
        dispatch(fetchGlobalServiceContent());
      }

      // Fetch global regions if not loaded
      if (globalRegions.length === 0 && !globalServicesLoading && !globalRegionsFetchedRef.current) {
        globalRegionsFetchedRef.current = true;
        dispatch(fetchGlobalRegions());
      }

      // Fetch global offerings if not loaded
      if (offerings.length === 0 && !globalServicesLoading && !globalOfferingsFetchedRef.current) {
        globalOfferingsFetchedRef.current = true;
        dispatch(fetchGlobalOfferings());
      }

      // Fetch about content if not loaded
      if (!aboutContent && !aboutLoading && !aboutContentFetchedRef.current) {
        aboutContentFetchedRef.current = true;
        dispatch(fetchAboutContent());
      }

      // Fetch about cards if not loaded
      if (aboutCards.length === 0 && !aboutCardsLoading && !aboutCardsFetchedRef.current) {
        aboutCardsFetchedRef.current = true;
        dispatch(fetchAboutCards());
      }

      // Fetch policies if not loaded
      if (policies.length === 0 && !policiesLoading && !policiesFetchedRef.current) {
        policiesFetchedRef.current = true;
        dispatch(fetchPolicies());
      }
    };

    initializeData();
  }, [
    dispatch,
    heroContent,
    heroLoading,
    services.length,
    servicesLoading,
    insights.length,
    insightsLoading,
    regions.length,
    regionsLoading,
    faqs.length,
    faqsLoading,
    industries.length,
    industriesLoading,
    contactContent,
    locations.length,
    contactLoading,
    globalContent,
    globalRegions.length,
    offerings.length,
    globalServicesLoading,
    aboutContent,
    aboutLoading,
    aboutCards.length,
    aboutCardsLoading,
    policies.length,
    policiesLoading
  ]);

  return {
    isLoading: heroLoading || servicesLoading || insightsLoading || regionsLoading || faqsLoading || industriesLoading || contactLoading || globalServicesLoading || aboutLoading || aboutCardsLoading || policiesLoading,
    hasData: !!(heroContent && services.length > 0 && insights.length > 0 && regions.length > 0 && faqs.length > 0 && industries.length > 0 && contactContent && locations.length > 0 && globalContent && globalRegions.length > 0 && offerings.length > 0 && aboutContent && aboutCards.length > 0 && policies.length >= 0),
    heroContent
  };
} 