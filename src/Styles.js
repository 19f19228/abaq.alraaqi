import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 15
    },
    logo: {
        resizeMode: 'contain',
        width: 150,
        height: 150,
        alignSelf: 'center',
        margin: 5
    },
    title: {
        fontSize: 26,
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'center',
        color: '#013236'
    },
    label: {
        margin: 3,
        color: '#013236',
        marginBottom: 3,
        fontSize: 18
    },
    input: {
        padding: 15,
        margin: 3,
        borderBottomColor: '#013236',
        borderBottomWidth: 3,
        backgroundColor: '#ffffff',
        borderRadius: 7,
        color: '#013236'
    },
    btn: {
        backgroundColor: '#013236',
        marginTop: 15,
        padding: 5,
        alignSelf: 'center',
        borderRadius: 5,
        width: '45%',
        margin: 3,
        marginBottom: 15
    },
    inline: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginTop: 15,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    },
    bg: {
        resizeMode: "cover",
        height: Dimensions.get("screen").height,
        width: '100%'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 150
    },
    card: {
        width: '46%',
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    productTitle: {
        color: '#013236',
        padding: 5,
        fontWeight: 'bold',
        height: 65,
    },
    productPrice: {
        color: '#013236',
        paddingLeft: 5
    },
    icon: {
        width: 30,
        height: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        backgroundColor: '#ffffff'
    },
    headerBtn: {
        padding: 15
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 15
    },
    cartItemText: {
        textAlign: 'left',
        width: '60%',
        color: '#000'
    },
    cartBtn: {
        backgroundColor: '#013236',
        marginTop: 2,
        padding: 2,
        alignSelf: 'center',
        borderRadius: 5,
        width: '25%',
        marginLeft: 3, 
        marginRight: 3
    },
    line: {
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1, 
        margin: 15
    },
    tab: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#013236',
        padding: 15,
        marginLeft: 3,
    },
    tabSelected: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#013236'
    }
})
