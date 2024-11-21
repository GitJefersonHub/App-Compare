import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';


const App: React.FC = () => {
  const [gasolina, setGasolina] = useState<string>('');
  const [alcool, setAlcool] = useState<string>('');
  const [consumoGasolina, setConsumoGasolina] = useState<string>('');
  const [consumoAlcool, setConsumoAlcool] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [mostrarConsumo, setMostrarConsumo] = useState<boolean>(false);

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
      setResultado(`*ÁLCOOL* ${kmExtra} km a mais por litro.`);
    } else {
      const kmExtra = ((kmPorLitroGasolina * precoAlcool) / precoGasolina - kmPorLitroAlcool).toFixed(2);
      setResultado(`*GASOLINA* ${kmExtra} km a mais por litro.`);
    }
  };

  const novaPesquisa = () => {
    setGasolina('');
    setAlcool('');
    setConsumoGasolina('');
    setConsumoAlcool('');
    setResultado('');
    setMostrarConsumo(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Combustível Inteligente</Text>
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
      <TouchableOpacity style={[styles.button, styles.calcularButton]} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {resultado ? (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{resultado}</Text>
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
  container: {
    backgroundColor: '#F5F5DC',
    flex: 1,
    justifyContent: 'center',
    padding: 3,
  },
  title: {
    backgroundColor: '#F0F8FF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 3,
  },
  input: {
    backgroundColor: '#FFFACD', // input preços
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    paddingHorizontal: 8,
    borderRadius: 5, // Adiciona bordas arredondadas aos campos de input
  },
  resultContainer: {
    backgroundColor: '#FF0000', // Tarja laranja
    paddingTop: 3,
    borderRadius: 5,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  result: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white', // Letras brancas
    fontWeight: 'bold', // Fonte em negrito
  },
  buttonSpacing: {
    marginTop: 3,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginBottom: 3,
    alignItems: 'center',
  },
  calcularButton: {
    backgroundColor: '#32CD32', // Botão Calcular verde 
  },
  novaPesquisaButton: {
    backgroundColor: '#90EE90', // Botão Nova Pesquisa verde 
    
  },
  inserirConsumoButton: {
    backgroundColor: '#87CEEB', // Botão Inserir Consumo Médio azul
  },
  buttonText: {
    color: 'green', // Fontes calc/nova/inser
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
