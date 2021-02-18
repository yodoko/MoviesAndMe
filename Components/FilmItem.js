
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.view_content}>
                    <View style={styles.view_header}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_note}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.view_description}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.view_date}>
                        <Text>Sorti le {film.release_date}</Text>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 190,
        margin: 5,

    },
    view_content: {
        flex: 2,
        flexDirection: 'column',
        padding: 5,
        justifyContent: 'space-between',
    },
    view_header: {
        flex: 3,
        flexDirection: 'row',
    },
    view_description: {
        flex: 7,
    },
    view_date: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    description_text: {
        fontStyle: 'italic',
        color: 'grey',
    },
    vote_note: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    image: {
        margin: 5,
        flex: 1,
    },
})

export default FilmItem
