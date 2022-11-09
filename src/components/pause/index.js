import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

import style from './index.less';

export default class Pause extends React.Component {
  constructor() {
    super();
    this.state = {
      showPause: false,
    };
  }
  componentDidMount() {
    this.setShake(this.props.data);
  }
  componentWillReceiveProps({ data }) {
    this.setShake(data);
  }
  shouldComponentUpdate({ data }) {
    if (data) {
      return true;
    }
    return data !== this.props.data;
  }
  setShake(bool) {
    if (bool && !Pause.timeout) {
      Pause.timeout = setInterval(() => {
        this.setState({
          showPause: !this.state.showPause,
        });
      }, 250);
    }
    if (!bool && Pause.timeout) {
      clearInterval(Pause.timeout);
      this.setState({
        showPause: false,
      });
      Pause.timeout = null;
    }
  }
  render() {
    return (
      <div
        className={cn(
          {
            bg: true,
            [style.pause]: true,
            [style.c]: this.state.showPause,
          }
        )}
      />
    );
  }
}

Pause.statics = {
  timeout: null,
};

Pause.propTypes = {
  data: propTypes.bool.isRequired,
};

Pause.defaultProps = {
  data: false,
};
