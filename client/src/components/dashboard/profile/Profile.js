import React from 'react';
import { connect } from 'react-redux';

import Education from './Education';
import Experience from './Experience';

// Semantic UI
import {
  Segment,
  Grid,
  Icon,
  Header,
  List,
  Item,
  Divider,
  Label,
  Table,
  Loader

} from 'semantic-ui-react';

const Profile = props => {
  const { auth } = props;
  const { profile } = props.profile

  if (props.profile.loading) {
    return <Loader active />;
  }

  return (
    <Segment
      style={{
        minHeight: '600px',
        paddingLeft: '25px',
        paddingRight: '10px'
      }}
      stacked
    >
      <Grid>
        <Grid.Column width={16}>
          <Item style={{ margin: '20px 3px' }}>
            <Header
              textAlign="center"
              as="h1"
              style={{
                color: '#363855',
                fontFamily: 'Montserrat',
                letterSpacing: '7px'
              }}
            >
              {auth.user.name.toUpperCase()}
            </Header>
          </Item>

          <Grid>
            <Grid.Column floated="right" width={2}>
              <Header style={{ fontFamily: 'Montserrat' }} as="p">
                432
                </Header>
              Followers
              </Grid.Column>

            <Grid.Column width={2}>
              <Header style={{ fontFamily: 'Montserrat' }} as="p">
                432
                </Header>
              Following
              </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <Divider clearing />

      <Grid>
        <Grid.Column width={8}>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label
                    style={{
                      fontFamily: 'Montserrat',
                      fontSize: '15px',
                      letterSpacing: '3px'
                    }}
                    color="red"
                    ribbon
                  >
                    SKILLS
                    </Label>
                </Table.Cell>
              </Table.Row>

              {profile.skills && profile.skills.map(skill => {
                return (
                  <Table.Row key={skill}>
                    <Table.Cell verticalAlign="middle">
                      <Header style={{ fontFamily: 'Montserrat' }} as="h5">
                        {skill.toUpperCase()}
                      </Header>
                    </Table.Cell>
                    <Table.Cell
                      width={2}
                      verticalAlign="middle"
                      textAlign="center"
                    >
                      <Icon color="red" size="small" name="check" />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          Hello
          </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={8}>
          <Segment color="red">EDIT EXPERIENCES</Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment color="red">EDIT EDUCATIONS</Segment>
        </Grid.Column>
      </Grid>

      <Grid stackable textAlign="left">
        <Grid.Column width={8}>
          <Segment>
            <Label
              as="h3"
              style={{
                fontFamily: 'Montserrat',
                fontSize: '15px',
                letterSpacing: '3px'
              }}
              color="red"
              ribbon
            >
              EXPERIENCE
              </Label>
            <List relaxed>
              {profile.experiences && profile.experiences.map(experience => {
                return <Experience key={experience._id} experience={experience} />;
              })}
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Label
              as="h3"
              style={{
                fontFamily: 'Montserrat',
                fontSize: '15px',
                letterSpacing: '3px'
              }}
              color="red"
              ribbon
            >
              EDUCATION
              </Label>

            <List divided relaxed>
              {profile.education && profile.education.map(education => {
                return <Education key={education._id} education={education} />;
              })}
            </List>

          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
