import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/actions/auth';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsJson = await AsyncStorage.getItem('products');
        if (productsJson) {
          const products = JSON.parse(productsJson);
          setProducts(products);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error getting products from local storage:', error);
      }
    };
    getProducts();
  }, [products]);

  const deleteProduct = async productId => {
    try {
      const productsJson = await AsyncStorage.getItem('products');
      if (productsJson) {
        const products = JSON.parse(productsJson);
        const updatedProducts = products.filter(
          product => product.productId !== productId.productId,
        );
        await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.log('Error deleting product from local storage:', error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white px-4 py-6">
      <View className="flex items-center justify-end flex-row">
        <TouchableOpacity onPress={() => dispatch(logoutUser())}>
          <View className=" bg-gray-200 p-3 rounded-lg">
            <AntDesign name="logout" size={15} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View className=" mt-3 w-full h-full pb-10">
        <View>
          <Text className="text-2xl font-semibold text-black">
            HI-FI Shop & Services
          </Text>
          <Text className="text-sm font-medium text-[#b9b6b6] mt-1">
            This shop offers both products & services
          </Text>
        </View>
        <Text className="text-base font-semibold text-black mt-4">
          Products
        </Text>
        <ScrollView className="w-full h-full">
          <View className="w-full h-full flex items-center justify-between flex-wrap flex-row">
            {loading ? (
              <View className="flex items-center justify-center w-full mt-10">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : products?.length == 0 ? (
              <Text className="text-base font-semibold text-black text-center mt-10 mx-auto">
                No Product Found
              </Text>
            ) : (
              products?.map((e, i) => (
                <View
                  key={e.productId}
                  className="mb-5 border-[1px] border-black rounded-xl pb-5 overflow-hidden w-[48%]">
                  <View className="w-40 h-40 bg-gray-300 rounded-t-xl relative">
                    <TouchableOpacity
                      onPress={() => deleteProduct(e)}
                      className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full">
                      <MaterialCommunityIcons
                        name="delete-outline"
                        color="#e35151"
                        size={15}
                      />
                    </TouchableOpacity>
                    <Image
                      source={{uri: `data:image/png;base64,${e.productImage}`}}
                      // source={require('../../assests/login_img.png')}
                      className="object-cover w-full h-full rounded-[10px] z-0"
                    />
                  </View>
                  <View className="mt-2 ml-2">
                    <Text className="text-sm font-semibold text-black">
                      {e.productName}
                    </Text>
                    <Text className="text-sm font-semibold text-black">
                      $ {e.productPrice}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <Pressable
          onPress={() => navigation.navigate('AddProduct')}
          className="p-2.5 rounded-full absolute right-5 bottom-16 bg-blue-300">
          <Ionicons name="add" color="#fff" size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
