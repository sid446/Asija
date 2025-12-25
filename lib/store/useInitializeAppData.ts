import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchHeroContent } from '@/lib/store/slices/heroSlice';
import { fetchServices } from '@/lib/store/slices/servicesSlice';
import { fetchInsights } from '@/lib/store/slices/insightsSlice';
import { fetchRegions } from '@/lib/store/slices/regionsSlice';
import { fetchFAQs } from '@/lib/store/slices/faqsSlice';
import { fetchIndustries } from '@/lib/store/slices/industriesSlice';
import { fetchContactContent, fetchLocations } from '@/lib/store/slices/contactSlice';
import { fetchGlobalServiceContent, fetchGlobalRegions, fetchGlobalOfferings } from '@/lib/store/slices/globalServicesSlice';

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

  useEffect(() => {
    // Initialize all data on app start
    const initializeData = async () => {
      // Fetch hero content if not loaded
      if (!heroContent && !heroLoading) {
        dispatch(fetchHeroContent());
      }

      // Fetch services if not loaded
      if (services.length === 0 && !servicesLoading) {
        dispatch(fetchServices());
      }

      // Fetch insights if not loaded
      if (insights.length === 0 && !insightsLoading) {
        dispatch(fetchInsights());
      }

      // Fetch regions if not loaded
      if (regions.length === 0 && !regionsLoading) {
        dispatch(fetchRegions());
      }

      // Fetch FAQs if not loaded
      if (faqs.length === 0 && !faqsLoading) {
        dispatch(fetchFAQs());
      }

      // Fetch industries if not loaded
      if (industries.length === 0 && !industriesLoading) {
        dispatch(fetchIndustries());
      }

      // Fetch contact content if not loaded
      if (!contactContent && !contactLoading) {
        dispatch(fetchContactContent());
      }

      // Fetch locations if not loaded
      if (locations.length === 0 && !contactLoading) {
        dispatch(fetchLocations());
      }

      // Fetch global service content if not loaded
      if (!globalContent && !globalServicesLoading) {
        dispatch(fetchGlobalServiceContent());
      }

      // Fetch global regions if not loaded
      if (globalRegions.length === 0 && !globalServicesLoading) {
        dispatch(fetchGlobalRegions());
      }

      // Fetch global offerings if not loaded
      if (offerings.length === 0 && !globalServicesLoading) {
        dispatch(fetchGlobalOfferings());
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
    globalServicesLoading
  ]);

  return {
    isLoading: heroLoading || servicesLoading || insightsLoading || regionsLoading || faqsLoading || industriesLoading || contactLoading || globalServicesLoading,
    hasData: !!(heroContent && services.length > 0 && insights.length > 0 && regions.length > 0 && faqs.length > 0 && industries.length > 0 && contactContent && locations.length > 0 && globalContent && globalRegions.length > 0 && offerings.length > 0),
    heroContent
  };
} 