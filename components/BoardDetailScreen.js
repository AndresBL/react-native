import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../firebasedb';

class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: 'Board Details',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      people: {},
      key: ''
    };
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    var url = "https://api-zuexobuslk.now.sh/api/v1/personas/" + navigation.state.params.boardkey;
    fetch(url)
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
        isLoading: false,
        people: responseJson,
        key: navigation.state.params.boardkey
      })
    })
    .catch(error=>console.log("Error en api :", error)) //to catch the errors if any
    // obtener el documento utilizando navigation.getParam('boardkey')
    /*  if (doc.exists) {
        this.setState({
          board: doc.val(),
          key: doc.key,
          isLoading: false
        });
      } else {
        console.log("No existe el elemento!");
      }
    */
  }
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    var url = 'https://api-zuexobuslk.now.sh/api/v1/personas/' + key
    fetch(url, {
      method: 'DELETE'
    }).then((response) => response.json())
        .then(() => {
          console.log("Document successfully deleted!");
           this.setState({
            isLoading: false
          });
          navigation.push('Board');
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.setState({
            isLoading: false
          });
          navigation.push('Board');
        });
    // borrar el elemento utilizando el parametro key
    /*
    () => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    }); */
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h5>Nombre: {this.state.people.nombre}</Text>
            </View>
            <View>
              <Text h5>Sexo: {this.state.people.sexo}</Text>
            </View>
            <View>
              <Text h5>Cumpleaños: {this.state.people.cumpleaños}</Text>
            </View>
             <View>
              <Text h5>Direccion: {this.state.people.direccion}</Text>
            </View>
             <View>
              <Text h5>Matricula: {this.state.people.matricula}</Text>
            </View>
             <View>
              <Text h5>Telefono: {this.state.people.telefono}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: this.state.key,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})


export default BoardDetailScreen;