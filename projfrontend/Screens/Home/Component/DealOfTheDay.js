import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
	Dimensions,
} from "react-native";

import { Image as ExpoImage } from "react-native-expo-image-cache";

import { randomProduct } from "../APICall/HomeCall";

const DealOfTheDay = ({ language, navigation }) => {
	const width = Dimensions.get("screen").width;
	// const [gallery, setgallery] = useState([
	//     {
	//         image: require('../assets/main/deal1.webp'),
	//         title: 'Nehru Jackets',
	//         released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
	//         key: '1',
	//         desc:
	//             'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
	//     },
	//     {
	//         image: require('../assets/main/deal2.webp'),
	//         title: 'Mitera',
	//         released: '2019 ‧ Animation/Musical ‧ 1h 43m',
	//         key: '2',
	//         desc:
	//             'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
	//     },
	//     {
	//         image: require('../assets/main/deal3.jpg'),
	//         title: 'Priyaasi',
	//         released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
	//         key: '3',
	//         desc:
	//             'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
	//     },
	// ]);

	// const [gallery2, setgallery2] = useState([
	//     {
	//         image: require('../assets/main/deal4.webp'),
	//         title: 'Craft Vatika',
	//         released: '2019 ‧ Action/Sci-fi ‧ 3h 2m',
	//         key: '1',
	//         desc:
	//             'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
	//     },
	//     {
	//         image: require('../assets/main/deal5.webp'),
	//         title: 'Fog Lighting',
	//         released: '2019 ‧ Animation/Musical ‧ 1h 43m',
	//         key: '2',
	//         desc:
	//             'Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.',
	//     },
	//     {
	//         image: require('../assets/main/deal6.webp'),
	//         title: 'Cortina',
	//         released: '2019 ‧ Action/Sci-fi ‧ 2h 2m',
	//         key: '3',
	//         desc:
	//             'Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.',
	//     },
	// ]);

	const [gallery, setGallery] = useState();
	const [gallery2, setGallery2] = useState();

	useEffect(() => {
		randomProduct(3)
			.then((res) => {
				setGallery(res.data);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log("Deals of the Day Gallery1 Home Screen error", err);
			});
		randomProduct(3)
			.then((res) => {
				setGallery2(res.data);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log("Deals of the Day Gallery2 Home Screen error", err);
			});
	}, []);

	const image = {
		uri: require("../../../assets/catIcons/deals.png"),
	};
	const imageChevron = {
		uri: require("../../../assets/catIcons/chevron-right.png"),
	};
	return (
		<View
			style={{
				paddingBottom: 16,
				borderBottomWidth: 10,
				borderColor: "#edeeef",
			}}
		>
			<View style={styles.body}>
				<Image
					source={image.uri}
					style={{
						width: 24,
						marginRight: 8,
						height: 24,
					}}
				/>
				<Text style={styles.text}>
					{language === "en"
						? "Deals Of The Day"
						: language === "hi"
						? "दिन के सौदे"
						: language === "ka"
						? "ದಿನದ ವ್ಯವಹಾರಗಳು"
						: language === "ta"
						? "நாள் ஒப்பந்தங்கள்"
						: "రోజు ఒప్పందాలు"}
				</Text>
			</View>

			<FlatList
				horizontal
				horizontal={true}
				data={gallery}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								marginLeft: Dimensions.get("screen").width * 0.02041,
								paddingBottom: 32,
								paddingHorizontal: Dimensions.get("screen").width * 0.02041,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("ProductDescription", {
										item,
									});
								}}
							>
								<ExpoImage
									style={{
										width: width * 0.26785,
										height: 130,
										borderTopLeftRadius: 5,
										borderTopRightRadius: 5,
										resizeMode: "cover",
									}}
									preview={{
										uri: item.image[0].url
											.slice(0, 48)
											.concat("t_media_lib_thumb/")
											.concat(item.image[0].url.slice(48)),
									}}
									uri={item.image[0].url}
								/>
								<View style={styles.discountBox}>
									<Text style={styles.textDiscount}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						</View>
					);
				}}
			/>

			<FlatList
				horizontal
				horizontal={true}
				data={gallery2}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								marginTop: 16,
								marginLeft: Dimensions.get("screen").width * 0.02041,
								paddingBottom: 32,
								paddingHorizontal: Dimensions.get("screen").width * 0.02041,
							}}
						>
							<TouchableOpacity>
								<ExpoImage
									style={{
										width: width * 0.26785,
										height: 130,
										borderTopLeftRadius: 5,
										borderTopRightRadius: 5,
										resizeMode: "cover",
									}}
									preview={{
										uri: item.image[0].url
											.slice(0, 48)
											.concat("t_media_lib_thumb/")
											.concat(item.image[0].url.slice(48)),
									}}
									uri={item.image[0].url}
								/>
								{/* <Image
                                    source={item.image}
                                    style={{
                                        width: width * 0.26785,
                                        height: 130,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        resizeMode: 'cover',
                                    }}
                                /> */}
								<View style={styles.discountBox}>
									<Text style={styles.textDiscount}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: Dimensions.get("screen").width * 0.02041,
		paddingHorizontal: Dimensions.get("screen").width * 0.04082,
	},
	text: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#20263e",
		paddingTop: 10,
		marginLeft: 3,
	},
	view: {
		fontFamily: "popins-bold",
		fontSize: 18,
		color: "#20263e",
		paddingTop: 10,
		position: "absolute",
		right: Dimensions.get("screen").width * 0.10714,
	},
	discountBox: {
		position: "absolute",
		bottom: -25,
		left: 0,
		alignItems: "center",
		backgroundColor: "white",
		width: Dimensions.get("screen").width * 0.26785,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		padding: Dimensions.get("screen").width * 0.005102,
		shadowColor: "#f4f4f4",
		shadowOffset: { width: 0.8, height: 0.8 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 3,
	},
	textDiscount: {
		fontFamily: "popins-bold",
		fontSize: 14,
		color: "black",
	},
});

export default DealOfTheDay;
