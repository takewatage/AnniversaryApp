import React, {useState} from "react";
import {Text, View, StyleSheet, FlatList, ListRenderItemInfo} from "react-native";
import {Button, Card} from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AIcon from 'react-native-vector-icons/AntDesign'
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Pairs from "../../models/pairs";
import useStory from "../../hooks/useStory";
import Story from "../../models/story";

const TEST = [
    {
        id: 1,
        title: 'test'
    },
    {
        id: 2,
        title: 'test'
    },
    {
        id: 3,
        title: 'test'
    },
    {
        id: 4,
        title: 'test'
    },
]

interface AnniversaryListType {
    id: number
    title?: string
    date?: string
    countDown?:number
    daysLater?: string
}

interface IProps {
    stories: Story[]
}

export const SecondScreen = (props: IProps) => {
    const [anniversaryList, setAnniversaryList] = useState<AnniversaryListType[]>(TEST)
    const safeArea = useSafeAreaInsets();
    const navi = useNavigation()
    const {pairs} = useSelector<RootState, {pairs: Pairs}>((state:RootState) => state.anniversary)


    const createStory = () => {
        navi.navigate('CreateDateModalScreen')
    }

    const _renderItem = (item : ListRenderItemInfo<Story>) => {
        return (
            <Ripple onPress={() => {}} style={styles.card}>
                <Text style={{fontSize: 12, color: '#A0A0A0'}}>{item.item.title}</Text>
                <Text style={{marginRight: 15,fontSize: 20}}>{item.item.dateCount}</Text>
                <Text style={{color: 'pink'}}>{item.item.date}</Text>
            </Ripple>
        )
    }

    return (
        <View style={{ flex: 1, padding: 15, position:"relative"}}>
            <FlatList
                data={props.stories}
                renderItem={_renderItem}
                keyExtractor={(item) => item.date}
            />

            <Ripple style={[styles.Icon, {bottom: safeArea.bottom+ 30}]}
                    onPress={() => createStory()}>
                <AIcon
                    name='plus'
                    color={'#fff'}
                    size={35}
                />
            </Ripple>
        </View>
    )
}

const styles = StyleSheet.create({
    topText: {
        color: '#ffffff'
    },

    card: {
        borderRadius: 6,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 15
    },

    Icon: {
        position: 'absolute',
        right: 25,
        backgroundColor: 'pink',
        borderRadius: 100,
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        /* shadow */
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    }
})