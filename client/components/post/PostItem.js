/* @flow */
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class PostItem extends Component {

	render() {
		const post = this.props.post;
		return (			
			<TouchableOpacity onPress={() => this.props.onCardSelect(post)}>
				<Card style={styles.cardContainer}>
					<View style={styles.cardTitleContainer} >
						<Text style={styles.cardTitleText} numberOfLines={5} > { post.title } </Text>
					</View>
					{/*<View style={styles.cardAuthorContainer}>
						<Text style={styles.cardAuthorText} numberOfLines={1} > { item.author.name } </Text>
					</View>*/}
					<View style={styles.buttonsContainer} numberOfLines={1}>
						<Text style={styles.buttonTextStyle} > {post.views} </Text>
						<MaterialIcons name="remove-red-eye" color="grey" size={20} />
						<Text style={styles.buttonTextStyle} > {post.likes - post.dislikes} </Text>
						<MaterialIcons name="favorite" color="grey" size={20} />
					</View>
				</Card>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	cardContainer: {
		width: 130,
		height: 130,
		borderWidth: 0.5,
		borderColor: '#f2f2f2',
		flexDirection: 'column',
		backgroundColor: '#e6eeff',
	},
	cardTitleContainer: {
		height: 85,
	},
	cardTitleText: {
		fontSize: 14,
		color: '#595959',
		paddingLeft: 4,
		paddingRight: 4,
	},
	cardAuthorContainer: {
	},
	cardAuthorText: {
		fontSize: 14,
		color: '#737373',
		paddingLeft: 4,
		paddingRight: 4,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonTextStyle: {
		color: '#737373',
	}
});

export default PostItem;
