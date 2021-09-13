import React, { Component } from 'react';
import {Fragment} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getFoods, addFood } from '../savedatabase/savedatabase';
import { ListItem, Divider } from 'react-native-elements';
//import ActionButton from 'react-native-action-button';

class FoodList extends Component {
  state = {
    foodList: []
  }

  onFoodAdded = (food) => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food]
    }));
    //this.props.navigation.popToTop();
  }

  onFoodsReceived = (foodList) => {
    console.log(foodList)
    this.setState(prevState => ({
      foodList: prevState.foodList = foodList
    }));
  }

  componentDidMount() {
    const data2 = this.props.navigation.getParam("data3");
    const data3 = this.props.navigation.getParam("data4");
    const data4 = this.props.navigation.getParam("data5");
    getFoods(this.onFoodsReceived);
    addFood({
        name: data2,
        ingredients: data3,
        calories: data4
    }, this.onFoodAdded
    )
  }

  render() {
    console.log(this.state.foodList);
    return this.state.foodList.length > 0 ?
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          //keyExtractor={(item, index) => index.toString()}
        //   renderItem={({ item, index }) => {
            renderItem={({item}) =>
            <Fragment>
                <Text style={styles.item}>Food Description: {item.name}</Text>
                <Text style={styles.item}>Food Ingredients: {item.ingredients}</Text>
                <Text style={styles.item}>Calories: {item.calories} kCal</Text>
            </Fragment>
            //console.log("*******************");
            //console.log(item);
            //this.state.currentFoodItem= item;
            // return (
            //   <ListItem
            //     containerStyle={styles.listItem}
            //     title={item.name}
            //     subtitle={`Ingredients: ${item.ingredients}     Calories: ${item.calories}`}
            //     titleStyle={styles.titleStyle}
            //     subtitleStyle={styles.subtitleStyle}
            //     leftAvatar={{
            //       size: 'large',
            //       rounded: false,
            //       //source: item.image && { uri: item.image }
            //     }}
            //   />
            // );
          }
        
        />
        <Button  
          title="Go to Scan Again"  
          onPress={() => this.props.navigation.navigate('DashBoardScreen')}  
        />
      </SafeAreaView>: 
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Foods found</Text>
        <Text style={styles.emptySubtitle}>Add a new food by scanning or entering food in previous screen</Text>
      </View>
      
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default FoodList;