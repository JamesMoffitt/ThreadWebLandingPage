import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { contactAPI } from './lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [nameFieldError, setNameFieldError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);
  const [messageFieldError, setMessageFieldError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleButtonPress = async () => {
    if (!formVisible) {
      setFormVisible(true);
    } else {
      setNameFieldError(false);
      setEmailFieldError(false);
      setMessageFieldError(false);
      // Check that fields are filled
      let formError = false;
      if (formData.name === '' || formData.name === null ) {
        formError = true;
        setNameFieldError(true);
      }
      if (formData.email === '' || formData.email === null ) {
        formError = true;
        setEmailFieldError(true);
      }
      if (formData.message === '' || formData.message === null ) {
        formError = true;
        setMessageFieldError(true);
      }
      if (formError) {
        return;
      }

      // Submit to Supabase
      const result = await contactAPI.submitForm(formData);
      
      if (result.success) {
        setFormSubmit(true);
        
        // Wait 1 second, then clear form and hide it
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setFormVisible(false);
          setFormSubmit(false);
        }, 1000);
      }
    }
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
        {formVisible && !formSubmit && (
          <View style={styles.formContainer}>
            <TextInput
              style={nameFieldError ? styles.textInputError : styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor="#666"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={emailFieldError ? styles.textInputError : styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={messageFieldError ? styles.textInputError : styles.textInput}
              placeholder="Enter your message"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
          </View>
        )}
        
        {/* Success message - visible when formSubmit is true */}
        {formSubmit && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Message sent</Text>            
            <Ionicons name="checkmark-circle" size={24} color="#10B981" style={styles.successIcon} />
          </View>
        )}
        
        {/* Spacing */}
        <View style={styles.spacing} />
        
        {/* Blue button */}
        {!formSubmit && (
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>
              {formVisible ? 'Send to the team' : 'I want to know more'}
            </Text>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
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
    width: '100%',
    maxWidth: 800,
  },
  textInputError: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF0000',
    width: '100%',
    maxWidth: 800,
  },
  successContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    marginLeft: 12,
  },
  successText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

