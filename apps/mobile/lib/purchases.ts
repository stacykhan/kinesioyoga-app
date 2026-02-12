import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Purchases from 'react-native-purchases';

const entitlement = 'premium';

export const configurePurchases = async (appUserId?: string) => {
  const apiKey = Platform.select({
    ios: Constants.expoConfig?.extra?.rcIos,
    android: Constants.expoConfig?.extra?.rcAndroid
  });
  if (apiKey) {
    await Purchases.configure({ apiKey, appUserID: appUserId });
  }
};

export const getOfferings = () => Purchases.getOfferings();
export const purchasePackage = (pkg: Purchases.Package) => Purchases.purchasePackage(pkg);
export const restorePurchases = () => Purchases.restorePurchases();

export const hasPremiumEntitlement = async () => {
  const info = await Purchases.getCustomerInfo();
  return Boolean(info.entitlements.active[entitlement]);
};
