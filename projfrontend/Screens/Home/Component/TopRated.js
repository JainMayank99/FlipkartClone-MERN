import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image as ExpoImage } from 'react-native-expo-image-cache';

const TopRated = ({topRatedItems}) => {
  const [gallery, setgallery] = useState([
    {
      image: require("../../../assets/main/bsj1.jpg"),
      rating: "4.7",
      title: "Avengers: End Game",
      released: "2019 ‧ Action/Sci-fi ‧ 3h 2m",
      key: "1",
      desc: "After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.",
    },
    {
      image: require("../../../assets/main/bsc3.jpg"),
      title: "Frozen II",
      released: "2019 ‧ Animation/Musical ‧ 1h 43m",
      rating: "4.5",

      key: "2",
      desc: "Elsa the Snow Queen has an extraordinary gift -- the power to create ice and snow. But no matter how happy she is to be surrounded by the people of Arendelle, Elsa finds herself strangely unsettled.",
    },
    {
      image: require("../../../assets/main/deal5.webp"),
      title: "Alita: Battle Angel",
      released: "2019 ‧ Action/Sci-fi ‧ 2h 2m",
      rating: "4.2",

      key: "3",
      desc: "Alita, a battle cyborg, is revived by Ido, a doctor, who realises that she actually has the soul of a teenager. Alita then sets out to learn about her past and find her true identity.",
    },
    {
      image: require("../../../assets/main/spot1.webp"),
      title: "The Irish Man",
      released: "2019 ‧ Crime/Drama ‧ 3h 30m",
      rating: "4.7",

      key: "4",
      desc: "In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa.",
    },
    {
      image: require("../../../assets/main/deal4.webp"),
      title: "John Wick Chapter 3",
      released: "2019 ‧ Action/Thriller ‧ 2h 10m",
      key: "5",
      rating: "5",

      desc: "John Wick is declared excommunicado and a hefty bounty is set on him after he murders an international crime lord. He sets out to seek help to save himself from ruthless hitmen and bounty hunters.",
    },
  ]);

  const image = {
    uri: require("../../../assets/catIcons/star.png"),
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
        <Text style={styles.text}>Top Rated</Text>
      </View>

      <FlatList
        horizontal
        horizontal={true}
        data={topRatedItems}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginLeft: 8,
                paddingBottom: 16,
                paddingHorizontal: 8,
              }}
            >
              <TouchableOpacity>
                <ExpoImage
                  style={{
                    width: 87.5,
                    height: 105,
                    borderRadius: 5,
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
                  <Text style={styles.textDiscount}>
                    <Feather name="star" size={18} style={styles.icon} />
                    <Text>{item.avgRating}</Text>/5
                  </Text>
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
    padding: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "popins-bold",
    fontSize: 20,
    color: "#20263e",
    paddingTop: 10,
    marginLeft: 3,
  },
  discountBox: {
    position: "absolute",
    bottom: -10,
    left: 6.25,
    alignItems: "center",
    backgroundColor: "#FF6B3C",
    width: 75.5,
    borderRadius: 5,
    padding: 2,
  },
  textDiscount: {
    fontFamily: "popins-semibold",
    fontSize: 14,
    color: "white",
  },
  icon: {
    color: "white",
  },
});
export default TopRated;
