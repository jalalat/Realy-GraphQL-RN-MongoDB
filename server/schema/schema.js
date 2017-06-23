/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import 'isomorphic-fetch';
import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	cursorForObjectInConnection,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
	toGlobalId,
} from 'graphql-relay';
import { GraphQLDateTime } from 'graphql-iso-date';

import Post from '../models/post';

const {nodeInterface, nodeField} = nodeDefinitions(
	(globalId) => {
		const {type, id} = fromGlobalId(globalId);
		// if (type === 'User') {
		// 	return getUser(id);
		// } else 
		if (type === 'Post') {
			return Post.findById(id);
		}
		return null;
	},
	(obj) => {
		// if (obj instanceof User) {
		// 	return GraphQLUser;
		// } else 
		if (obj instanceof Post) {
			return GraphQLPost;
		}
		return null;
	}
);

const GraphQLPost = new GraphQLObjectType({
	name: 'Post',
	fields: {
		id: globalIdField('Post'),
		title: { type: GraphQLString },
		details: { type: GraphQLString },
		likes: { type: GraphQLInt },
		dislikes: { type: GraphQLInt },
		createdAt: { type: GraphQLDateTime }
	},
	interfaces: [nodeInterface],
});

const { 
	connectionType: PostConnection, 
	edgeType: GraphQLPostEdge,
} = connectionDefinitions({ 
	name: 'Post',
	nodeType: GraphQLPost,
});

// const GraphQLUser = new GraphQLObjectType({
// 	name: 'User',
// 	fields: {
// 		id: globalIdField('User'),
// 		posts:{
// 			type: PostConnection,
// 			args: connectionArgs,
// 			resolve: (user, args) => connectionFromArray(getPosts(), args),
// 		},
// 	},
// 	interfaces: [nodeInterface],
// });

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		// viewer: {
		// 	type: GraphQLUser,
		// 	resolve: () => getViewer(),
		// },
		posts: {
			type: new GraphQLList(GraphQLPost),
			resolve: () => Post.find({}),
		},
		node: nodeField,
	},
});

const GraphQLCreatePostMutation = mutationWithClientMutationId({
	name: 'CreatePost',
	inputFields: {
		title: { type: new GraphQLNonNull(GraphQLString)},
		details: { type: GraphQLString },
	},
	outputFields: {
		post: {
			type: GraphQLPost,
			resolve: (post) => post,
		},
	},
	mutateAndGetPayload: ({ title, details }) => {
		const post = (new Post({ title, details, createdAt: new Date() })).save();
		return post;
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createPost: GraphQLCreatePostMutation,
	},
});

export const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});
