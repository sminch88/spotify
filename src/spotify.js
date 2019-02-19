import React, { Component } from 'react';
import './App.css';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Collapse, Button, Table, } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

const humanizeDuration = require('humanize-duration')
humanizeDuration(12000) // '12 seconds'


const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      m: () => '',
      s: () => '',
    }
  },
  round: true,
  conjunction:':'
})

shortEnglishHumanizer(15600000)


export default class Spotify extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <Query query={gql`
        {
            me {
              images {
                height
                width
                url
              }
              id
              birthday
              display_name
              email


              top_tracks {
                name
                track_number
                  duration_ms
                artists {
                  name
                }
                name
                album {
                  name
                }
              preview_url
              }



              top_artists {
                images {
                  height
                  width
                  url
                }
                name
              }
            }
          }
`}>

        {({ loading, error, data }) => {
          if (loading) {
            return (
              <p>caricamento...</p>)
          } else {
            return (
              <div>
                {!loading && <div>

                  <img className="image-utente" src={data.me.images[0]} />

                  <div className="dati-utente">

                    <div className="display_name">{data.me.display_name}</div>

                    <div className="id">{data.me.id}</div>

                    <div className="email">{data.me.email}</div>

                  </div>


                  <div className="tracks">
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Top Tracks</Button>
                    <Collapse isOpen={this.state.collapse}>
                          <div className="top_tracks">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>IDuration</th>
                                  <th>Name</th>
                                  <th>Artist</th>
                                  <th>Album</th>
                                  <th>Play</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_tracks.map((item, idx) =>
                                  <tr>
                                    <td scope="row"><div>{idx + 1}</div></td>

                                    <td> <div>{shortEnglishHumanizer(item.duration_ms)}</div></td>
                                    <td><div>{item.name}</div></td>
                                    <td><div>{item.artists[0].name}</div></td>
                                    <td><div>{item.album.name}</div></td>
                                    <td><div><a href={item.preview_url}><FontAwesomeIcon icon="play" /><i class="fas fa-play"></i></a></div></td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        
                    </Collapse>
                  </div>

                  <div className="artist">
                    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Top Artist</Button>
                    <Collapse isOpen={this.state.collapse}>
                          <div className="top_tracks">

                            <Table dark>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>IDuration</th>
                                  <th>Name</th>
                                  <th>Artist</th>
                                  <th>Album</th>
                                  <th>Play</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.me.top_tracks.map((item, idx) =>
                                  <tr>
                                    <td scope="row"><div>{idx + 1}</div></td>

                                    <td> <div>{shortEnglishHumanizer(item.duration_ms)}</div></td>
                                    <td><div>{item.name}</div></td>
                                    <td><div>{item.artists[0].name}</div></td>
                                    <td><div>{item.album.name}</div></td>
                                    <td><div><a href={item.preview_url}><FontAwesomeIcon icon="play" /><i class="fas fa-play"></i></a></div></td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        
                    </Collapse>
                  </div>
                </div>
                }
                
              </div>
              


            )
          }
        }}
        
      </Query>
    )
  }

}