/**
 * Sample React Native ChatScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import socketService from '../services/socket_services';
import debugLogs from '../utils/debugLogs';

const ChatScreen = () => {
  const [_msg, _setMsg] = useState('');
  const [_data, _setData] = useState([]);

  const _sendMsg = () => {
    try {
      if (!!_msg) {
        socketService.emit('send_to', _msg);
        _setMsg('');
      }
    } catch (error) {
      debugLogs('error emitting message', error);
    }
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        socketService.on('receive_from', _val => {
          let _tmpArray = [..._data];
          _setData(_tmpArray.concat(_val));
        });
      }, 1000);
    } catch (error) {
      debugLogs('error listening message', error);
    }
  }, [_data]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'blue'} />
      <View>
        <View style={styles.inputWrChatScreener}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => _setMsg(text)}
            value={_msg}
            placeholder={'Enter message'}
          />
          <Button title="Send" onPress={_sendMsg} style={styles.btnStyle} />
        </View>
      </View>
      <View>
        <FlatList
          data={_data}
          style={styles.listStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <Text style={{marginVertical: 5}}>{item}</Text>;
          }}
          keyExtractor={(_, index) => `msg${index}`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
    flex: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  btnStyle: {
    flex: 0.2,
  },
  inputWrChatScreener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listStyle: {marginHorizontal: 20},
});

export default ChatScreen;
