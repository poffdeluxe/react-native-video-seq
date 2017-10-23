import React from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';

class VideoSeq extends React.Component {
  constructor(props) {
    super(props);

    this.onEnd = this.onEnd.bind(this);

    this.state = {
      curVidIndex: 0,
    };
  }

  onEnd(event) {
    // Call user defined onEnd func if it exists
    if (this.props.onEnd) {
      this.props.onEnd(event);
    }

    // Switch to the next video in the sequence
    let curVidIndex = this.state.curVidIndex + 1;
    if(curVidIndex == this.props.videos.length) {
      // Reset to first vid if repeat is on
      curVidIndex = this.props.repeat ? 0 : this.state.curVidIndex;
    }

    this.setState({curVidIndex});
  }

  render() {
    const curVid = this.props.videos[this.state.curVidIndex];

    const { source, repeat, onEnd, ...passThroughProps } = this.props;
    passThroughProps.onEnd = this.onEnd;

    return (
      <Video source={curVid} {...passThroughProps} />
    )
  }
}

VideoSeq.propTypes = {
  videos: PropTypes.array.isRequired,
  ...Video.propTypes
};

export default VideoSeq;
