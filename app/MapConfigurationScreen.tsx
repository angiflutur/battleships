import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Ship {
  x: string;
  y: number;
  size: number;
  direction: string;
}

interface MapConfigurationScreenProps {
  route: any;
  navigation: any;
}

const MapConfigurationScreen: React.FC<MapConfigurationScreenProps> = ({ route, navigation }) => {
  const { gameId, accessToken } = route.params;
  const [ships, setShips] = useState<Ship[]>([{ x: 'A', y: 1, size: 2, direction: 'HORIZONTAL' }]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSendConfiguration = async () => {
    try {
      const response = await fetch(`http://163.172.177.98:8081/game/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ships }),
      });
      console.log(response);
      if (!response.ok) {
        alert('Failed to send map configuration');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send map configuration');
    }
  };

  const handleAddShip = () => {
    setShips([...ships, { x: 'A', y: 1, size: 2, direction: 'HORIZONTAL' }]);
  };

  const xOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const yOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sizeOptions = [2, 3, 4, 6];
  const directionOptions = ['HORIZONTAL', 'VERTICAL'];

  const renderTable = () => {
    const table = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const cellId = String.fromCharCode(65 + j) + (i + 1);
        const shipInCell = ships.some(ship => {
          if (ship.direction === 'HORIZONTAL') {
            return (
              cellId[0] >= ship.x &&
              cellId[0] < String.fromCharCode(ship.x.charCodeAt(0) + ship.size) &&
              parseInt(cellId.slice(1)) === ship.y
            );
          } else {
            return (
              parseInt(cellId.slice(1)) >= ship.y &&
              parseInt(cellId.slice(1)) < ship.y + ship.size &&
              cellId[0] === ship.x
            );
          }
        });
        row.push(
          <View
            key={cellId}
            style={[styles.cell, shipInCell ? styles.shipCell : null]}
          >
            <Text style={styles.cellText}>{cellId}</Text>
          </View>
        );
      }
      table.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return table;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Map Configuration</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {renderTable()}
      {ships.map((ship, index) => (
        <View key={index} style={styles.shipContainer}>
          <Text style={styles.label}>Ship {index + 1}:</Text>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>X:</Text>
            <Picker
              selectedValue={ship.x}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newShips = [...ships];
                newShips[index].x = itemValue;
                setShips(newShips);
              }}
            >
              {xOptions.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Y:</Text>
            <Picker
              selectedValue={ship.y}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newShips = [...ships];
                newShips[index].y = itemValue;
                setShips(newShips);
              }}
            >
              {yOptions.map(option => (
                <Picker.Item key={option.toString()} label={option.toString()} value={option} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Size:</Text>
            <Picker
              selectedValue={ship.size}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newShips = [...ships];
                newShips[index].size = itemValue;
                setShips(newShips);
              }}
            >
              {sizeOptions.map(option => (
                <Picker.Item key={option.toString()} label={option.toString()} value={option} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Direction:</Text>
            <Picker
              selectedValue={ship.direction}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const newShips = [...ships];
                newShips[index].direction = itemValue;
                setShips(newShips);
              }}
            >
              {directionOptions.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>
      ))}
      <Button title="Add Ship" onPress={handleAddShip} />
      <Button title="Send Configuration" onPress={handleSendConfiguration} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipCell: {
    backgroundColor: 'lightblue',
  },
  cellText: {
    fontSize: 12,
  },
  shipContainer: {
    width: '70%',
  },
  label: {
    fontSize: 18,
    marginTop:5, 
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pickerLabel: {
    width: 70,
    fontSize: 15,
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default MapConfigurationScreen;
