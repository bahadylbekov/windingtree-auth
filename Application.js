import React from 'react';
import { Block } from './components';
import { createRootNavigator } from "./router/router";
import {connect} from 'react-redux';
import { isSessionExists } from './store/actions/login';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.isSessionExists()
    console.log(this.props.login.signedIn)
  }

  render() {
    const { signedIn, checkedSignIn } = this.props.login;

    if (!checkedSignIn) {
      return null
    }

    const Navigation = createRootNavigator(signedIn);
    return (
        <Block white>
          <Navigation 
            signedIn={signedIn} 
            handleChange={this.handleChange}
          />
        </Block>
    )
  }
}


function mapStateToProps (state) {
  return {
    login: state.login,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    isSessionExists: () => dispatch(isSessionExists()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)