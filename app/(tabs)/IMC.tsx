import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const App: React.FC = () => {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [imc, setImc] = useState<string>('');
  const [classificacao, setClassificacao] = useState<string>('');
  const [pesoIdeal, setPesoIdeal] = useState<string>('');
  const [orientacao, setOrientacao] = useState<string>('');
  const [mostrarCalcular, setMostrarCalcular] = useState<boolean>(true);
  const [mostrarTitulo, setMostrarTitulo] = useState<boolean>(true);

  const calcularIMC = () => {
    if (!peso || !altura) {
      Alert.alert('Erro', 'Por favor, insira seu peso e altura.');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura) / 100; // Convertendo altura para metros

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    let classificacaoCalculada = '';

    if (imcCalculado < 18.5) {
      classificacaoCalculada = 'Abaixo do peso';
    } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
      classificacaoCalculada = 'Peso normal';
    } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
      classificacaoCalculada = 'Sobrepeso';
    } else {
      classificacaoCalculada = 'Obesidade';
    }

    const pesoIdealMin = (18.5 * alturaNum * alturaNum).toFixed(2);
    const pesoIdealMax = (24.9 * alturaNum * alturaNum).toFixed(2);

    setImc(`IMC: ${imcCalculado.toFixed(2)}`);
    setClassificacao(`Classificação: ${classificacaoCalculada}`);
    setPesoIdeal(`Peso ideal: ${pesoIdealMin} kg a ${pesoIdealMax} kg.`);

    if (classificacaoCalculada !== 'Peso normal') {
      setOrientacao('Procure orientações médica.');
    } else {
      setOrientacao('');
    }

    setMostrarCalcular(false); // Esconde o botão "Calcular" após o cálculo
    setMostrarTitulo(false); // Esconde o título após o cálculo
  };

  const novaPesquisa = () => {
    setPeso('');
    setAltura('');
    setImc('');
    setClassificacao('');
    setPesoIdeal('');
    setOrientacao('');
    setMostrarCalcular(true); // Mostra o botão "Calcular" novamente
    setMostrarTitulo(true); // Mostra o título novamente
  };

  return (
    <View style={styles.container}>
      {mostrarTitulo && <Text style={styles.title}>Calculadora de IMC</Text>}
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      {mostrarCalcular && (
        <TouchableOpacity style={[styles.button, styles.calcularButton]} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      )}
      {imc ? (
        <View style={styles.resultContainer}>
          <Text style={styles.imc}>{imc}</Text>
          <Text style={styles.classificacao}>{classificacao}</Text>
          <Text style={styles.pesoIdeal}>{pesoIdeal}</Text>
          {orientacao ? <Text style={styles.orientacao}>{orientacao}</Text> : null}
          <TouchableOpacity style={[styles.button, styles.novaPesquisaButton]} onPress={novaPesquisa}>
            <Text style={styles.buttonText}>Nova Pesquisa</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  // Define o estilo do contêiner principal da aplicação
  container: {
    backgroundColor: '#F5F5DC', // Cor de fundo do contêiner
    flex: 1, // Contêiner como flexível, ocupando todo o espaço disponível
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    padding: 16, // Preenchimento interno do contêiner
  },
  // Estilo do título
  title: {
    fontSize: 28, // Tamanho da fonte do título
    fontWeight: 'bold', // Peso da fonte do título
    color: 'black', // Cor do texto do título
    textAlign: 'center', // Centraliza o texto do título
    marginBottom: 10, // Margem inferior do título
  },
  // Estilo dos campos de entrada de texto
  input: {
    backgroundColor: '#FFFACD', // Cor de fundo dos campos de entrada
    fontSize: 22, // Tamanho da fonte do texto dentro dos campos de entrada
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
    padding: 10, // Preenchimento interno do contêiner de resultados
    borderRadius: 5, // Raio das bordas arredondadas do contêiner de resultados
    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do contêiner de resultados
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do contêiner de resultados
    marginTop: 3, // Margem superior do contêiner de resultados
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo do texto que exibe o IMC
  imc: {
    fontSize: 30, // Tamanho da fonte do texto do IMC
    textAlign: 'center', // Centraliza o texto do IMC
    color: 'white', // cor do texto do IMC
    fontWeight: 'bold', // Peso da fonte do texto do IMC (negrito)
    marginBottom: 3, // Margem inferior do texto do IMC
  },
  // Define o estilo do texto que exibe a classificação do IMC
  classificacao: {
    fontSize: 22, // Tamanho da fonte do texto da classificação
    textAlign: 'center', // Centraliza o texto da classificação
    color: 'white', // cor do texto da classificação
    fontWeight: 'bold', // Peso da fonte do texto da classificação (negrito)
    marginBottom: 3, // Margem inferior do texto da classificação
  },
  // Define o estilo do texto que exibe o peso ideal
  pesoIdeal: {
    fontSize: 16, // Tamanho da fonte do texto do peso ideal
    textAlign: 'center', // Centraliza o texto do peso ideal
    color: 'yellow', // Cor do texto do peso ideal
    fontWeight: 'bold', // Peso da fonte do texto do peso ideal (negrito)
    marginBottom: 3, // Margem inferior do texto do peso ideal
  },
  // Define o estilo do texto que exibe a orientação médica
  orientacao: {
    fontSize: 14, // Tamanho da fonte do texto da orientação
    textAlign: 'center', // Centraliza o texto da orientação
    color: 'pink', // Cor do texto da orientação
    fontWeight: 'bold', // Peso da fonte do texto da orientação (negrito)
    marginBottom: 3, // Margem inferior do texto da orientação
  },
  // Define o estilo base dos botões
  button: {
    padding: 16, // Preenchimento interno dos botões
    borderRadius: 5, // Raio das bordas arredondadas dos botões
    marginBottom: 3, // Margem inferior dos botões
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro dos botões
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo específico do botão "Calcular"
  calcularButton: {
    backgroundColor: '#32CD32', // Cor de fundo do botão "Calcular"
  },
  // Define o estilo específico do botão "Nova Pesquisa"
  novaPesquisaButton: {
    backgroundColor: '#90EE90', // Cor de fundo do botão "Nova Pesquisa"
    borderColor: 'black', // Cor da borda dos campos de entrada
    borderWidth: 1, // Largura da borda dos campos de entrada
  },
  // Define o estilo do texto dentro dos botões
  buttonText: {
    color: 'green', // Cor do texto dos botões
    fontSize: 18, // Tamanho da fonte do texto dos botões
    fontWeight: 'bold', // Peso da fonte do texto dos botões (negrito)
  },
});

export default App;
