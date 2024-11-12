import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TimeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={310} name="time" style={styles.headerImage} />}>
      <View style={styles.timerBackground}>
        {/* Timer Display */}
        <Text style={styles.timerText}>00:00</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#808080',
  },
  timerBackground: {
    backgroundColor: '#f0f0f0', 
    paddingVertical: 10,         
    paddingHorizontal: 20,       
    borderRadius: 10,           
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
});
