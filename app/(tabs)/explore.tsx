import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const App: React.FC = () => {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [pesoIdeal, setPesoIdeal] = useState<string>('');

  const calcularIMC = () => {
    if (!peso || !altura) {
      Alert.alert('Erro', 'Por favor, insira seu peso e altura.');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura) / 100; // Convertendo altura para metros

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      classificacao = 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      classificacao = 'Sobrepeso';
    } else {
      classificacao = 'Obesidade';
    }

    const pesoIdealMin = (18.5 * alturaNum * alturaNum).toFixed(2);
    const pesoIdealMax = (24.9 * alturaNum * alturaNum).toFixed(2);

    setResultado(`IMC ${imc.toFixed(2)}. Classificação: ${classificacao}.`);
    setPesoIdeal(`Peso ideal está entre ${pesoIdealMin} kg e ${pesoIdealMax} kg.`);
  };

  const novaPesquisa = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setPesoIdeal('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
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
      <TouchableOpacity style={[styles.button, styles.calcularButton]} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {resultado ? (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{resultado}</Text>
          <Text style={styles.pesoIdeal}>{pesoIdeal}</Text>
          <TouchableOpacity style={[styles.button, styles.novaPesquisaButton]} onPress={novaPesquisa}>
            <Text style={styles.buttonText}>Nova Pesquisa</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5DC',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    backgroundColor: '#F0F8FF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFACD',
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  resultContainer: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  result: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pesoIdeal: {
    fontSize: 14,
    textAlign: 'center',
    color: 'yellow',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  calcularButton: {
    backgroundColor: '#32CD32',
  },
  novaPesquisaButton: {
    backgroundColor: '#90EE90',
  },
  buttonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
