import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { StackNavigator, TabNavigator, NavigationActions, withNavigation } from 'react-navigation'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase';
//const auth = getAuth();

class LoginScreen extends Component {
	
//given Google code
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser, navigate) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
		  //this.props.navigation.navigate('DashboardScreen');
		  const navigateAction = NavigationActions.navigate({
        routeName: 'ResultScreen',
        //params: { user: user.givenName }
      })

      this.props.navigation.dispatch(navigateAction);
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
	  //behavior: 'web',
      androidClientId: '395982681356-cqlri7eohhjokj39afp33d4m29s5n5g9.apps.googleusercontent.com',
      iosClientId: '395982681356-2uu6jtsb5si36a9nfqv011hl17j9ch8d.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
	  this.onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
	render() {
		return (
			<View style={styles.container}>
			<ImageBackground
				source={require('../assets/food.jpg')}
				blurRadius={0.4}
				style={styles.bgImg}
			>
				<Button
					title = "Sign In With Google"
					onPress={() => this.signInWithGoogleAsync()}		
				/>
			</ImageBackground>
			</View>
		);
	}
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	bgImg: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 100
	}
});