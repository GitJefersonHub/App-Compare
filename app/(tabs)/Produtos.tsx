import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [quantidades, setQuantidades] = useState<number[]>(Array(20).fill(0));

  const produtos = [
    { nome: 'Arroz', preco: 5.50 },
    { nome: 'Feijão', preco: 4.30 },
    { nome: 'Óleo', preco: 6.20 },
    { nome: 'Alho', preco: 2.10 },
    { nome: 'Sal', preco: 1.00 },
    { nome: 'Macarrão', preco: 3.75 },
    { nome: 'Extrato', preco: 3.40 },
    { nome: 'Açúcar', preco: 2.50 },
    { nome: 'Café', preco: 8.90 },
    { nome: 'Leite', preco: 4.60 },
    { nome: 'Pão', preco: 3.20 },
    { nome: 'Manteiga', preco: 7.80 },
    { nome: 'Sabão pó', preco: 10.50 },
    { nome: 'Sabonete', preco: 9.30 },
    { nome: 'Pasta', preco: 12.40 },
    { nome: 'Shampoo', preco: 15.70 },
    { nome: 'Carnes', preco: 14.90 },
    { nome: 'Ovos', preco: 5.60 },
    { nome: 'Queijo', preco: 11.50 },
    { nome: 'Presunto', preco: 9.80 },
  ];

  const atualizarQuantidade = (index: number, novaQuantidade: number) => {
    const diferenca = novaQuantidade - quantidades[index];
    const novoTotal = total + diferenca * produtos[index].preco;
    const novasQuantidades = [...quantidades];
    novasQuantidades[index] = novaQuantidade;

    setQuantidades(novasQuantidades);
    setQuantidade(quantidade + diferenca);
    setTotal(novoTotal);
  };

  const incrementarQuantidade = (index: number) => {
    atualizarQuantidade(index, quantidades[index] + 1);
  };

  const decrementarQuantidade = (index: number) => {
    if (quantidades[index] > 0) {
      atualizarQuantidade(index, quantidades[index] - 1);
    }
  };

  const resetar = () => {
    setQuantidades(Array(20).fill(0));
    setQuantidade(0);
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itensContainer}>
        {produtos.map((produto, index) => (
          <View key={index} style={styles.item}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantidades[index].toString()}
              onChangeText={(text) => {
                const novaQuantidade = parseInt(text) || 0;
                atualizarQuantidade(index, novaQuantidade);
              }}
            />
            <Text style={styles.itemText}>{produto.nome}</Text>
            <View style={styles.quantidadeContainer}>
              <TouchableOpacity onPress={() => decrementarQuantidade(index)}>
                <Text style={styles.quantidadeButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.precoText}>R$ {produto.preco.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => incrementarQuantidade(index)}>
                <Text style={styles.quantidadeButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.resultadoContainer}>
        <View style={styles.resultadoItem}>
          <Text style={styles.resultadoText}>Quantidade</Text>
          <Text style={styles.resultadoValor}>{quantidade}</Text>
        </View>
        <View style={styles.resultadoItem}>
          <Text style={styles.resultadoText}>Valor Total</Text>
          <Text style={styles.resultadoValor}>R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={[styles.resultadoButton, styles.resetarButton]} onPress={resetar}>
          <Text style={styles.resultadoButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estiliza os componentes itens/resultados
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    padding: 3,
  },

  // Estiliza o fundo do compartimento itens
  itensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },

  // Estiliza o botão input
  item: {
    backgroundColor: '#32CD32',
    padding: 2,
    borderRadius: 5,
    margin: 1,
    width: '24%',
    alignItems: 'center',
  },

  // Estiliza botão input
  input: {
    backgroundColor: '#FFF',
    fontSize: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 2,
    paddingHorizontal: 0,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },

  //Estiliza o nome do produto.
  itemText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 0,
  },

  //Estiliza o preço/mais/menos
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
  },

  //Estiliza os botões de mais e menos.
  quantidadeButton: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 6,
  },

  //Estiliza o preço do produto.
  precoText: {
    fontSize: 10,
    color: 'yellow',
    marginHorizontal: 0,
  },

  // Estiliza o compartimento resultado
  resultadoContainer: {
    marginTop: 3,
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    borderRadius: 5,
  },

  // Estiliza espaço Quant/valor
  resultadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 3,
  },

  // Estiliza font Quant/valor
  resultadoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Estiliza num Quant/valor
  resultadoValor: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Estiliza o botão reset
  resultadoButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 3,
    width: '80%',
    alignItems: 'center',
  },

  // Estiliza o botão reset
  resetarButton: {
    backgroundColor: '#FF4500',
  },

  // Estiliza o botão reset
  resultadoButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default App;
