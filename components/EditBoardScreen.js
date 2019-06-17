import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class EditBoardScreen extends Component {
  static navigationOptions = {
    title: 'Edit Board',
  };
  constructor(props) {
    super(props);
    this.ref = firebase.database().ref('boards');
    this.state = {
      key: '',
      nombre: '',
      sexo: '',
      cumpleaños: '',
      direccion: '',
      matricula: '',
      telefono: '',
      isLoading: false,
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
        nombre: responseJson.nombre,
        sexo: responseJson.sexo,
        cumpleaños: responseJson.cumpleaños,
        direccion: responseJson.direccion,
        matricula: responseJson.matricula,
        telefono: responseJson.telefono,
        key: responseJson.id
      })
    })
    .catch(error=>console.log("Error en api :", error)) //to catch the errors if any    
 // obtener el documento utilizando navigation.getParam('boardkey')
    /*  if (doc.exists) {
        const board = doc.val();
        this.setState({
          key: doc.key,
          title: board.title,
          description: board.description,
          author: board.author,
          isLoading: false
        });      
      } else {
        console.log("No existe el elemento!");
      }
    */
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    var url = 'https://api-zuexobuslk.now.sh/api/v1/personas/' + this.state.key
    fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: this.state.nombre,
          sexo: this.state.sexo,
          cumpleaños: this.state.cumpleaños,
          direccion: this.state.direccion,
          matricula: this.state.matricula,
          telefono: this.state.telefono,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              nombre: '',
              sexo: '',
              cumpleaños: '',
              direccion: '',
              matricula: '',
              telefono: '',
              isLoading: false,
            });
            navigation.push('Board');
          })
          .catch((error) => {
            console.error(error);
          });
    // actualizar el elemento utilizando this.state.key
    /*({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Board');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    }); */
  }



  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Nombre'}
                value={this.state.nombre}
                onChangeText={(text) => this.updateTextInput(text, 'nombre')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Sexo'}
                value={this.state.sexo}
                onChangeText={(text) => this.updateTextInput(text, 'sexo')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Cumpleaños'}
                value={this.state.cumpleaños}
                onChangeText={(text) => this.updateTextInput(text, 'cumpleaños')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Direccion'}
                value={this.state.direccion}
                onChangeText={(text) => this.updateTextInput(text, 'direccion')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Matricula'}
                value={this.state.matricula}
                onChangeText={(text) => this.updateTextInput(text, 'matricula')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Telefono'}
                value={this.state.telefono}
                onChangeText={(text) => this.updateTextInput(text, 'telefono')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'update'}}
              title='Update'
              onPress={() => this.updateBoard()} />
          </View>
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
    marginBottom: 20,
    padding: 5,
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
  }
})


export default EditBoardScreen;