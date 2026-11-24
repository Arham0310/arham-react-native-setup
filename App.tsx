import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  rightText,
  onRightPress,
}) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A4A8B0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {rightText ? (
          <TouchableOpacity onPress={onRightPress} style={styles.inputRight}>
            <Text style={styles.eyeText}>{rightText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function SocialButton({ title, symbol, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.socialButton} onPress={onPress}>
      <Text style={styles.socialSymbol}>{symbol}</Text>
      <Text style={styles.socialButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [screen, setScreen] = useState('signup');
  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  function handleRegister() {
    const cleanName = fullName.trim();
    const cleanEmail = signUpEmail.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !signUpPassword || !dob.trim() || !phone.trim()) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    const alreadyExists = users.some(user => user.email === cleanEmail);
    if (alreadyExists) {
      Alert.alert('Account already exists', 'An account with this email is already registered.');
      return;
    }

    const newUser = {
      fullName: cleanName,
      email: cleanEmail,
      password: signUpPassword,
      dateOfBirth: dob.trim(),
      phone: phone.trim(),
    };

    setUsers(previousUsers => [...previousUsers, newUser]);
    setLoginEmail(cleanEmail);
    setLoginPassword('');
    Alert.alert('Registration successful', 'Your account has been created. Please log in.');
    setScreen('login');
  }

  function handleLogin() {
    const enteredEmail = loginEmail.trim().toLowerCase();
    const matchedUser = users.find(
      user => user.email === enteredEmail && user.password === loginPassword
    );

    if (matchedUser) {
      Alert.alert('Success', 'User login successfully');
    } else {
      Alert.alert('Login failed', 'User not found');
    }
  }

  function showForgotPasswordMessage() {
    Alert.alert('Forgot Password?', 'Password reset is not part of this assignment.');
  }

  function showSocialMessage(provider) {
    Alert.alert(provider, `${provider} sign-in is a visual demo only.`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {screen === 'signup' ? (
            <View style={styles.screen}>
              <View style={styles.topRow}>
                <TouchableOpacity
                  onPress={() => setScreen('login')}
                  style={styles.backButton}
                  accessibilityRole="button"
                  accessibilityLabel="Go to login"
                >
                  <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.headingBlock}>
                <Text style={styles.heading}>Sign up</Text>
                <Text style={styles.subtitle}>Create an account to continue</Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  value={signUpEmail}
                  onChangeText={setSignUpEmail}
                  keyboardType="email-address"
                />
                <InputField
                  label="Birth of Date"
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  onChangeText={setDob}
                />
                <InputField
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <InputField
                  label="Set Password"
                  placeholder="Enter your password"
                  value={signUpPassword}
                  onChangeText={setSignUpPassword}
                  secureTextEntry={!showSignUpPassword}
                  rightText={showSignUpPassword ? 'Hide' : 'Show'}
                  onRightPress={() => setShowSignUpPassword(value => !value)}
                />

                <PrimaryButton title="Register" onPress={handleRegister} />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => setScreen('login')}>
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.screen}>
              <View style={styles.logoRow}>
                <View style={styles.logoMark}>
                  <Text style={styles.logoCheck}>✓</Text>
                </View>
                <Text style={styles.logoText}>Logoipsum</Text>
              </View>

              <View style={styles.headingBlockLogin}>
                <Text style={styles.headingLogin}>Sign in to your</Text>
                <Text style={styles.headingLogin}>Account</Text>
                <Text style={styles.subtitleLogin}>Enter your email and password to log in</Text>
              </View>

              <View style={styles.form}>
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                />
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  secureTextEntry={!showLoginPassword}
                  rightText={showLoginPassword ? 'Hide' : 'Show'}
                  onRightPress={() => setShowLoginPassword(value => !value)}
                />

                <TouchableOpacity style={styles.forgotButton} onPress={showForgotPasswordMessage}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <PrimaryButton title="Log in" onPress={handleLogin} />

                <View style={styles.orRow}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>Or</Text>
                  <View style={styles.orLine} />
                </View>

                <SocialButton
                  symbol="G"
                  title="Continue with Google"
                  onPress={() => showSocialMessage('Google')}
                />
                <SocialButton
                  symbol="f"
                  title="Continue with Facebook"
                  onPress={() => showSocialMessage('Facebook')}
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => setScreen('signup')}>
                  <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 28,
  },
  topRow: {
    height: 42,
    justifyContent: 'center',
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 31,
    color: '#20242B',
    lineHeight: 34,
  },
  headingBlock: {
    marginTop: 22,
    marginBottom: 27,
  },
  heading: {
    fontSize: 29,
    fontWeight: '700',
    color: '#171A21',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#8C929C',
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 17,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#343943',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: '#E9EBEF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
  },
  input: {
    flex: 1,
    minHeight: 47,
    fontSize: 14,
    color: '#222630',
    paddingVertical: 9,
  },
  inputRight: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  eyeText: {
    color: '#7D8797',
    fontSize: 12,
  },
  primaryButton: {
    height: 49,
    backgroundColor: '#2865E8',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    elevation: 2,
    shadowColor: '#2865E8',
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 27,
  },
  footerText: {
    fontSize: 12,
    color: '#7F858F',
  },
  linkText: {
    fontSize: 12,
    color: '#2865E8',
    fontWeight: '600',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 44,
  },
  logoMark: {
    width: 23,
    height: 23,
    borderRadius: 7,
    backgroundColor: '#2865E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  logoCheck: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  logoText: {
    color: '#252A34',
    fontWeight: '700',
    fontSize: 13,
  },
  headingBlockLogin: {
    marginBottom: 28,
  },
  headingLogin: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '700',
    color: '#171A21',
  },
  subtitleLogin: {
    fontSize: 13,
    color: '#8C929C',
    marginTop: 11,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -3,
    marginBottom: 15,
    paddingVertical: 5,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
    marginBottom: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8EAF0',
  },
  orText: {
    color: '#969BA4',
    fontSize: 12,
    paddingHorizontal: 13,
  },
  socialButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E9EBEF',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  socialSymbol: {
    position: 'absolute',
    left: 19,
    color: '#2865E8',
    fontSize: 17,
    fontWeight: '700',
  },
  socialButtonText: {
    color: '#303641',
    fontSize: 13,
    fontWeight: '500',
  },
});
