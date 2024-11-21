import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';

const App: React.FC = () => {
  return (
    <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Olivetti_Programma_101_-_Museo_scienza_e_tecnologia_Milano.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Estamos felizes em tê-lo aqui.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://drive.google.com/file/d/1CYnpx3mhwiX7YBlBJBuiTfaR76baxzSv/view?usp=sharing')}>
          <Text style={styles.buttonText}>Link 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://link2.com')}>
          <Text style={styles.buttonText}>Link 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://link3.com')}>
          <Text style={styles.buttonText}>Link 3</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Define o estilo da imagem de fundo
  backgroundImage: {
    flex: 1, // Ocupa todo o espaço disponível
    resizeMode: 'cover', // Redimensiona a imagem para cobrir toda a tela
  },
  // Define o estilo do contêiner principal da aplicação
  container: {
    flex: 1, // Contêiner como flexível, ocupando todo o espaço disponível
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    padding: 16, // Preenchimento interno do contêiner
  },
  // Define o estilo do título
  title: {
    fontSize: 30, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte do título (negrito)
    color: 'red', // Cor do texto do título
    marginBottom: 20, // Margem inferior do título
  },
  // Define o estilo do subtítulo
  subtitle: {
    fontSize: 18, // Tamanho da fonte do subtítulo
    color: 'white', // Cor do texto do subtítulo
    marginBottom: 40, // Margem inferior do subtítulo
    textAlign: 'center', // Centraliza o texto do subtítulo
  },
  // Define o estilo do botão
  button: {
    backgroundColor: '#32CD32', // Cor de fundo do botão
    padding: 10, // Preenchimento interno do botão
    borderRadius: 5, // Raio das bordas arredondadas do botão
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do botão
    marginBottom: 10, // Margem inferior do botão
  },
  // Define o estilo do texto dentro do botão
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte do texto do botão
    fontWeight: 'bold', // Peso da fonte do texto do botão (negrito)
  },
});

export default App;
