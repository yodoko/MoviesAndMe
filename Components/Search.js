import React from 'react'
import {View, TextInput, Button, StyleSheet, Alert, Text, FlatList } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            films: []
        }
        // Ici on va créer les propriétés de notre component custom Search
    }

    _loadFilms() {
        console.log(this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ films: data.results })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        // console.log("RENDER")
        return (
            <View style = {styles.main_container}>
                <TextInput
                    style = {styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button
                    title="Rechercher"
                    onPress={() => this._loadFilms()}
                    // onPress={() => {}} : Simplification de la fonction : onPress={function() {}}
                />
                <FlatList
                    style = {styles.flat_list}
                    data={this.state.films}
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
