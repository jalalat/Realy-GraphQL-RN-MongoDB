// @flow
import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import PostItem from './PostItem';

class PostList extends Component {

	keyExtractor = (item, index) => item.id;
	renderItem = (post) => (
		<PostItem post={post} onCardSelect={() => this.props.onPostSelect(post)} />
	);

	render() {
		return (
			<View style={{ flex: 1,	paddingBottom: 20 }}>
				<View>
					<Text>Category 1</Text>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={this.props.postList}
						renderItem={({ item }) => this.renderItem(item)}
						keyExtractor={this.keyExtractor}
					/>
				</View>
			</View>
		);
	}
}

export default PostList;
