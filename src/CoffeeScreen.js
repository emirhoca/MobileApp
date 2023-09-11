import React from 'react';
import { View, Image, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';

const Coffees = ({ navigation, route }) => {
  const coffeeData = [
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    {
      name: 'Iced Latte',
      url:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=440,400',
    },
    // Add more coffee data here as needed
  ];
  const handleCoffeePress = (item) => {
    // You can handle the click event here, for example, navigate to a details screen
    console.log(`Clicked on coffee: ${item.name}`);
    // For navigation, you can use the navigation prop or any navigation library you prefer
    // navigation.navigate('Details', { coffee: item });
  };
  const renderCoffeeItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCoffeePress(item)}>
      <View style={styles.coffeeItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.coffeeName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeData}
        renderItem={renderCoffeeItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
  },
  coffeeItem: {
    
      flexDirection: 'row',
      alignItems: 'center',
     
      marginBottom: 20,
    
  },
  imageContainer: {
    marginRight: 0,
    borderRadius: 50, // To make it a circle, set borderRadius to half of the width and height
    overflow: 'hidden', // To hide any content that goes beyond the circle
  },
  image: {
    width: 120,
    height: 120,
  },
  coffeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:20,
  },
});

export default Coffees;
