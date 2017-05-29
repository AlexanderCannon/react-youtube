import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
//Ours
import Searchbar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
//Consts
const API_KEY = 'AIzaSyCelnhNq-vz5xOjyxTGdU0k5-H99dUc830';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('')
  };

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  };

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <Searchbar onSearchTermChange={term => this.videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos} />
      </div>
    );
  };
};
