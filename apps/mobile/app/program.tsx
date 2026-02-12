import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProgramDays } from '../lib/api';

export default function ProgramScreen() {
  const { data = [] } = useQuery({ queryKey: ['program'], queryFn: fetchProgramDays });
  const progress = Math.round((0 / 21) * 100);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>21-day back program</Text>
      <Text style={{ marginBottom: 12 }}>Progress: {progress}%</Text>
      {data.map((d) => (
        <Text key={d.day_number}>Day {d.day_number} · Lesson #{d.lesson_id}</Text>
      ))}
    </View>
  );
}
