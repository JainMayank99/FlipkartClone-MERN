import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { dummyData } from '../data/prodData';
import ProductInfo from '../components/ProductDescriptionComponents/ProductInfo';
import ProductCarousel from '../components/ProductDescriptionComponents/ProductCarousel';
import ProductReturnPolicy from '../components/ProductDescriptionComponents/ProductReturnPolicy';
import ProductRating from '../components/ProductDescriptionComponents/ProductRating';
import ProductReviews from '../components/ProductDescriptionComponents/ProductReviews';
import ProductTitle from '../components/ProductDescriptionComponents/ProductTitle';
import RelatedProducts from '../components/ProductDescriptionComponents/RelatedProducts';

const ProductDescScreen = () => {
    return (
        <>
            <ProductCarousel data={dummyData} />
            <ScrollView>
                <ProductTitle />

                <ProductInfo />
                <ProductReturnPolicy />
                <ProductRating />
                <ProductReviews />
                <RelatedProducts />
            </ScrollView>
        </>
    );
};

export default ProductDescScreen;
