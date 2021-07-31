import React, { Component, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const dateTimePicker = props => {
  
      return (
        <View style={styles.container}>
          <TextInput
            keyboardType="number-pad"
            style={{
              textAlign: 'center',
              width: 300,
              backgroundColor: 'white',
              padding: 10,
              marginBottom: 30,
              borderWidth: 1,
              borderColor: 'black',
              paddingHorizontal: 30,
            }}
            maxLength={10}
            placeholder="DD/MM/YYYY"
            onChangeText={props.dateTimeInputChangeHandler}
            
            value={props.value}
            
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 5,
  },
});
export default dateTimePicker;

