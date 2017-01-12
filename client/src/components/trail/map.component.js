import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import dataApi from '../../api';
import Icon from 'react-native-vector-icons/FontAwesome';


var { height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  map: {
    width: width,
    height: height*0.60
  },
  pin: {
    backgroundColor: '#fffa',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10
  },
  pinImage: {
    width: 25,
    height: 25
  },
  pinText: {
    color: 'green'
  }
});

export default class TrailMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {}
    }
    // this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    let that = this;
    dataApi.weather(this.props.location.coordinate.latitude, this.props.location.coordinate.longitude)
     .then( (res) => {
        that.setState({ weather: res });
     });
  }

  // onRegionChange(region) {
  //   this.setState( {region} );
  // }

  displayTemp() {
    if(this.state.weather.currently === undefined) {
      return <Text />;
    } else {
      return <Text> {this.state.weather.currently.temperature} </Text>
    }
  }

  render() {
    let marker = {
      coordinate: this.props.location.coordinate,
      title: this.props.name,
      image: require('../icons/trekking-128.png')
    };
    let region = {
      latitude: this.props.location.coordinate.latitude,
      longitude: this.props.location.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    return (
      <View style={styles.rowContainer}>
        <MapView.Animated
          style={styles.map}
          region={region}
          onRegionChange={this.onRegionChange}
        >
          <MapView.Callout />
          <MapView.Marker
            style={styles.pinImage}
            coordinate={marker.coordinate}
            title={marker.title}
            image={marker.image}
          />
        </MapView.Animated>
        <View style={styles.rowContainer} >
          <Text> Current Conditions </Text>
          { !!(this.state.weather.currently) ?
            <View>
              <Icon name='map' size={50} color='darkgreen' />
              <Text>
                Temperature: {this.state.weather.currently.temperature}
              </Text>
            </View>
          : null}
        </View>
      </View>
    )
  }
}

