import React from 'react';
import { Text, View,SafeAreaView } from 'react-native';
import LoginComponent from './components/LoginComponent';
import RCTSafeAreaViewNativeComponent
    from 'react-native/Libraries/Components/SafeAreaView/RCTSafeAreaViewNativeComponent';
import {TitleComponent,CultivationListComponent} from './components/';
import CultivationDetailComponent from './components/CultivationDetail';
import CultivationFormPage from './pages/CultivationFormPage';
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
                   <TitleComponent title = {"Titolo Login da App.js"}/>
                   <CultivationListComponent children = {"Children di Cultivation List"} />
               </SafeAreaView>
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


