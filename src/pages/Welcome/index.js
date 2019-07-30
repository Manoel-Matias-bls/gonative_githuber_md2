import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';

import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('User');
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#444A5A" />

        <Text style={styles.title}>Bem-vindo ao Githuber!</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu usuário do GitHub.
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none" // impedi colocar letras em caixa alta
            autoCorrect={false} // impedi correções automáticas
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent" // por padrão inputs tem uma linha embaixo do texto, isso impedi que ela apareça
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.signIn();
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
