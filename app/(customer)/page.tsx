import { HomeHero } from '@/features/customer/home/HomeHero';
import {
  DailyOpportunities,
  EditorialBanners,
  FeaturedMerchants,
  HowItWorks,
  LimitedAvailability,
  MerchantCallout,
  NearbyStores,
  NewArrivals,
  PopularCategories,
  RecommendedProducts,
} from '@/features/customer/home/HomeSections';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DailyOpportunities />
      <PopularCategories />
      <NearbyStores />
      <LimitedAvailability />
      <RecommendedProducts />
      <FeaturedMerchants />
      <EditorialBanners />
      <NewArrivals />
      <HowItWorks />
      <MerchantCallout />
    </>
  );
}
