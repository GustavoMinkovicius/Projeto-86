import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity
} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component() {

    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
            stories: []
        };
    }

    componentDidMount() {
        this.fetchUser();
    }

    async fetchUser() {
        let theme,
            name,
            image;
        await firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot
                    .val()
                    .current_theme;
                name = `${snapshot
                    .val()
                    .first_name} ${snapshot
                    .val()
                    .last_name}`;
                image = snapshot
                    .val()
                    .profile_picture;
            });
        this.setState({
            light_theme: theme === "light"
                ? true
                : false,
            isEnabled: theme === "light"
                ? false
                : true,
            name: name,
            profile_image: image
        });
    }
    
    async addPost(){
      if(
          this.state.caption
      ){  let postData={
             preview_image: this.state.previewImage,
             caption: this.state.caption,
             author: firebase.auth().currentuser.displayName,
             created_on: new Date(),
             author_uid: firebase.auth().currentuser.uid,
             profile_image: this.state.profile_image,
              likes:0
          };
          await firebase
              .database()
              .ref(
                  Math.random().tostring(36).slice(2)
              )
              set(postData)
              then(function (snapshot){ });
              SetupdateToTrue();
          this.props.navigation.navigate("Feed" );
       }  else{
         Alert.alert(
              "Error",
              "Todos os campos são obrigatórios!",
             [{ text: "OK", onPress: () => console. log("ok Pressionado") }],
               {cancelable: false}
         )}
      }
  
    render() {
        let preview_images = {
            image_1: require("../assets/story_image_1.png"),
            image_2: require("../assets/story_image_2.png"),
            image_3: require("../assets/story_image_3.png"),
            image_4: require("../assets/story_image_4.png"),
            image_5: require("../assets/story_image_5.png")
        };
        return (
            <View
                style={this.state.light_theme
                ? styles.containerLight
                : styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image source={require("../assets/logo.png")} style={styles.iconImage}></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text
                            style={this.state.light_theme
                            ? styles.appTitleText
                            : styles.appTitleTextLight}>Novo post</Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image
                            source={preview_images[this.state.previewImage]}
                            style={styles.previewImage}></Image>
                        <View
                            style={{
                            height: RFValue(this.state.dropdownHeight)
                        }}>
                            <DropDownPicker
                                items={[
                                {
                                    label: "Imagem 1",
                                    value: "image_1"
                                }, {
                                    label: "Imagem 2",
                                    value: "image_2"
                                }, {
                                    label: "Imagem 3",
                                    value: "image_3"
                                }, {
                                    label: "Imagem 4",
                                    value: "image_4"
                                }, {
                                    label: "Imagem 5",
                                    value: "image_5"
                                }
                            ]}
                                defaultValue={this.state.previewImage}
                                containerStyle={{
                                height: 40,
                                borderRadius: 20,
                                marginBottom: 10
                            }}
                                onOpen={() => {
                                this.setState({dropdownHeight: 170});
                            }}
                                onClose={() => {
                                this.setState({dropdownHeight: 40});
                            }}
                                style={{
                                backgroundColor: "transparent"
                            }}
                                itemStyle={{
                                justifyContent: "flex-start"
                            }}
                                dropDownStyle={{
                                backgroundColor: "#2f345d"
                            }}
                                labelStyle={{
                                color: "white",
                                fontFamily: "Bubblegum-Sans"
                            }}
                                arrowStyle={{
                                color: "white",
                                fontFamily: "Bubblegum-Sans"
                            }}
                                onChangeItem={item => this.setState({previewImage: item.value})}/>
                        </View>

                        <TextInput
                            style={this.state.light_theme
                            ? styles.inputFont
                            : styles.inputFontLight}
                            onChangeText={caption => this.setState({caption})}
                            placeholder={"Legenda"}
                            placeholderTextColor="white"/>

                        <TouchableOpacity onPress={ addPost() }>
                              <text> Adicionar  </text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={{
                    flex: 0.08
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "#black"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android"
            ? StatusBar.currentHeight
            : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontLight: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "black",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
        marginTop: RFValue(15)
    },
    inputTextBig: {
        textAlignVertical: "top",
        padding: RFValue(5)
    }
});
