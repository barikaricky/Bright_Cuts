import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

// GROOMOSPHERE Design System
const COLORS = {
  primary: '#003366',
  secondary: '#FFD700',
  accent: '#F2F2F2',
  text: {
    primary: '#333333',
    secondary: '#666666',
    inverse: '#FFFFFF',
  },
  white: '#FFFFFF',
};

export default function App() {
  const [userType, setUserType] = useState<'customer' | 'barber' | null>(null);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>G</Text>
            </View>
            <Text style={styles.appName}>GROOMOSPHERE</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroLogo}>
            <Text style={styles.heroLogoText}>G</Text>
          </View>
          <Text style={styles.title}>GROOMOSPHERE</Text>
          <Text style={styles.tagline}>Professional Barber Services, On-Demand</Text>
          <Text style={styles.description}>
            Connect with professional barbers for quality haircuts at your location. 
            Experience convenience, quality, and style.
          </Text>
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeSection}>
          <Text style={styles.sectionTitle}>Choose Your Experience</Text>
          
          <View style={styles.userTypeGrid}>
            {/* Customer Card */}
            <TouchableOpacity
              style={[
                styles.userTypeCard,
                userType === 'customer' && styles.userTypeCardSelected
              ]}
              onPress={() => setUserType('customer')}
            >
              <View style={styles.userTypeIcon}>
                <Text style={styles.userTypeIconText}>👤</Text>
              </View>
              <Text style={styles.userTypeTitle}>I'm a Customer</Text>
              <Text style={styles.userTypeDescription}>
                Book professional barbers for on-demand services at your location
              </Text>
            </TouchableOpacity>

            {/* Barber Card */}
            <TouchableOpacity
              style={[
                styles.userTypeCard,
                userType === 'barber' && styles.userTypeCardSelected
              ]}
              onPress={() => setUserType('barber')}
            >
              <View style={styles.userTypeIcon}>
                <Text style={styles.userTypeIconText}>✂️</Text>
              </View>
              <Text style={styles.userTypeTitle}>I'm a Barber</Text>
              <Text style={styles.userTypeDescription}>
                Offer your professional services and grow your business with us
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        {userType && (
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {userType === 'customer' ? 'Find a Barber' : 'Join as Barber'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.signInSection}>
              <Text style={styles.signInPrompt}>
                {userType === 'customer' ? 'Already have an account?' : 'Already registered?'}
              </Text>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Why Choose GROOMOSPHERE?</Text>
          
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📍</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>On-Demand Service</Text>
              <Text style={styles.featureDescription}>
                Professional barbers come to your location at your convenience
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✅</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Verified Professionals</Text>
              <Text style={styles.featureDescription}>
                All our barbers are verified and highly rated by customers
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>💳</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Secure Payments</Text>
              <Text style={styles.featureDescription}>
                Safe and secure payment processing with multiple payment options
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroLogo: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  heroLogoText: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: COLORS.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  userTypeSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  userTypeGrid: {
    gap: 16,
  },
  userTypeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userTypeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#f0f8ff',
  },
  userTypeIcon: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.secondary,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userTypeIconText: {
    fontSize: 28,
  },
  userTypeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  userTypeDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  signInSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  signInPrompt: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: COLORS.accent,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
    paddingTop: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});
