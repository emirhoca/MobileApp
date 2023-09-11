
import React from 'react';
import { View, Image, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import axios from 'axios';
export default function HomePageAfterLoginned({navigation,route})
{
    const loginToken = route.params?.token;
    const username = route.params?.username;
    const [isSignedOut,setSignOut]=React.useState(false)
    
    const handleLogout=()=>
    {
      console.log("In handle Logout token is:",loginToken)
      axios
      .post('http://10.0.2.2:3000/logout',
      {
        token:loginToken
      }
      ) // Replace with your server's logout endpoint URL
      .then((response) => {
        // Handle a successful logout response
        console.log("Logged out successfully");
        // Clear authentication state or perform any necessary cleanup
        // Redirect to the login screen if needed
        setSignOut(true);
      })
      .catch((error) => {
        // Handle errors if the logout request fails
        console.error("Logout failed:", error);
      });
  };
  React.useEffect(() => {
    if (isSignedOut) {
      navigation.replace("LoginScreen",
      {
        isLoggedIn:false
      });
    }
  }, [isSignedOut]); // UseEffect will trigger
   return(

    <View>
<Text>Welcome to home page {JSON.stringify(username)}</Text>
<TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      

    </View>
   )

}
const styles = StyleSheet.create({
loginButton: {
    backgroundColor: 'green', // Customize the button color
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 18,
    fontWeight: 'bold',
}})
