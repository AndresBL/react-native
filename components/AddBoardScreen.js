import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Add Board',
  };
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      sexo: '',
      cumpleaños: '',
      direccion: '',
      matricula: '',
      telefono: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveBoard() {
    const { navigation } = this.props;
    this.setState({
      isLoading: true,
    });
    fetch('https://api-zuexobuslk.now.sh/api/v1/personas', {
      method: 'POST',
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
    //agregar el documento a la base de datos
    /*
     ({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
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
              leftIcon={{name: 'save'}}
              title='Save'
              onPress={() => this.saveBoard()} />
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


export default AddBoardScreen;