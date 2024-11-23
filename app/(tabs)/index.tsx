import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';

const App: React.FC = () => {
  return (
    <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Olivetti_Programma_101_-_Museo_scienza_e_tecnologia_Milano.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>APP Calculadoras.</Text>
        <Text style={styles.subtitle3}>Estamos felizes em tê-lo aqui.</Text>
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
  // Define o estilo do título 1
  title: {
    fontSize: 40, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte do título (negrito)
    color: 'red', // Cor do texto do título
    marginBottom: 20, // Margem inferior do título
  },
  // Define o estilo do subtítulo 2
  subtitle: {
    fontSize: 30, // Tamanho da fonte do subtítulo
    color: 'blue', // Cor do texto do subtítulo
    marginBottom: 40, // Margem inferior do subtítulo
    textAlign: 'center', // Centraliza o texto do subtítulo
    
  },
  // Define o estilo do subtítulo 3
  subtitle3: {
    fontSize: 20, // Tamanho da fonte do subtítulo
    color: 'green', // Cor do texto do subtítulo
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
