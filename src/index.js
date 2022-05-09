import React from 'react';
import ReactDOM from 'react-dom';
import SeasonsDisplay from './SeasonsDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message }),
        );
    }

    renderContent() {
        //Check to see if the errorMesssage exists or the latitude was not provided (likely due to geopermissions denied).
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonsDisplay lat={this.state.lat} />
        }
        //While user is still trying to pick permissions.
        return <Spinner message="Please accept location request." />;
    }

    render() {
        return (
            <div>
                {this.renderContent()};
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);  