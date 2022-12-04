import { StatusBar } from 'expo-status-bar';
import react,{useEffect,useState,useRef } from 'react';
import Cart from './add-to-cart';
import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity, Alert ,AsyncStorage} from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

export default function Login({navigation}) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const fusername = useRef('');
  const fpassword = useRef('');
  const femail = useRef('');
  const fphone = useRef('');
  const [elementVisible, setElementVisible] = useState(false);
  const [user,setUser]=useState([]);
  const [log,setLog]=useState([false]);

  useEffect(() => {
    axios.get("http://localhost:3002/users").then((res) => {
      setUser(res.data);
    });}, []);

    
  const save=()=>{  
    if (username===''||email===''||password===''||phone===''){
      Swal.fire('Oops!',`Please fill all the fields`,'info');
      return;}
  else{
    Swal.fire('Hey!',`Welcome ${username} to BachatBazaar`,'success');
    navigation.navigate('main',{name:username});
    axios.post("http://localhost:3002/users",{
            username:username,
            password:password,
            emailID:email, 
            phoneNo:phone
            }).then((response) => {
              //location.reload();
                const adduser = {username:username,password:password,emailID:email,phoneNo:phone};
            setUser([...user,adduser]);
            });
            setLog(true);
            //localStorage.setItem('keepLoggedIn',JSON.stringify(true));
           //localStorage.setItem('username',JSON.stringify( user[i].username));
           
            fusername.current.value = '';
            fpassword.current.value = '';
            femail.current.value = '';
            fphone.current.value = '';
            setUsername('');
            setEmail('');
            setPassword('');
            setPhone('');
          }
        }

        const login=()=>{
    if(user){
          if (username===''||password===''){
            Swal.fire('Oops!',`Please fill all the fields`,'info');
            return;}
        else{
          for(var i=0;i<user.length;i++){
          if(user[i].username==username && user[i].password==password  ){
            Swal.fire('Hey!',`Welcome back ${username} to BachatBazaar`,'success');
            console.log("Logged In");
            navigation.navigate('main',{name:user[i].username});
            setLog(true);
           //localStorage.setItem('keepLoggedIn',true);
           //localStorage.setItem('username',user[i].username);
          }}
          if(!log){
              Swal.fire('Oops!',`Invalid Credentials`,'error');
          }
          setLog(false);
            
        }}
        fusername.current.value = '';
        fpassword.current.value = '';
                  setUsername('');
                  setPassword('');
                }


        const clean=()=>{
          (username=='')?{}:fusername.current.value = '';
          (password=='')?{}:fpassword.current.value = '';
          setUsername('');
          setPassword('');
          setElementVisible(false);
        }

        const clean1=()=>{
          (username=='')?{}:fusername.current.value = '';
          (password=='')?{}:fpassword.current.value = '';
          (email=='')?{}:femail.current.value = '';
          (phone=='')?{}:fphone.current.value = '';
          setUsername('');
          setEmail('');
          setPassword('');
          setPhone('');
          setElementVisible(true);

        } 

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', backgroundColor: '#1E90FF', marginBottom: 10}}>
                <View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-home" size={25} color="white" />
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
					<TouchableOpacity onPress={()=>{navigation.navigate('main') }}>
						<Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Bachat Bazaar</Text>
                        </TouchableOpacity>
						
					</View>
                    <View style={[styles.centerElement, {width: 50, height: 50, marginLeft:1000}]}>
						<TouchableOpacity onPress={()=>{navigation.navigate('login') }}>
						<Ionicons name="ios-person" size={25} color="white" />
                        </TouchableOpacity>
                        
					</View>
                    <View style={[styles.centerElement, {width: 50, height: 50}]}>
					<TouchableOpacity onPress={()=>{if(!this.props.route.params){Swal.fire('Oops!',`Log in to access your cart`,'info');
					 navigation.navigate('login')}
					else{navigation.navigate('cart',{name:this.props.route.params});}}}>
						<Ionicons name="ios-cart" size={25} color="white" />
                        </TouchableOpacity>
					</View>
				</View>
        <View>
      <Image style={styles.image} source={{uri:'https://tse1.mm.bing.net/th?id=OIP.CpCfv-HW0dewCr8qxwYHiwAAAA&pid=Api&P=0'}} /></View>
      <View style={{ flexDirection: 'row' }}>
<View style={styles.button_1}>
   <TouchableOpacity style={styles.loginBtn} onPress= {() => clean()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
   </View>
   <View style={styles.button_1}>
   <TouchableOpacity style={styles.loginBtn1} onPress= {() => clean1()}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
   </View>
      <StatusBar style="auto"/>
      <View style={styles.inputView}>
        <TextInput
          ref={fusername}
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        /></View>
 
      <View style={styles.inputView}>
        <TextInput
          ref={fpassword}
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /></View>

      {elementVisible?(
<View>
     <View style={styles.inputView}>
        <TextInput
          ref={femail}
          style={styles.TextInput2}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /></View>

<View style={styles.inputView}>
        <TextInput
          ref={fphone}
          style={styles.TextInput2}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={(phone) => setPhone(phone)}
        /></View>

<View style={styles.button_1}>
   <TouchableOpacity style={styles.loginBtn2} onPress= {()=>save()}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
   </View>
   </View>):(

<View style={styles.button_1}>
   <TouchableOpacity style={styles.loginBtn2} onPress= {()=>login()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
   </View>)}
    
      </View>
  );}


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
 
  image: {
    marginBottom: 150,
    width:200,
  },
 
  inputView: {
    backgroundColor: "#1E90FF",
    borderRadius: 30,
    width: "20%",
    height: 45,
    marginBottom: 20,
    marginLeft:500,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  TextInput2: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "25%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft:500,
    backgroundColor: "#1E90FF",
    textweight: "bold",
  },
  loginBtn1: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft:100,
    backgroundColor: "#1E90FF",
    textweight: "bold",
  },
  loginBtn2: {
    width: "20%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft:500,
    backgroundColor: "#1E90FF",
    textweight: "bold",
  },
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
