import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from './context/ThemeProvider';
import { SDUIEngine } from './components/sdui/DynamicRenderes';
import { CampaignSwitcher } from './components/sdui/CampaignSwitcher';
import { fetchPayload, getAllCampaigns } from './utils/mockPayload';
import { CampaignPayload } from './types/schemas';

const RootComponent = () => {
  const [campaign, setCampaign] = useState<CampaignPayload | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignPayload[]>([]);
  const [activeCampaignId, setActiveCampaignId] = useState<string>('back-to-school');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme, setTheme } = useAppTheme();
  const entranceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const campaignContext = getAllCampaigns();
    setCampaigns(campaignContext.campaigns);
    setActiveCampaignId(campaignContext.activeCampaignId);
  }, []);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    fetchPayload(activeCampaignId)
      .then((data) => {
        if (!mounted) return;
        setTheme(data.theme);
        setCampaign(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load campaign';
        setError(errorMessage);
        setIsLoading(false);
        console.error('[App] Error fetching campaign:', err);
      });

    return () => {
      mounted = false;
    };
  }, [activeCampaignId, setTheme]);

  const handleCampaignChange = useCallback((campaignId: string) => {
    setActiveCampaignId(campaignId);
  }, []);

  useEffect(() => {
    if (isLoading || !campaign) {
      return;
    }

    entranceAnim.setValue(0);
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [campaign, entranceAnim, isLoading]);

  const animatedShellStyle = {
    opacity: entranceAnim,
    transform: [
      {
        translateY: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },
    ],
  };

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.decorBlob, { backgroundColor: theme.primary }]} />
        <View style={[styles.decorBlobAlt, { backgroundColor: theme.accent }]} />
        <View style={styles.centered}>
          <View style={[styles.frostCard, { borderColor: theme.primary }]}>
            <Text style={[styles.errorText, { color: theme.primary }]}>Campaign failed</Text>
            <Text style={[styles.errorDetails, { color: theme.secondary }]}>{error}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Loading state
  if (!campaign || isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.decorBlob, { backgroundColor: theme.primary }]} />
        <View style={[styles.decorBlobAlt, { backgroundColor: theme.accent }]} />
        <View style={styles.centered}>
          <View style={[styles.frostCard, { borderColor: theme.primary }]}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.primary }]}>Loading campaign...</Text>
            <Text style={[styles.loadingSubtext, { color: theme.secondary }]}>Preparing a richer layout experience.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.decorBlob, { backgroundColor: theme.primary }]} />
      <View style={[styles.decorBlobAlt, { backgroundColor: theme.accent }]} />
      <Animated.View style={[styles.shell, animatedShellStyle]}>
        <View style={styles.heroCopy}>
          <Text style={[styles.title, { color: theme.primary }]}>Server-driven UI App</Text>
          <Text style={[styles.subtitle, { color: theme.secondary }]}>Build with ❤️ by Nirmit Sahu</Text>
        </View>
        <CampaignSwitcher
          campaigns={campaigns}
          activeCampaignId={activeCampaignId}
          onCampaignChange={handleCampaignChange}
        />
        <SDUIEngine payload={campaign} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RootComponent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  shell: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heroCopy: {
    paddingHorizontal: 2,
    paddingTop: 2,
    paddingBottom: 12,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  frostCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  errorText: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  errorDetails: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  decorBlob: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.08,
  },
  decorBlobAlt: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.12,
  },
});