import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TimeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="time" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Time</ThemedText>
      </ThemedView>
      <ThemedText>This is a placeholder for the Time</ThemedText>
      <Collapsible title="Placeholder Section 1">
        <ThemedText>This section is currently a placeholder.</ThemedText>
      </Collapsible>
      <Collapsible title="Placeholder Section 2">
        <ThemedText>This section is currently a placeholder.</ThemedText>
      </Collapsible>
      <Collapsible title="Placeholder Section 3">
        <ThemedText>This section is currently a placeholder.</ThemedText>
      </Collapsible>
      <Collapsible title="More Information">
        <ThemedText>
          More information can be added here later. This is just a placeholder.
        </ThemedText>
      </Collapsible>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
