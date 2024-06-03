import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function RadioButton({selected, setSelected, label}) {

  return (
    <TouchableOpacity
        onPress={() => setSelected(selected)}
        style={{flexDirection: 'row', marginBottom: 15}}
    >
    <View
      style={{
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#013236',
        alignItems: 'center',
        justifyContent: 'center',

      }}
        >
      {selected ? (
        <View
          style={{
            height: 9,
            width: 9,
            borderRadius: 6,
            backgroundColor: '#013236',
          }}
        />
      ) : null}
      </View>
      <Text style={{marginLeft: 5, fontSize: 18, color: '#013236'}}>{label}</Text>
    </TouchableOpacity>
  );
}
