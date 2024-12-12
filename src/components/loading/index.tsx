import { ActivityIndicator } from "react-native";
import {s} from "./styles"

export function Loading () {
    return <ActivityIndicator color = {"blue"} style={s.container}/>
}