import React from 'react'
import {View, TextInput, Button, StyleSheet, Alert, Text, FlatList } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {
    render() {
        return (
            <View style = {styles.main_container}>
                <TextInput style = {styles.textinput} placeholder='Titre du film'/>
                <Button
                    title="Rechercher"
                    onPress={() => Alert.alert('Bouton *Rechercher* appuyé')}
                    // onPress={() => {}} : Simplification de la fonction : onPress={function() {}}
                />
                <FlatList
                    style = {styles.flat_list}
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // flexDirection: 'row',
        marginTop: 25,
        // height: 50,
        // justifyContent: 'space-between', // center, flex-start, flex-end, space-between, space-around, space-evenly
        // alignItems: 'stretch', // center, flex-start, flex-end, stretch
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    flat_list: {
        flex: 1,
        margin: 5,
        paddingLeft: 5,
    },
});

export default Search
