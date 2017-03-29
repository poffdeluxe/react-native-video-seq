import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VideoSeq from 'react-native-video-seq';

const bgVids = [
  require('./vids/390214194mp4.mp4'),
  require('./vids/askyfullofstarsmp4.mp4'),
  require('./vids/discoverypartIIjonathanmitchellmp4.mp4')
]

export default class App extends React.Component {
  onEnd() {
    console.log('A vid has ended!');
  }

  render() {
    return (
      <View style={styles.container}>
        <VideoSeq
          videos={bgVids}
          resizeMode="cover"
          repeat={true}
          onEnd={() => this.onEnd()}
          style={styles.backgroundVideo}
        />
        <View style={styles.foreground}>
          <Text>This example plays several videos on loop</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  },
  foreground: {
    backgroundColor: 'transparent'
  }
});
