import * as react from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export default class Main extends react.Component {

	constructor(props){
		super(props);
		this.state = {
			productsIsLoading: false,
			cartIsLoading:false,
			isLogged:false,
			cart:[],
			userList:[],
			userCart:[],
			userRecord:[],
			cartItems:[],
			products: [
				/* Sample data from walmart 
				{itemId: "501436323", name: "Power Wheels Dune Racer Extreme", thumbnailImage: "https://i5.walmartimages.com/asr/a3922e8e-2128-4603-ba8c-b58d1333253b_1.44d66337098c1db8fed9abe2ff4b57ce.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", color: "Red", qty: 1, salePrice: "105", checked: 1},
				{itemId: "35031861", name: "Better Homes & Gardens Leighton Twin Over Twin Wood Bunk Bed, Multiple Finishes", thumbnailImage: "https://i5.walmartimages.com/asr/4aedb609-4b61-4593-ad8a-cdc8c88696b1_1.3f505ce3d55db4745cf4c51d559994dc.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Green", salePrice: "199", checked: 0},
				{itemId: "801099131", name: "LEGO Star Wars 2019 Advent Calendar 75245 Holiday Building Kit", thumbnailImage: "https://i5.walmartimages.com/asr/9a8ea1ab-311d-455c-bda8-ce15692a8185_3.208d48e0260f80891d32b351cb116a4b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Blue", salePrice: "27.99", checked: 1},
				{itemId: "42608079", name: "Little Tikes Cape Cottage Playhouse, Tan", thumbnailImage: "https://i5.walmartimages.com/asr/2654cd64-1471-44af-8b0c-1debaf598cb3_1.c30c481d1ac8fdd6aa041c0690d7214c.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", color: "Purple", qty: 1, salePrice: "129.99", checked: 0},
				{itemId: "247714372", name: "HP 14\" Laptop, Intel Core i3-1005G1, 4GB SDRAM, 128GB SSD, Pale Gold, 14-DQ1038wm", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Black", salePrice: "269", checked: 1}*/
			],
			id:0,
			user: "",
		}
	}

    componentDidMount() {
		//this.setState({user:localStorage.getItem('username')});
		//this.setState({isLogged:this.state.user===""?false:true});
        axios.get(`http://localhost:3002/products`).then(res => {
			this.setState({products: res.data});})
			axios.get(`http://localhost:3002/users`).then((res) => {
				this.setState({userList: res.data}, () => {console.log(this.state.userList);});
				console.log(this.props.route.params);
				if(this.props.route.params){
				const user = this.props.route.params?this.props.route.params.name:this.state.user;
				console.log(user);
				for(var i=0;i<this.state.userList.length;i++){
					if(this.state.userList[i].username===user){
						this.setState({id:this.state.userList[i].id}, () => {
							console.log(this.state.id);
						  }); 
					}
					}
					if(this.state.id!=0){
						axios.get(`http://localhost:3002/users/cart/${this.state.id}`).then((res) => {
						this.setState({userRecord: res.data}, () => {
							console.log(this.state.userRecord);
						  });});
						  axios.get(`http://localhost:3002/carts/${this.state.id}`).then((res) => {
							this.setState({cartItems: res.data}, () => {
								console.log(this.state.cartItems);
							  });});
						axios.get(`http://localhost:3002/carts`).then((res) => {
							this.setState({cart: res.data}, () => {
								this.setState({cartIsLoading:true});
							  });
				})}
			}
		})
			
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.route.params&&this.state.user !== this.props.route.params.name){
			
			this.setState({user: this.props.route.params.name});
			axios.get(`http://localhost:3002/users`).then((res) => {
				this.setState({userList: res.data}, () => {console.log(this.state.userList);});
				console.log(this.props.route.params);
				if(this.props.route.params){
				const user = this.props.route.params.name;
				console.log(user);
				for(var i=0;i<this.state.userList.length;i++){
					if(this.state.userList[i].username===user){
						this.setState({id:this.state.userList[i].id}, () => {
							console.log(this.state.id);
						  }); 
					}
					}
					if(this.state.id!=0){
						axios.get(`http://localhost:3002/users/cart/${this.state.id}`).then((res) => {
						this.setState({userRecord: res.data}, () => {
							console.log(this.state.userRecord);
						  });});
						  axios.get(`http://localhost:3002/carts/${this.state.id}`).then((res) => {
							this.setState({cartItems: res.data}, () => {
								console.log(this.state.cartItems);
							  });});
						axios.get(`http://localhost:3002/carts`).then((res) => {
							this.setState({cart: res.data}, () => {
								this.setState({cartIsLoading:true});
							  });
				})}
			}})}
	}

	selectHandler = (index, value) => {
		const newItems = [...this.state.products]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		this.setState({ products: newItems }); // set new state
	}

	addtoCart(item){
		let count=false;
		if(this.state.cartIsLoading){
			console.log(item.id);
		console.log(this.state.cartItems);
		for(var i=0;i<this.state.cartItems.length;i++){
			if(this.state.cartItems[i]['ProductId']===item.id){
				Swal.fire('Check Cart!',`Already in Cart`,'info');
                count=true;
			}}

			if(!count){
		axios.post("http://localhost:3002/carts",{
            productQuantity:1,
            checked:0,
			ProductId:item.id,
			UserId:this.state.id,
			productPrice:item.productPrice
            }).then((response) => {
              //location.reload();
                const addcart = {productQuantity:1, checked:0, ProductId:item.id, UserId:this.state.id, productPrice:item.productPrice};
					console.log(this.state.id);
            this.setState({cart:[...this.state.cart,addcart]});
			this.setState({cartItems:[...this.state.cartItems,addcart]});
            });
		}}
	}
	
	
	render() {
        
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
            add: {
                width: "10%",
                borderRadius: 25,
                height: 40,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#1E90FF",
                textweight: "bold",
                color:"#1E90FF"
              },
            text: {
                 textAlign:"center",
                 paddingTop:"10px",
                 color: 'white'
            }
		});
		
		const { products, productsIsLoading, cartIsLoading, cart, userList, userRecord, id} = this.state;
		const { navigation } = this.props;

		return (
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
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
				
				{productsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						<View>

<Image source={{uri:"https://i.pinimg.com/originals/c4/fb/29/c4fb29857a4783c5db976ec83be9b32d.jpg"}} style={{ width:1340, height:580}}></Image>
</View>

						{products && products.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 200}}>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.productImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.productName}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Variation: ' + item.color : ''}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Description: ' + item.productDescription : ''}</Text>
                                        <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>{item.productPrice} Rs</Text>
                                        <View>
                                    <TouchableOpacity style={styles.add} onPress={() => {if(!this.props.route.params){navigation.navigate('login'); Swal.fire('Oops!',`Please login to add to cart`,'info');} else{this.addtoCart(item)}}}>
                                    <Text style={styles.text}>Add to Cart</Text>
									</TouchableOpacity>
                                    </View>
									</View>								
									
								</View>
							</View>
						))}
					</ScrollView>
				)}
				
				{!productsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						<View style={{flexDirection: 'row'}}>		
						</View>
					</View>
				}
			</View>
		);
	}
}

