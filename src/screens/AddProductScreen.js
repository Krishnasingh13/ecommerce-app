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
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import Snackbar from 'react-native-snackbar';

const AddProductScreen = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleImagePicker = async () => {
    const res = await ImagePicker.launchImageLibrary({includeBase64: true});
    setProductImage(res.assets[0].base64);
  };

  const handleAddProduct = async () => {
    const product = {
      productId: uuidv4(),
      productName,
      productPrice,
      productImage,
    };
    try {
      if (!productName || !productPrice || !productImage) {
        Snackbar.show({
          text: 'Name, Price and Image are required',
          duration: Snackbar.LENGTH_LONG,
        });
        return;
      }
      const productsJson = await AsyncStorage.getItem('products');
      if (productsJson) {
        const products = JSON.parse(productsJson);
        if (
          products.some(
            product =>
              product.productName.toLowerCase() === productName.toLowerCase(),
          )
        ) {
          Snackbar.show({
            text: 'Product already exists',
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else {
          products.push(product);
          await AsyncStorage.setItem('products', JSON.stringify(products));
        }
      } else {
        await AsyncStorage.setItem('products', JSON.stringify([product]));
      }
      navigation.goBack();
    } catch (error) {
      console.log('Error adding product to local storage:', error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white px-4 py-6">
      <View className="flex items-center justify-between flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className=" bg-[#e1e1e1] p-2 rounded-xl">
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="px-2 mt-10">
        <View className="mt-5">
          <Text className="text-2xl font-semibold text-black leading-6 ">
            Add Product
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <View>
            <View className="mt-5">
              <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                <TextInput
                  className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1"
                  placeholderTextColor={'#3a3a3a'}
                  value={productName}
                  placeholder={'Product Name'}
                  onChangeText={text => setProductName(text)}
                  keyboardType="default"
                />
              </View>
            </View>
            <View className="mt-5">
              <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                <TextInput
                  className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1"
                  placeholderTextColor={'#3a3a3a'}
                  value={productPrice}
                  placeholder={'Product Price'}
                  onChangeText={text => setProductPrice(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {productImage ? (
              <View>
                <View className="mt-5">
                  <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                    <TouchableOpacity
                      onPress={() => handleImagePicker()}
                      className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1">
                      <Text className="text-sm  text-[#3a3a3a]">
                        Selected Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="mt-2 ml-2 rounded">
                  <Image
                    style={{width: 90, height: 90}}
                    source={{uri: `data:image/png;base64,${productImage}`}}
                    className="rounded"
                  />
                </View>
              </View>
            ) : (
              <View className="mt-5">
                <View className="w-full bg-[#f7f8f8] flex items-center justify-between flex-row rounded-xl px-3">
                  <TouchableOpacity
                    onPress={() => handleImagePicker()}
                    className=" py-2 px-3 text-sm  text-[#3a3a3a] flex-1">
                    <Text className="text-sm  text-[#3a3a3a]">
                      Select Image
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <Button
              className="w-full rounded-xl py-1 bg-blue-400 mt-5"
              onPress={handleAddProduct}>
              <Text className="font-semibold text-center text-base text-white ">
                Add Product
              </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddProductScreen;
