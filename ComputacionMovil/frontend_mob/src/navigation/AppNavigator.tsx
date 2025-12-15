import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Paises} from "../views/pais/Paises";
import {Ciudades} from "../views/ciudad/Ciudades";
import {Estadios} from "../views/estadio/Estadios";
import {Partidos} from "../views/partido/Partidos";
import {Menu} from "../views/menu/Menu";
import {Equipos} from "../views/equipo/Equipos";
import Login from "../views/login/Login";
import Home from "../views/home/Home";
import Register from "../views/register/Register";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (

      <Stack.Navigator id="root-stack"   
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Paises" component={Paises} />
        <Stack.Screen name="Ciudades" component={Ciudades} />
        <Stack.Screen name="Estadios" component={Estadios} />
        <Stack.Screen name="Partidos" component={Partidos} />
        <Stack.Screen name="Equipos" component={Equipos} />
      </Stack.Navigator>
    
  );
}
