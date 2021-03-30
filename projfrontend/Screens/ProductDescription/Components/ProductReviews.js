import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getReviewByProductId } from "../APICalls/productReview";

const width = Dimensions.get("screen").width;
const ProductReviews = ({ id, avgRating }) => {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		getReviewByProductId(id)
			.then((res) => {
				setReviews(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log("Error in getting review of product", err);
			});
	}, []);

	return (
		<View>
			<View
				style={{
					paddingVertical: 8,
					paddingHorizontal: 16,
					borderBottomWidth: 8,
					borderColor: "#edeeef",
				}}
			>
				<Text style={styles.title}>Ratings & Reviews</Text>

				<View style={styles.subTitle}>
					<Text style={styles.textRating}>
						<Feather name="star" size={22} style={styles.icon} />
						<Text> {avgRating}</Text> out of 5
					</Text>
					<Text style={styles.text}>
						<Feather name="user" size={22} style={styles.icon} />
						<Text> {reviews.length} Reviews .</Text>
					</Text>
				</View>
			</View>
			<View
				style={{
					paddingVertical: 8,
					paddingHorizontal: 16,
					borderBottomWidth: 8,
					borderColor: "#edeeef",
				}}
			>
				<Text style={styles.title}>Customer Reviews</Text>
				<View>
					<FlatList
						data={reviews}
						showsHorizontalScrollIndicator={true}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => {
							// console.log("item", item);
							<View style={styles.customerReview}>
								<Text style={styles.text}>
									<Feather name="star" size={22} style={styles.icon} />
									<Text> {item.starCount} out of 5</Text>
								</Text>
								<Text style={styles.review}>
									{item.reviewText}
									{/* The pendant is really nice but the chain is not of that gud quality. */}
								</Text>
								{/* <Text style={styles.user}>Ayushi</Text> */}
							</View>;
						}}
					/>
				</View>

				{/* <View style={styles.customerReview}>
					<Text style={styles.text}>
						<Feather name="star" size={22} style={styles.icon} />
						<Text> 4.5 out of 5</Text>
					</Text>
					<Text style={styles.review}>
						This piece is so stunning and also it looks classy.
					</Text>
					<Text style={styles.user}>Shikha Gupta</Text>
				</View> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontFamily: "popins-bold",
		fontSize: 20,
		color: "#1a2228",
	},
	subTitle: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "#444d56",
	},
	textRating: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
	},
	icon: {
		color: "#FC8019",
	},
	text: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
	},
	review: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
		paddingHorizontal: 4,
	},
	user: {
		fontFamily: "popins-semibold",
		fontSize: 16,
		color: "black",
		paddingHorizontal: 4,
	},
	customerReview: {
		paddingVertical: 8,
	},
});
export default ProductReviews;
