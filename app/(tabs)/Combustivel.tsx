import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const App: React.FC = () => {
  const [gasolina, setGasolina] = useState<string>('');
  const [alcool, setAlcool] = useState<string>('');
  const [consumoGasolina, setConsumoGasolina] = useState<string>('');
  const [consumoAlcool, setConsumoAlcool] = useState<string>('');
  const [resultadoCombustivel, setResultadoCombustivel] = useState<string>('');
  const [resultadoConsumo, setResultadoConsumo] = useState<string>('');
  const [mostrarConsumo, setMostrarConsumo] = useState<boolean>(false);
  const [mostrarCalcular, setMostrarCalcular] = useState<boolean>(true);

  const calcular = () => {
    if (!gasolina || !alcool) {
      Alert.alert('Erro', 'Por favor, insira os preços da gasolina e do álcool ou calcule a média de veículos populares **9 km/l Álcool ou 13 km/l Gasolina**.');
      return;
    }

    const precoGasolina = parseFloat(gasolina);
    const precoAlcool = parseFloat(alcool);
    const kmPorLitroGasolina = parseFloat(consumoGasolina) || 13; // Eficiência média do Fiat Mobi com gasolina
    const kmPorLitroAlcool = parseFloat(consumoAlcool) || 9; // Eficiência média do Fiat Mobi com álcool

    const custoPorKmGasolina = precoGasolina / kmPorLitroGasolina;
    const custoPorKmAlcool = precoAlcool / kmPorLitroAlcool;

    if (custoPorKmAlcool < custoPorKmGasolina) {
      const kmExtra = ((kmPorLitroAlcool * precoGasolina) / precoAlcool - kmPorLitroGasolina).toFixed(2);
      setResultadoCombustivel('*ÁLCOOL*');
      setResultadoConsumo(`${kmExtra} km a mais por litro.`);
    } else {
      const kmExtra = ((kmPorLitroGasolina * precoAlcool) / precoGasolina - kmPorLitroAlcool).toFixed(2);
      setResultadoCombustivel('*GASOLINA*');
      setResultadoConsumo(`${kmExtra} km a mais por litro.`);
    }

    setMostrarCalcular(false); // Esconde o botão "Calcular" após o cálculo
  };

  const novaPesquisa = () => {
    setGasolina('');
    setAlcool('');
    setConsumoGasolina('');
    setConsumoAlcool('');
    setResultadoCombustivel('');
    setResultadoConsumo('');
    setMostrarConsumo(false);
    setMostrarCalcular(true); // Mostra o botão "Calcular" novamente
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Preço da Gasolina"
        keyboardType="numeric"
        value={gasolina}
        onChangeText={setGasolina}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Álcool"
        keyboardType="numeric"
        value={alcool}
        onChangeText={setAlcool}
      />
      {mostrarCalcular && (
        <TouchableOpacity style={[styles.button, styles.calcularButton]} onPress={calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      )}
      {resultadoCombustivel ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultCombustivel}>{resultadoCombustivel}</Text>
          <Text style={styles.resultConsumo}>{resultadoConsumo}</Text>
          <TouchableOpacity style={[styles.button, styles.novaPesquisaButton]} onPress={novaPesquisa}>
            <Text style={styles.buttonText}>Nova Pesquisa</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.buttonSpacing}>
        <TouchableOpacity style={[styles.button, styles.inserirConsumoButton]} onPress={() => setMostrarConsumo(true)}>
          <Text style={styles.buttonText}>Inserir Consumo Médio</Text>
        </TouchableOpacity>
      </View>
      {mostrarConsumo && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Consumo de Gasolina (km/L)"
            keyboardType="numeric"
            value={consumoGasolina}
            onChangeText={setConsumoGasolina}
          />
          <TextInput
            style={styles.input}
            placeholder="Consumo de Álcool (km/L)"
            keyboardType="numeric"
            value={consumoAlcool}
            onChangeText={setConsumoAlcool}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Define o estilo do contêiner principal da aplicação
  container: {
    backgroundColor: '#F5F5DC', // Cor de fundo do contêiner
    flex: 1, // Contêiner como flexível, ocupando todo o espaço disponível
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    padding: 3, // Preenchimento interno do contêiner
  },
  // Estilo dos campos de entrada de texto
  input: {
    backgroundColor: '#FFFACD', // Cor de fundo dos campos de entrada
    fontSize: 20, // Tamanho da fonte do texto dentro dos campos de entrada
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
    marginBottom: 3, // Margem inferior dos campos de entrada
    paddingHorizontal: 8, // Preenchimento horizontal interno dos campos de entrada
    borderRadius: 5, // Raio das bordas arredondadas dos campos de entrada
    textAlign: 'center', // Centraliza o texto dentro dos campos de entrada
  },
  // Estilo do contêiner que exibe os resultados
  resultContainer: {
    backgroundColor: '#FF0000', // Cor de fundo do contêiner de resultados
    paddingTop: 3, // Preenchimento superior do contêiner de resultados
    borderRadius: 5, // Raio das bordas arredondadas do contêiner de resultados
    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do contêiner de resultados
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do contêiner de resultados
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo do texto que exibe o combustível
  resultCombustivel: {
    fontSize: 24, // Tamanho da fonte do texto do combustível
    textAlign: 'center', // Centraliza o texto do combustível
    color: 'white', // Cor do texto do combustível
    fontWeight: 'bold', // Peso da fonte do texto do combustível (negrito)
    marginBottom: 3, // Margem inferior do texto do combustível
  },
  // Define o estilo do texto que exibe o consumo
  resultConsumo: {
    fontSize: 16, // Tamanho da fonte do texto do consumo
    textAlign: 'center', // Centraliza o texto do consumo
    color: 'yellow', // Cor do texto do consumo
    fontWeight: 'bold', // Peso da fonte do texto do consumo (negrito)
    marginBottom: 3, // Margem inferior do texto do consumo
  },
  // Define o espaçamento entre os botões
  buttonSpacing: {
    marginTop: 3, // Margem superior dos botões
  },
  // Define o estilo base dos botões
  button: {
    padding: 8, // Preenchimento interno dos botões
    borderRadius: 5, // Raio das bordas arredondadas dos botões
    marginBottom: 3, // Margem inferior dos botões
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro dos botões
  },
  // Define o estilo específico do botão "Calcular"
  calcularButton: {
    backgroundColor: '#32CD32', // Cor de fundo do botão "Calcular"
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo específico do botão "Nova Pesquisa"
  novaPesquisaButton: {
    backgroundColor: '#90EE90', // Cor de fundo do botão "Nova Pesquisa"
  },
  // Define o estilo específico do botão "Inserir Consumo Médio"
  inserirConsumoButton: {
    backgroundColor: '#87CEEB', // Cor de fundo do botão "Inserir Consumo Médio"
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo do texto dentro dos botões
  buttonText: {
    color: 'green', // Cor do texto dos botões
    fontSize: 20, // Tamanho da fonte do texto dos botões
    fontWeight: 'bold', // Peso da fonte do texto dos botões (negrito)
  },
});

export default App;
