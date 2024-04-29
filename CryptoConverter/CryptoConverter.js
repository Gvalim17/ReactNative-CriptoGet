import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal } from 'react-native';
import axios from 'axios';

const CryptoConverter = () => {
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoValue, setCryptoValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCryptoValue = async () => {
    try {
      const response = await axios.get('http://192.168.15.11:3000/data');
      const cryptoData = response.data
  
      const selectedCrypto = cryptoData.find(crypto => crypto.name.toLowerCase() === cryptoName.toLowerCase());
  
      if (selectedCrypto) {
        setCryptoValue(`$${selectedCrypto.priceUsd}`);
        setModalVisible(true);
      } else {
        Alert.alert('Erro', 'Criptomoeda não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da criptomoeda', error);
      Alert.alert('Erro', 'Erro ao buscar dados da criptomoeda');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Insira o nome da criptomoeda:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10, marginBottom: 10 }}
        onChangeText={text => setCryptoName(text)}
        value={cryptoName}
      />
      <Button title="Buscar Valor em USD" onPress={fetchCryptoValue} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18 }}>Valor em USD: {cryptoValue}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CryptoConverter;
