import {Text, ImageBackground, StatusBar, StyleSheet, View, TouchableNativeFeedback} from "react-native";
import * as React from "react";
import {useState} from "react";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Layout from "../../constants/Layout";
import linq from 'linq'
import Ripple from "react-native-material-ripple";
import {FirstScreen, SecondScreen} from "./index";
import Ani from "../../models/ani";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {InitScreen} from "./InitScreen";
import MenuDrawer from 'react-native-side-drawer'
import SideMenu from "../../components/SideMenu";
import FirestoreService from "../../services/FirestoreService";
import Pairs from "../../models/pairs";
import dayjs from "dayjs";
import FAIcon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/Feather";
import Story from "../../models/story";



export default function HomeScreen() {
    const [pageIndex, setPageIndex] = useState(0)
    const {pairs} = useSelector<RootState, {pairs: Pairs}>((state:RootState) => state.anniversary)
    // const [isCheckValue, setCheckValue] = useState(false)
    const [isSideMenu, setIsSideMenu] = useState(false)
    // const {pairCode} = useSelector<RootState, {pairCode: string}>((state:RootState) => state.pairCode)

    // const [pairData, setPairData] = useState<Pairs>(new Pairs({}))
    const [stories, setStory] = useState([])
    const dispatch = useDispatch()

    const [routes] = React.useState([
        { key: 'first', title: '記念日' },
        { key: 'second', title: 'ストーリー' },
    ]);
    const safeArea = useSafeAreaInsets()

    const renderScene = SceneMap({
        first: () => (<FirstScreen pairs={new Pairs(pairs)}/>),
        second: () => (<SecondScreen stories={stories}/>),
    });

    React.useMemo(() => {
        console.log("main", pairs.anniversaries)
        const arrays: Story[] = []
        const ARR = [1,10,30,50,100,150,200,300,400,500,600,700,800,900,1000]


        for (let i=0; ;i++) {
            if (ARR.indexOf(i) !== -1) {

                linq.from(pairs.anniversaries).forEach(x => {
                    const d = dayjs(x.date).add(i, 'd').format('YYYY.MM.DD')

                    const st = {
                        title: '付き合ってから',
                        date: `${d}`,
                        dateCount: `${i}日目`,
                    }
                    arrays.push(new Story(st))
                })
            }
            if(i == 1000) {
                console.log('arrays', arrays)
                // @ts-ignore
                setStory(arrays)
                return
            }
        }


    }, [])

    const onMenu = () => {
        setIsSideMenu(true)
    }


    const _renderTabBar = (props: any) => {
        return(
            <View>
                <View style={{width:'100%', height: safeArea.top}}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused, color }) => (
                            <View style={{alignItems:'center'}}>
                                {
                                    focused?<FAIcon size={8} name={'heart'} color={'pink'}/>
                                        :<FAIcon size={8} name={'heart'} color={'transparent'}/>
                                }
                                <Text style={{ color: color, margin: 8 }}>
                                    {route.title}
                                </Text>
                            </View>
                        )}
                        inactiveColor={'rgba(255, 255, 255, 0.5)'}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: 'transparent', height: 60, flexGrow: 1}}
                        activeColor={'#ffffff'}
                    />
                    <Ripple
                        style={styles.tabBarIcon}
                        rippleColor={"pink"}
                        onPressOut={() => {onMenu()}}>
                        <FIcon style={{}} size={25} name={'menu'} color={'white'}/>
                    </Ripple>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container]}>
            <ImageBackground style={{width: '100%', height: '100%'}} resizeMode="cover"
                             source={require('../../../assets/images/bg/bg.jpeg')}>

                <MenuDrawer
                    open={isSideMenu}
                    drawerContent={<SideMenu isOpen={isSideMenu} setOpen={setIsSideMenu}/>}
                    drawerPercentage={80}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}

                >
                    <TabView
                        lazy
                        style={{backgroundColor:'transparent'}}
                        sceneContainerStyle={{backgroundColor:'transparent'}}
                        swipeEnabled={true}
                        navigationState={{ index:pageIndex, routes }}
                        renderScene={renderScene}
                        onIndexChange={setPageIndex}
                        renderTabBar={_renderTabBar}
                        initialLayout={{width: Layout.window.width}}
                    />
                </MenuDrawer>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    tabBarIcon: {
        padding:15,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
