import { View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

export function FilterBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useTranslation();
  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        placeholder={t('search')}
        value={value}
        onChangeText={onChange}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10 }}
      />
    </View>
  );
}
