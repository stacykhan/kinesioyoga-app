import { Pressable, Text, View } from 'react-native';

export function LessonCard({ title, duration, level, premium, onPress }: { title: string; duration: number; level: string; premium: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '600' }}>{title}</Text>
        {premium ? <Text>⭐</Text> : null}
      </View>
      <Text>{duration} min · {level}</Text>
    </Pressable>
  );
}
