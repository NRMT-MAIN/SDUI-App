import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CampaignPayload } from '../../types/schemas';
import { useAppTheme } from '../../context/ThemeProvider';

interface CampaignSwitcherProps {
  campaigns: CampaignPayload[];
  activeCampaignId: string;
  onCampaignChange: (campaignId: string) => void;
}

const Switcher = ({
  campaigns,
  activeCampaignId,
  onCampaignChange,
}: CampaignSwitcherProps) => {
  const { theme } = useAppTheme();
  const entranceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entranceAnim]);

  const handleCampaignPress = useCallback(
    (campaignId: string) => {
      onCampaignChange(campaignId);
    },
    [onCampaignChange]
  );

  const animatedContainerStyle = {
    opacity: entranceAnim,
    transform: [
      {
        translateY: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.primary,
        },
        animatedContainerStyle,
      ]}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Live Campaigns</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {campaigns.map((campaign) => {
          const isActive = campaign.id === activeCampaignId;
          return (
            <TouchableOpacity
              key={campaign.id}
              style={[
                styles.campaignButton,
                isActive
                  ? [styles.activeCampaignButton, { backgroundColor: theme.primary }]
                  : { borderColor: theme.primary },
              ]}
              onPress={() => handleCampaignPress(campaign.id)}
              activeOpacity={0.75}
              testID={`campaign-button-${campaign.id}`}
            >
              <Text
                style={[
                  styles.campaignButtonText,
                  isActive && { color: theme.background },
                ]}
              >
                {campaign.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderRadius: 24,
    marginHorizontal: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingRight: 6,
  },
  campaignButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  activeCampaignButton: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  campaignButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
});

export const CampaignSwitcher = memo(Switcher);
