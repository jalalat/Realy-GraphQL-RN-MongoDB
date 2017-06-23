// @flow
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import PostList from '../components/post/PostList';

class PostListScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Post List',
	};

	onPostSelect = (post) => {
		
	}
	render() {
		const { posts} = this.props;
		if (!posts) {
			return <View />;
		} 
		return (
			<ScrollView style={styles.container}>
				<PostList onPostSelect={this.onPostSelect} postList={posts} />
				<PostList onPostSelect={this.onPostSelect} postList={posts} />
				<PostList onPostSelect={this.onPostSelect} postList={posts} />
				<PostList onPostSelect={this.onPostSelect} postList={posts} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	}
});

export default createFragmentContainer(PostListScreen, graphql`
	fragment PostListScreen_posts on Post @relay(plural: true) {
		id
		title
		details
	}
`);