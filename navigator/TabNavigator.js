import Feed from '../screens/Feed'
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import CreatePost from '../screens/CreatePost'

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            barStyle={styles.bottomTabStyle}
            screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === "Feed") {
                    iconName = focused
                        ? "book"
                        : "book-outline";
                } else if (route.name === "CreatePost") {
                    iconName = focused
                        ? "create"
                        : "create-outline";
                }
                return (<Ionicons name={iconName} size={size} color={color}/>);
            }
        })}
            tabbaroptions={{
            activeTintcolor: "tomato",
            inactiveTintColor: 'gray'
        }}>

            <Tab.Screen name="Feed" conponent={Feed}/>
            <Tab.Screen nane="CriarPost" component={CreatePost}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#2f345d",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        position: "absolute"
    },

    container: {
        flex: 1,
        backgroundColor: "black"
    },
    droidsafeArea: {
        marginTop: Platform.OS === "android"
            ? StatusBar.currentHeight
            : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignītems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextcontainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontsize: RFValue(28)
    },
    cardcontainer: {
        flex: 0.85
    }
});