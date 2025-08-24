import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [formVisible, setFormVisible] = useState(false);

  const handleButtonPress = () => {
    setFormVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Main content container */}
      <View style={styles.contentContainer}>
        {/* Emblem image */}
        <Image 
          source={require('./assets/Emblem w Text- ThreadWeb.png')}
          style={styles.emblemImage}
          resizeMode="contain"
        />
        
        {/* Form fields - only visible when formVisible is true */}
        {formVisible && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your message"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
            />
          </View>
        )}
        
        {/* Spacing */}
        <View style={styles.spacing} />
        
        {/* Blue button */}
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>I want to know more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  emblemImage: {
    width: 200,
    height: 200,
    marginBottom: 60,
  },
  spacing: {
    height: 80,
  },
  button: {
    backgroundColor: '#3B82F6', // blue-500
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    maxWidth: 800,
  },
});
