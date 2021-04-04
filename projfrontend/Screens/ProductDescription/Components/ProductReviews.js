import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getReviewByProductId } from "../APICalls/ProductReviewAPI";

const width = Dimensions.get("screen").width;
const ProductReviews = ({ id, avgRating }) => {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		getReviewByProductId(id)
			.then((res) => {
				setReviews(res.data);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log("Error in getting review of product", err);
			});
	}, [id]);

	return (
		<View
			style={{
				paddingVertical: 8,
				paddingHorizontal: 16,
				borderBottomWidth: 8,
				borderColor: "#edeeef",
			}}
		>
			<View style={styles.header}>
				<Text style={styles.title}>Ratings & Reviews</Text>
				{/* <Text style={styles.viewAll}>View All {">"}</Text> */}
			</View>
			<View>
				<FlatList
					style={{ maxHeight: 175 }}
					data={reviews}
					showsHorizontalScrollIndicator={true}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => {
						return (
							<View style={styles.customerReview}>
								<View style={styles.starRating}>
									<Text style={styles.starCount}> {item.starCount + " "} </Text>
									<Feather name="star" size={20} style={styles.icon} />
								</View>
								<Text style={styles.review}>{item.reviewText}</Text>
								{/* <Text style={styles.user}>{item.user}</Text> */}
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontFamily: "zilla-semibold",
		fontSize: 22.5,
		color: "#1a2228",
	},
	viewAll: {
		fontFamily: "zilla-semibold",
		fontSize: 16.5,
		color: "#FC8019",
	},
	subTitle: {
		fontFamily: "zilla-semibold",
		fontSize: 16,
		color: "#444d56",
	},
	textRating: {
		fontFamily: "zilla-semibold",
		fontSize: 16,
		color: "black",
	},
	icon: {
		color: "#FC8019",
		marginLeft: 2.5,
	},
	starRating: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		fontFamily: "zilla-semibold",
		fontSize: 18,
		color: "black",
		paddingVertical: 4,
	},
	starCount: {
		fontFamily: "zilla-semibold",
		fontSize: 18,
		color: "black",
	},
	review: {
		fontFamily: "zilla-semibold",
		fontSize: 18,
		color: "black",
		marginLeft: 8,
	},
	user: {
		fontFamily: "zilla-semibold",
		fontSize: 18,
		color: "black",
		marginLeft: 8,
	},
	customerReview: {
		paddingVertical: 8,
	},
});
export default ProductReviews;
