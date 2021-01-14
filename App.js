import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundcolor = '#121115';
const headercolor = '#198fef';
const textcolor = '#fcfcfc';
const {width, height} = Dimensions.get('screen');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tictactoe: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      player: 1,
      namescreen: true,
      player1: '',
      player2: '',
      player1win: 0,
      player2win: 0,
    };
  }

  // inital state--------------------------------------------
  start = () => {
    this.setState({
      tictactoe: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      player: 1,
      namescreen: false,
    });
  };

  // show icon-----------------------------------------------------
  showicon = (row, col) => {
    var value = this.state.tictactoe[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.closeicon} />;
      case -1:
        return <Icon name="circle-outline" style={styles.circleicon} />;
      default:
        return <View />;
    }
  };

  // touchbox-------------------------------------------------------
  touchbox = (row, col) => {
    // no over write
    var value = this.state.tictactoe[row][col];
    if (value !== 0) {
      return;
    }
    // player1
    var player1 = this.state.player;
    var data = this.state.tictactoe.slice();
    data[row][col] = player1;
    this.setState({tictactoe: data});
    // player2
    var player2 = player1 == 1 ? -1 : 1;
    this.setState({player: player2});
    // winner
    var winner = this.getwinner();
    if (winner == 1) {
      ToastAndroid.showWithGravity(
        `${this.state.player1} win the match !!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      setTimeout(() => {
        this.setState({player1win: this.state.player1win + 1});
        this.start();
      }, 500);
    } else if (winner == -1) {
      ToastAndroid.showWithGravity(
        `${this.state.player2} win the match !!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      setTimeout(() => {
        this.setState({player2win: this.state.player2win + 1});
        this.start();
      }, 500);
    }
  };

  // get winner-------------------------------------------------------------------------------------
  getwinner = () => {
    var data = this.state.tictactoe;
    var add;
    // check row
    for (var i = 0; i < 3; i++) {
      add = data[i][0] + data[i][1] + data[i][2];
      if (add == 3) {
        return 1;
      } else if (add == -3) {
        return -1;
      }
    }
    // check column
    for (var i = 0; i < 3; i++) {
      add = data[0][i] + data[1][i] + data[2][i];
      if (add == 3) {
        return 1;
      } else if (add == -3) {
        return -1;
      }
    }
    // check cross
    add = data[0][0] + data[1][1] + data[2][2];
    if (add == 3) {
      return 1;
    } else if (add == -3) {
      return -1;
    }
    add = data[2][0] + data[1][1] + data[0][2];
    if (add == 3) {
      return 1;
    } else if (add == -3) {
      return -1;
    }
    return 0;
  };

  render() {
    if (this.state.namescreen == true) {
      return (
        <View style={styles.container}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.headertext}>Tic Tac Toe</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <Text style={styles.upper}>
              Enter the name of Player1 and Player2
            </Text>
            {/* main content */}
            <View>
              {/* player 1 */}
              <View
                style={{marginTop: (height * 5) / 100, alignItems: 'center'}}>
                <TextInput
                  placeholder="Enter Player 1 Name"
                  placeholderTextColor={headercolor}
                  value={this.state.player1}
                  onChangeText={(text) => this.setState({player1: text})}
                  style={styles.textinput}
                />
              </View>
              {/* player 2 */}
              <View
                style={{marginTop: (height * 5) / 100, alignItems: 'center'}}>
                <TextInput
                  placeholder="Enter Player 2 Name"
                  placeholderTextColor={headercolor}
                  value={this.state.player2}
                  onChangeText={(text) => this.setState({player2: text})}
                  style={styles.textinput}
                />
              </View>
              {/* start game */}
              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => {
                  if (this.state.player1 == '' || this.state.player2 == '') {
                    ToastAndroid.showWithGravity(
                      `Names are require to play`,
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                    );
                  } else {
                    this.start();
                  }
                }}
                style={[styles.reset, {marginBottom: 0}]}>
                <Text style={styles.resettext}>Play</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headertext}>Tic Tac Toe</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* borad */}
          <View style={styles.notice}>
            {/* player1box */}
            <View>
              <View style={[styles.winnerbox, {borderBottomWidth: 0}]}>
                <Text style={styles.winnerboxtext}>{this.state.player1}</Text>
              </View>
              <View style={styles.winnerbox}>
                <Text style={styles.winnerboxtext}>
                  {this.state.player1win}
                </Text>
              </View>
            </View>
            {/* player2box */}
            <View>
              <View style={[styles.winnerbox, {borderBottomWidth: 0}]}>
                <Text style={styles.winnerboxtext}>{this.state.player2}</Text>
              </View>
              <View style={styles.winnerbox}>
                <Text style={styles.winnerboxtext}>
                  {this.state.player2win}
                </Text>
              </View>
            </View>
          </View>
          {/* main content */}
          <View style={styles.main}>
            {/* 1st row */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(0, 0)}
                style={[styles.box, {borderLeftWidth: 0, borderTopWidth: 0}]}>
                {this.showicon(0, 0)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(0, 1)}
                style={[styles.box, {borderTopWidth: 0}]}>
                {this.showicon(0, 1)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(0, 2)}
                style={[styles.box, {borderRightWidth: 0, borderTopWidth: 0}]}>
                {this.showicon(0, 2)}
              </TouchableOpacity>
            </View>

            {/* 2nd row */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(1, 0)}
                style={[styles.box, {borderLeftWidth: 0}]}>
                {this.showicon(1, 0)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(1, 1)}
                style={styles.box}>
                {this.showicon(1, 1)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(1, 2)}
                style={[styles.box, {borderRightWidth: 0}]}>
                {this.showicon(1, 2)}
              </TouchableOpacity>
            </View>

            {/* 3rd row */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(2, 0)}
                style={[
                  styles.box,
                  {borderLeftWidth: 0, borderBottomWidth: 0},
                ]}>
                {this.showicon(2, 0)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(2, 1)}
                style={[styles.box, {borderBottomWidth: 0}]}>
                {this.showicon(2, 1)}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={() => this.touchbox(2, 2)}
                style={[
                  styles.box,
                  {borderRightWidth: 0, borderBottomWidth: 0},
                ]}>
                {this.showicon(2, 2)}
              </TouchableOpacity>
            </View>

            {/* reset game */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => this.start()}
              style={styles.reset}>
              <Text style={styles.resettext}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// styling---------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundcolor,
  },
  header: {
    height: (height * 8) / 100,
    backgroundColor: headercolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: (width * 5) / 100,
    color: textcolor,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  upper: {
    marginTop: (height * 5) / 100,
    fontSize: (width * 3) / 100,
    color: textcolor,
    letterSpacing: 2,
    textAlign: 'center',
  },
  textinput: {
    width: (width * 90) / 100,
    height: (height * 6) / 100,
    backgroundColor: 'white',
    borderRadius: (width * 5) / 100,
    color: 'black',
    paddingLeft: (width * 4) / 100,
    fontSize: (width * 3) / 100,
  },
  notice: {
    alignItems: 'center',
    marginTop: (height * 5) / 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  winnerbox: {
    width: (width * 30) / 100,
    height: (height * 5) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: headercolor,
    borderColor: textcolor,
  },
  winnerboxtext: {
    fontSize: (width * 3) / 100,
    textAlign: 'center',
    color: textcolor,
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    marginTop: (height * 5) / 100,
    alignItems: 'center',
  },
  box: {
    width: (width * 25) / 100,
    height: (width * 25) / 100,
    borderWidth: 2,
    borderColor: textcolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reset: {
    marginTop: (height * 5) / 100,
    marginBottom: (height * 5) / 100,
    padding: (width * 5) / 100,
    width: (width * 40) / 100,
    alignSelf: 'center',
    borderRadius: (width * 5) / 100,
    backgroundColor: headercolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resettext: {
    fontSize: (width * 3.5) / 100,
    color: textcolor,
    textAlign: 'center',
    letterSpacing: 1,
  },
  closeicon: {
    color: 'red',
    fontSize: (width * 15) / 100,
  },
  circleicon: {
    color: 'green',
    fontSize: (width * 15) / 100,
  },
});
