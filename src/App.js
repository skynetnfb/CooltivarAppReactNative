import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from "./navigator/RootNavigator";
import {SafeAreaView} from "react-native-safe-area-context";

class  App extends React.Component{
    render() {
        return (
               /* <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >*/
               <SafeAreaView style={{
                   flex: 1
               }}>

                    <RootNavigator/>

               </SafeAreaView>

            //<TitleComponent title = {"Titolo Login da App.js"}/>
            //                    <CultivationListComponent children = {"Children di Cultivation List"} />
                    //altre componment
               //<CultivationFormPage/>
            //<LoginComponent/>
            //<CultivationDetailComponent children = {"Children di Cultivation Detail solo per test"} />
            //<CultivationListComponent children = {"Children di Cultivation List"} />
                    // nomeComponent Parametri Props
                //</View>
        );
    }
}
export default App;


