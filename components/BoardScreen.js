import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../firebasedb';


class BoardScreen extends Component {
  static navigationOptions = {
    title: 'Board',
  };

  constructor(props) {
  super(props);
  this.state = {
    loading: true,
    people:[]
    };
  }

  componentDidMount(){
  fetch("https://api-zuexobuslk.now.sh/api/v1/personas/")
  .then(response => response.json())
  .then((responseJson)=> {
    this.setState({
    loading: false,
    people: responseJson
    })
  })
  .catch(error=>console.log("Errot en api :", error)) //to catch the errors if any
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Board List',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddBoard') }}
        />
      ),
    };
  };
  render() {
    if(this.state.loading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>        
          {
            this.state.people.map((item, i) => (
              <ListItem
                key={i}
                title={item.nombre}
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('BoardDetails', {
                    boardkey: item.id,
                  });
                }}
              />
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default BoardScreen;