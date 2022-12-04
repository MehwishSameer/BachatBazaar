import { StatusBar } from 'expo-status-bar';
import * as react from 'react';
import {useEffect,useState,useRef}  from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

export default class Cart extends react.Component {

	constructor(props){
		axios.get(`http://localhost:3002/products`).then((res) => {
			this.setState({products: res.data});});
		super(props);
		this.state = {
			selectAll: false,
			selectProductsIsLoading: false,
			userListIsLoading: false,
			selectAllIsLoading: false,
			ButtonStateHolder : false,
			ButtonStateHolder1 : false,
			user:'',
			id:0,
			count:0,
			cartItems: [
				/* Sample data from walmart 
				{itemId: "501436323", name: "Power Wheels Dune Racer Extreme", thumbnailImage: "https://i5.walmartimages.com/asr/a3922e8e-2128-4603-ba8c-b58d1333253b_1.44d66337098c1db8fed9abe2ff4b57ce.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", color: "Red", qty: 1, salePrice: "105", checked: 1},
				{itemId: "35031861", name: "Better Homes & Gardens Leighton Twin Over Twin Wood Bunk Bed, Multiple Finishes", thumbnailImage: "https://i5.walmartimages.com/asr/4aedb609-4b61-4593-ad8a-cdc8c88696b1_1.3f505ce3d55db4745cf4c51d559994dc.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Green", salePrice: "199", checked: 0},
				{itemId: "801099131", name: "LEGO Star Wars 2019 Advent Calendar 75245 Holiday Building Kit", thumbnailImage: "https://i5.walmartimages.com/asr/9a8ea1ab-311d-455c-bda8-ce15692a8185_3.208d48e0260f80891d32b351cb116a4b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Blue", salePrice: "27.99", checked: 1},
				{itemId: "42608079", name: "Little Tikes Cape Cottage Playhouse, Tan", thumbnailImage: "https://i5.walmartimages.com/asr/2654cd64-1471-44af-8b0c-1debaf598cb3_1.c30c481d1ac8fdd6aa041c0690d7214c.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", color: "Purple", qty: 1, salePrice: "129.99", checked: 0},
				{itemId: "247714372", name: "HP 14\" Laptop, Intel Core i3-1005G1, 4GB SDRAM, 128GB SSD, Pale Gold, 14-DQ1038wm", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, color: "Black", salePrice: "269", checked: 1}*/
			],
			userList:[],
			userRecord:[],
			products:[],
			selectProducts:[]
		}
	}

	componentDidMount(){

		axios.get(`http://localhost:3002/users`).then((res) => {
		    const user = this.props.route.params.name.name;
			this.setState({userList: res.data});
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
						  });
						  for(var i=0;i<this.state.cartItems.length;i++){
								if( this.state.cartItems[i].checked == 1 )
								this.state.count++;
							for(var j=0;j<this.state.products.length;j++){
							if(this.state.cartItems[i].ProductId==this.state.products[j].id){
								this.setState({selectProducts:[...this.state.selectProducts,this.state.products[j]]});
							}
							}
							}
							
							if(this.state.count==this.state.cartItems.length)
							this.setState({selectAll:true});
							console.log(this.state.count);
							this.setState({selectAllIsLoading:true})});
				}

			});

			
	};

	
	selectHandler = (index, value) => {
		const newItems = [...this.state.cartItems]; // clone the array
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		axios.patch(`http://localhost:3002/carts/${this.state.id}/${newItems[index]['cartID']}`,{
          checked: newItems[index]['checked']})
		this.setState({ cartItems: newItems }); // set new state
	}
	
	selectHandlerAll = (value) => {
		this.setState({count:0});
		const newItems = [...this.state.cartItems]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
			if( this.state.cartItems[index]['checked'] == 1 )
			this.state.count++;
			axios.patch(`http://localhost:3002/carts/${this.state.id}/${newItems[index]['cartID']}`,{
          checked: newItems[index]['checked']})
		});
		this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
		if(this.state.count==this.state.cartItems.length)
							this.state.selectAll=true;
	}
	
	deleteHandler = (index) => {
		const newItems = [];
		Swal.fire({
			title: "Are you sure?",
			text: "Are you sure you want to delete this item from cart!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				new Swal({title:"Your item has been deleted!",
				icon: "success",
			  });
				this.setState({selectProducts:[]});
				axios.delete(`http://localhost:3002/carts/${this.state.cartItems[index]['cartID']}`,{}).then(() => {
				this.setState({ cartItems: [this.state.cartItems.filter((val) => {return val.cartID != this.state.cartItems[index]['cartID'];})]})
				for(var i=0;i<this.state.cartItems.length;i++){
					for(var j=0;j<this.state.products.length;j++){
					if(this.state.cartItems[i].ProductId==this.state.products[j].id){
						this.setState({selectProducts:[...this.state.selectProducts,this.state.products[j]]});
					}
					}
					}});
					navigation.navigate('main',{name:this.props.route.params.name});
			} else {
			  new Swal("Your item is safe!");
			}
		  });
	}
	
	quantityHandler = (action, index) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		
		let currentQty = newItems[index]['productQuantity'];
		let Qty = 0;
		
		if(action == 'more'){
			if(currentQty<this.state.selectProducts[index]['stock']){
			this.setState({ButtonStateHolder1: false});
			newItems[index]['productQuantity'] = currentQty + 1;
		Qty=currentQty+1;
		}
		else{
			this.setState({ButtonStateHolder: true});
		}
		} 
		
		else if(action == 'less'){
			if(currentQty>1)
			{newItems[index]['productQuantity'] = currentQty > 1 ? currentQty - 1 : 1;
			Qty=currentQty-1;
			this.setState({ButtonStateHolder: false});}
			else{
				this.setState({ButtonStateHolder1: true});
			}
		}

		this.setState({ cartItems: newItems }); // set new state
		axios.patch(`http://localhost:3002/carts/${this.state.id}/${newItems[index]['cartID']}`,{
          productQuantity: Qty})
	}
	
	subtotalPrice = () => {
		const {cartItems} = this.state;
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.productQuantity * item.productPrice : 0), 0 );
		}
		return 0;
	}
	
	
	
	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});

		const { selectProducts, selectProductsIsLoading, selectAll, user,selectAllIsLoading } = this.state;
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
				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-cart" size={25} color="#000" />
					</View>
					
					<View style={[styles.centerElement, {height: 50}]}>
						<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
					</View>
				</View>
				
				
				{selectProductsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						{selectProducts && selectProducts.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, this.state.cartItems[i].checked)}>
										<Ionicons name={this.state.cartItems[i].checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={this.state.cartItems[i].checked == 1 ? "#1E90FF" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.productImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.productName}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Variation: ' + item.color : ''}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Description: ' + item.productDescription : ''}</Text>
                                        <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>{this.state.cartItems[i].productQuantity * item.productPrice} Rs</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => this.quantityHandler('less', i)}  disabled={this.state.ButtonStateHolder1} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{this.state.cartItems[i].productQuantity}</Text>
											<TouchableOpacity onPress={() => this.quantityHandler('more', i)} disabled={this.state.ButtonStateHolder} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.deleteHandler(i)}>
										<Ionicons name="md-trash" size={25} color="red" />
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>
				)}
				
				{!selectProductsIsLoading && 
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
								</View>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Voucher</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Enter voucher code" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
							{selectAllIsLoading &&
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#1E90FF" : "#aaaaaa"} />
								</TouchableOpacity>}
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Select All</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>{this.subtotalPrice().toFixed(2)} Rs</Text>
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#1E90FF', width: 100, height: 25, borderRadius: 5}]} onPress={() => navigation.navigate('Checkout',{id:this.state.id})}>
								<Text style={{color: '#ffffff'}}>Checkout</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			</View>
		);
	}
}