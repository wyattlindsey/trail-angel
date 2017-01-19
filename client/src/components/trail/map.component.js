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
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';


var { height, width} = Dimensions.get('window');

var conditions = {
  'partly-cloudy-night': 'weather-partlycloudy',
  'partly-cloudy-day': 'weather-partlycloudy',
  'rain': 'weather-rainy',
  'clear-day': 'weather-sunny',
  'clear-night': 'weather-sunny',
  'cloudy': 'weather-cloudy',
  'snow': 'weather-snowy',
  'windy': 'weather-windy'
};

function dayConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours() > 12 ? (a.getHours() - 12) : a.getHours();
  var min = a.getMinutes() < 10 ? ('0' + a.getMinutes()) : a.getMinutes();
  var ap = a.getHours() < 12 ? 'AM' : 'PM';
  var time = hour + ':' + min + ' ' + ap;
  return time;
}



const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tempInfo: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  weather: {
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    padding: 2
  },
  tempTitle: {
    padding: 10
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
    dataApi.weather(this.props.geometry.location.lat,
                    this.props.geometry.location.lng)
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
       coordinate: {latitude: this.props.geometry.location.lat,
                    longitude: this.props.geometry.location.lng},
      title: this.props.name,
      image: require('../icons/trekking-128.png')
    };
    let region = {
      latitude: this.props.geometry.location.lat,
      longitude: this.props.geometry.location.lng,
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
          />
        </MapView.Animated>
        <View style={styles.tempInfo} >
          <Text style={styles.tempTitle}> Current Conditions </Text>
          { !!(this.state.weather.currently) ?
            <View>
              <Text style={styles.weather}>
                <WeatherIcon name={conditions[this.state.weather.currently.icon]} size={40} style={{}}/>
              </Text>
              <Text style={styles.text}>
                {this.state.weather.currently.summary}
              </Text>
              <Text style={styles.text}>
                Temperature: {Math.floor(this.state.weather.currently.temperature)} &#x2109;
              </Text>
              <Text style={styles.text}>
                <WeatherIcon name='weather-sunset-up' size={25} /> {timeConverter(this.state.weather.daily.data[0].sunriseTime)}
              </Text>
              <Text style={styles.text}>
                <WeatherIcon name='weather-sunset' size={25} /> {timeConverter(this.state.weather.daily.data[0].sunsetTime)}
              </Text>
            </View>
            : null}
        </View>
      </View>
    )
  }
}