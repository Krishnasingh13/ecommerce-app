import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginUser} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(true);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = val => {
    dispatch(loginUser(val));
  };
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View className="h-full flex justify-center">
        <View className="px-7">
          <View className="mt-5">
            <Text className="text-2xl font-semibold text-black leading-6 ">
              Login
            </Text>
          </View>
          <View>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={values => handleSubmit(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <KeyboardAvoidingView behavior="padding">
                  <View>
                    <View className="mt-5">
                      <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                        <Icon name="email" color="#3a3a3a" />
                        <TextInput
                          className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1"
                          name="text"
                          placeholder="Email"
                          placeholderTextColor={'#3a3a3a'}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="default"
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-xs mt-1 ml-5">
                          {errors.email}
                        </Text>
                      )}
                    </View>
                    <View className="mt-5">
                      <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                        <MaterialCommunityIcons
                          name="lock-outline"
                          color="#3a3a3a"
                        />
                        <TextInput
                          className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1"
                          name="password"
                          placeholder="Password"
                          placeholderTextColor={'#3a3a3a'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          keyboardType="default"
                          secureTextEntry={secure}
                        />
                        {secure ? (
                          <Pressable
                            className=" p-3"
                            onPress={() => setSecure(!secure)}>
                            <Icon name="eye-with-line" color="#3a3a3a" />
                          </Pressable>
                        ) : (
                          <Pressable
                            className=" p-3"
                            onPress={() => setSecure(!secure)}>
                            <Icon name="eye" color="#3a3a3a" />
                          </Pressable>
                        )}
                      </View>
                      <Text className="text-sm text-right font-semibold text-blue-400 mt-1 mr-2">
                        Forgotten Password ?
                      </Text>
                      {touched.password && errors.password && (
                        <Text className="text-red-500 text-xs mt-1 ml-5">
                          {errors.password}
                        </Text>
                      )}
                    </View>
                    <Button
                      className="w-[100%] rounded-xl py-1 bg-blue-400 mt-8"
                      onPress={handleSubmit}>
                      <Text className="font-semibold text-center text-base text-white ">
                        Login
                      </Text>
                    </Button>
                  </View>
                </KeyboardAvoidingView>
              )}
            </Formik>
            <Text className="text-base font-semibold text-gray-600 text-center my-5">
              OR
            </Text>
            <View className=" flex flex-row items-center justify-center border-[1px] border-black py-3 rounded-xl">
              <Image source={require('../../assests/google_logo.png')} />
              <Text className="text-black text-sm ml-3">Login with Google</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
