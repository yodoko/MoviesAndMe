import React from 'react'
import {View, TextInput, Button, StyleSheet, Alert, Text, FlatList, ActivityIndicator } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: true
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],
                    //films: this.state.films.concat(data.results) fait la même chose
                    isLoading: false // Fin du chargement
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
                this._loadFilms()
            })
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <TextInput
                    style = {styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={ (text) => this._searchTextInputChanged(text) }
                    onSubmitEditing={ () => this._searchFilms() }
                />
                <Button
                    title="Rechercher"
                    onPress={() => this._searchFilms()}
                    // onPress={() => {}} : Simplification de la fonction : onPress={function() {}}
                />
                <FlatList
                    style = {styles.flat_list}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                { this._displayLoading() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // flexDirection: 'row',
        marginTop: 25,
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
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Search
