import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native'; 
import { Text } from 'react-native-svg';


export default function Qr({route,navigation,isLoggedIn}){
    //const email=route.params;
    
    const url="https://www.youtube.com/"
   console.log(isLoggedIn)
   
return(

<View>

<QRCode
  value={url}
  size={200}
  color="black"
  backgroundColor="white"
/>

</View>
)

}
