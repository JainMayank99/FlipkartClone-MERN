import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
} from 'react-native';
import CarouselItem from './CarouselItem';

const { width, heigth } = Dimensions.get('window');
let flatList;

function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0,
        scrolled = 0;
    flag = 0;

    setInterval(function () {
        if (scrolled == 0) flag = 0;
        if (scrolled == numberOfData - 1) flag = 1;
        if (flag === 0 && scrolled < numberOfData - 1) {
            scrollValue = scrollValue + width;
            scrolled++;
        } else {
            scrollValue = scrollValue - width;
            scrolled--;
        }

        this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000);
}

const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);

    useEffect(() => {
        setDataList(data);
        infiniteScroll(dataList);
    });

    if (data && data.length) {
        return (
            <View style={styles.body}>
                <FlatList
                    data={data}
                    ref={(flatList) => {
                        this.flatList = flatList;
                    }}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />;
                    }}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } },
                    ])}
                />

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    opacity,
                                    height: 10,
                                    width: 10,
                                    backgroundColor: '#fc8019',
                                    margin: 8,
                                    borderRadius: 5,
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }

    console.log('Please provide Images');
    return null;
};

const styles = StyleSheet.create({
    body: {
        marginTop: 10,
    },

    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -35,
    },
});

export default Carousel;
