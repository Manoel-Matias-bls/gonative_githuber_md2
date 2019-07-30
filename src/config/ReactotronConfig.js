import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.100', port: 9090 }) // controla as configurações de conexão e comunicação
    .useReactNative() // adiciona todos os plug-ins nativos de resposta integrados
    .connect(); // vamos nos conectar!

  console.tron = tron;

  tron.clear();
}
