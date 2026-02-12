import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getOfferings, purchasePackage, restorePurchases } from '../lib/purchases';

export default function PaywallScreen() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    getOfferings().then((o) => setPackages(o.current?.availablePackages ?? []));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text style={{ fontWeight: '700', fontSize: 22 }}>{t('paywallTitle')}</Text>
      {packages.map((pkg) => (
        <Pressable key={pkg.identifier} onPress={() => purchasePackage(pkg)}>
          <Text>{pkg.product.title} - {pkg.product.priceString}</Text>
        </Pressable>
      ))}
      <Pressable onPress={() => restorePurchases()}><Text>{t('restore')}</Text></Pressable>
    </View>
  );
}
