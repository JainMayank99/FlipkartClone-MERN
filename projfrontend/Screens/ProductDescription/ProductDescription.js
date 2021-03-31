import React from "react";
import { ScrollView } from "react-native";
import { dummyData } from "../../data/prodData";
import ProductInfo from "./Components/ProductInfo";
import ProductCarousel from "./Components/ProductCarousel";
import ProductReturnPolicy from "./Components/ProductReturnPolicy";
import ProductRating from "./Components/ProductRating";
import ProductReviews from "./Components/ProductReviews";
import ProductTitle from "./Components/ProductTitle";
import RelatedProducts from "./Components/RelatedProducts";

const ProductDescScreen = ({ route, navigation }) => {
	const { item } = route.params;
	// console.log(item);
	return (
		<>
			<ProductCarousel data={item.image} />
			<ScrollView>
				<ProductTitle
					name={item.name}
					price={item.price}
					discount={item.discount}
				/>

				<ProductInfo description={item.description} />
				<ProductReturnPolicy />
				{/* <ProductRating /> */}
				<ProductReviews id={item._id} avgRating={item.avgRating} />
				<RelatedProducts categoryId={item.category} navigation={navigation} />
			</ScrollView>
		</>
	);
};

export default ProductDescScreen;
