import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const App: React.FC = () => {
  const [gasolina, setGasolina] = useState<string>('');
  const [alcool, setAlcool] = useState<string>('');
  const [consumoGasolina, setConsumoGasolina] = useState<string>('');
  const [consumoAlcool, setConsumoAlcool] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [mostrarConsumo, setMostrarConsumo] = useState<boolean>(false);

  const calcular = () => {
    if (!gasolina || !alcool) {
      Alert.alert('Erro', 'Por favor, insira os preços da gasolina e do álcool ou calcule a média de veiculos populares.');
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
      setResultado(`Abastecendo com álcool. O veiculo rodará ${kmExtra} km a mais por litro.`);
    } else {
      const kmExtra = ((kmPorLitroGasolina * precoAlcool) / precoGasolina - kmPorLitroAlcool).toFixed(2);
      setResultado(`Abastecendo com gasolina. O veiculo rodará ${kmExtra} km a mais por litro.`);
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
      <Text style={styles.title}>Calculadora de Combustível</Text>
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
      <Button title="Calcular" onPress={calcular} />
      {resultado ? (
        <View>
          <Text style={styles.result}>{resultado}</Text>
          <Button title="Nova Pesquisa" onPress={novaPesquisa} />
        </View>
      ) : null}
      <Button title="Inserir Consumo Médio" onPress={() => setMostrarConsumo(true)} />
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
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
