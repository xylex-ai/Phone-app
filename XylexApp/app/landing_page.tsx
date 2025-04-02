import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";
import { supabase } from './lib/supabase';
import { registerForPushNotificationsAsync } from './RegisterForPushNotifications';


const XylexLogo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217 35" preserveAspectRatio="xMidYMid meet">
  <g transform="translate(0,35) scale(0.1,-0.1)" fill="#FFFFFF" stroke="none">
    <path d="M0 175 l0 -175 1085 0 1085 0 0 175 0 175 -1085 0 -1085 0 0 -175z
    m108 80 c48 -74 49 -85 8 -160 -30 -52 -42 -65 -61 -65 -33 0 -32 8 9 77 l35
    58 -35 63 c-19 35 -32 68 -28 73 12 20 40 2 72 -46z m227 45 c3 -5 -9 -37 -27
    -70 l-33 -60 33 -62 c18 -35 32 -67 32 -71 0 -5 -12 -7 -26 -5 -21 2 -34 17
    -63 70 l-36 67 29 53 c45 82 73 107 91 78z m164 -53 c38 -65 34 -66 83 16 21
    36 31 44 47 40 12 -3 21 -10 21 -15 0 -16 -144 -250 -157 -255 -7 -3 -20 -3
    -28 1 -13 5 -11 13 12 54 l27 48 -46 80 c-25 43 -44 83 -41 87 3 5 15 7 26 5
    15 -2 34 -23 56 -61z m269 -50 l3 -107 52 0 c69 0 84 -10 60 -39 -17 -21 -24
    -22 -91 -16 l-72 8 0 127 c0 69 3 130 7 134 4 4 14 5 23 4 12 -3 16 -23 18
    -111z m408 102 c15 -25 -24 -41 -98 -43 l-73 -1 -3 -32 -3 -33 70 0 c52 0 71
    -4 71 -13 0 -26 -25 -37 -82 -37 -58 0 -58 0 -58 -30 l0 -30 90 0 c50 0 90 -4
    90 -8 0 -5 -6 -16 -13 -25 -10 -15 -27 -17 -112 -15 l-100 3 -3 124 c-1 69 0
    131 2 138 7 17 211 19 222 2z m167 -61 l39 -67 -37 -66 c-37 -67 -53 -82 -80
    -71 -12 4 -8 18 22 73 l36 68 -36 60 c-37 64 -38 78 -4 73 15 -2 34 -25 60
    -70z m227 66 c0 -3 -16 -35 -36 -70 l-36 -64 37 -65 c30 -54 34 -66 21 -71
    -28 -11 -43 3 -81 70 -36 65 -36 65 -19 98 42 81 64 108 89 108 14 0 25 -3 25
    -6z m369 -127 c47 -83 70 -132 64 -138 -20 -20 -45 6 -99 102 -31 54 -58 99
    -59 99 -2 0 -29 -45 -61 -100 -31 -55 -60 -102 -64 -105 -10 -6 -40 5 -40 15
    0 6 56 105 124 218 18 29 32 42 44 40 10 -2 48 -56 91 -131z m189 -9 c-3 -125
    -4 -133 -23 -133 -19 0 -20 8 -23 116 -2 97 0 120 13 133 32 31 36 17 33 -116z
    m-483 -114 c0 -10 -8 -20 -18 -22 -22 -4 -35 27 -16 39 20 12 34 5 34 -17z"/>
  </g>
</svg>
`;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use Expo Router's navigation

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      const token = await registerForPushNotificationsAsync();
      console.log("Expo Push Token (post-login):", token);

      const { data: { user } } = await supabase.auth.getUser();
      console.log(user); // Should NOT be null
      if (user && token) {
        await supabase
          .from('users')
          .update({ push_token: token })
          .eq('user_id', user.id)
          .select();
      }

      // Navigate to HomePage on successful login
      router.push('/Screens/HomePage');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <SvgXml xml={XylexLogo} width={200} height={50} />
      </View>
      <Text style={styles.title}>Login to Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={[styles.button, { opacity: 1 }]}
        onPress={() => signInWithEmail()}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,

  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#1e1e1e",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8F33E6",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
