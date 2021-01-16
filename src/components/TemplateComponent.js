import React from 'react';
import { Text, View } from 'react-native';
class  TemplateComponent extends React.Component{
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
        //viene chiamata per renderizzare il component
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
export default TemplateComponent;
