import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";

import React from "react";

import Login from "./src/screens/Login";
import CreateAccount from "./src/screens/CreateAccount";
import AccountScreen from "./src/screens/AccountScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Map from "./src/screens/Map";
import CartScreen from "./src/screens/CartScreen";
import Menu from "./src/screens/Menu";
import Plates from "./src/screens/Plates";
import Appetizers from "./src/screens/Appetizers";
import Salads from "./src/screens/Salads";
import Drinks from "./src/screens/Drinks";
import Wraps from "./src/screens/Wraps";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import PurchaseComplete from "./src/screens/PurchaseComplete";

import InnerMenuAppetizer from "./src/screens/InnerMenuAppetizer";
import InnerMenuPlate from "./src/screens/InnerMenuPlate";
import InnerMenuSalad from "./src/screens/InnerMenuSalad";
import InnerMenuDrink from "./src/screens/InnerMenuDrink";
import InnerMenuWrap from "./src/screens/InnerMenuWrap";

import { Ionicons } from "@expo/vector-icons";

import { Provider as CartProvider } from "./src/context/CartContext";
import { Provider as AppetizerProvider } from "./src/context/AppetizerContext";
import { Provider as InnerMenuProvider } from "./src/context/InnerMenuContext";
import { Provider as PlatesProvider } from "./src/context/PlatesContext";
import { Provider as SaladsProvider } from "./src/context/SaladContext";
import { Provider as DrinksProvider } from "./src/context/DrinksContext";
import { Provider as WrapsProvider } from "./src/context/WrapsContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import LoadingScreen from "./src/screens/LoadingScreen";

//describes flow of the project, login is the beginning, login allows for user to enter.
//main flow has a bottom navigator with main navigation points.
const switchNavigator= createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    loginFlow: createStackNavigator({
      Login: Login,
      Signup: CreateAccount,
    }),
    
    mainFlow: createBottomTabNavigator({      
       
        Home: {
          screen: HomeScreen,
          navigationOptions:{
            tabBarLabel: "Home",
            tabBarOptions: {
              activeTintColor: '#b12135',
            },
            tabBarIcon: (tabInfo) =>{
              return(
                <Ionicons
                  name="md-home"
                  size={24}
                  color={tabInfo.focused ? '#b12135':"#8e8e93"}
                  />
              );
            },
          },
        },
        // Menu: {
        //   screen: Menu,
        //   navigationOptions:{
        //     tabBarLabel: "Menu",
        //     tabBarOptions: {
        //       activeTintColor: '#b12135',
        //     },
        //     tabBarIcon: (tabInfo) =>{
        //       return(
        //         <Ionicons
        //           name="restaurant"
        //           size={24}
        //           color={tabInfo.focused ? '#b12135':"#8e8e93"}
        //           />
        //       );
        //     },
        //   },
        // },
        Menu: createStackNavigator({
          Menu: Menu,
          Appetizers: Appetizers,
          Plates: Plates,
          
          Salads: Salads,
          Drinks: Drinks,
          Wraps: Wraps,
          InnerMenuAppetizer: InnerMenuAppetizer,
          InnerMenuPlate: InnerMenuPlate,
          InnerMenuSalad: InnerMenuSalad,
          InnerMenuDrink: InnerMenuDrink,
          InnerMenuWrap: InnerMenuWrap,
          Checkout: CheckoutScreen,
          Complete: PurchaseComplete,
      }),
      Cart: {
        screen: CartScreen,
        navigationOptions:{
          tabBarLabel: "Cart",
          tabBarOptions: {
            activeTintColor: '#b12135',
          },
          tabBarIcon: (tabInfo) =>{
            return(
              <Ionicons
                name="cart"
                size={24}
                color={tabInfo.focused ? '#b12135' : "#8e8e93"}
                />
            );
          },
        },
      },
      Map: {
        screen: Map,
        navigationOptions:{
          tabBarLabel: "Map",
          tabBarOptions:{
            activeTintColor: '#b12135',
          },
          tabBarIcon: (tabInfo) =>{
            return(
              <Ionicons
              name="map"
              size={24}
              color={tabInfo.focused ? '#b12135' : "#8e8e93"}
              />

            );
          },
        },
      },
      AccountScreen: {
        screen: AccountScreen,
        navigationOptions:{
          tabBarLabel: "Account",
          tabBarOptions: {
            activeTintColor: '#b12135',
          },
          tabBarIcon: (tabInfo) =>{
            return(
              <Ionicons
                name="person"
                size={24}
                color={tabInfo.focused ? '#b12135' : "#8e8e93"}
                />
            );
          },
        },
      },
      
    })
});
const App = createAppContainer(switchNavigator);

//exports app and allows all context to be used within one another
export default () => {
  return <AuthProvider>
    <CartProvider>
      <AppetizerProvider>
        <WrapsProvider>
          <SaladsProvider>
            <DrinksProvider>
              <PlatesProvider>
                <InnerMenuProvider>
                  <App ref={(navigator) => {setNavigator(navigator)}} />
                </InnerMenuProvider>
              </PlatesProvider>
            </DrinksProvider>
          </SaladsProvider>
        </WrapsProvider>
      </AppetizerProvider>
    </CartProvider>
  </AuthProvider>

}
