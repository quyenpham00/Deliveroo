import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCatetories, setFeaturedCategories] = useState([]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: false,
    })
  }, [])

  //Tien Code
  useEffect(() => {
	sanityClient.fetch(
		`
			*[_type == 'featured] {
				...,
			restaurants[]->{
				...,
				dishes[]->
			}
			}
		`
	)
	.then((data) => {
		setFeaturedCategories(data);
	})
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      <View className='flex-row pb-3 items-center mx-4 space-x-2  '>
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDownIcon size={20} color='#00CCBB' />
          </Text>
        </View>

        <UserIcon size={35} color='#00CCBB' />
      </View>

      <View className='flex-row items-center space-x-2 pb-2 mx-4 '>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3 '>
          <MagnifyingGlassIcon color='gray' size={20} />
          <TextInput
            placeholder='Restaurants and cuisines'
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon color='#00CCBB' />
      </View>

      <ScrollView
        className='bg-gray-100'
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Categories />

		{/* Featured */}
		{featuredCatetories?.map((category) => {
			<FeaturedRow
				key={category._id}
				id={category._id}
				title={category.name}
				description={category.short_description}
			/>
		})}
        
        {/* <FeaturedRow
          id='123'
          title='Tasty Discounts'
          description="Everyone's been enjoying these juicy discounts!"
        />
        <FeaturedRow
          id='123'
          title='Offers near you!'
          description='Why not support your local restaurant tonight!'
        /> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
