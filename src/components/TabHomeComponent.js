import React from 'react';
import { Text, View } from 'react-native';
import CultivationListPage from "../pages/CultivationListPage";
import FieldListPage from "../pages/FieldListPage";
class  TabHomeComponent extends React.Component{
    constructor(props){
        super(props)
        //costruttore chiamato prima che venga renderizzato il component
    }
    componentDidMount(){
        //viene chiamato quando si deve renderizzare
    }
    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Text>Hello, world!</Text>
            </View>
        );


    }
}
export default TabHomeComponent;
