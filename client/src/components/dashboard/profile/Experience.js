import React from 'react';
import { Header, List, Divider } from 'semantic-ui-react';
import Moment from 'react-moment';

const date = Date.now();

const Experience = props => {
  const { experience } = props;
  return (
    <React.Fragment>
      <List.Item style={{ marginTop: '20px' }}>
        <List.Content>
          <Header
            style={{ fontFamily: 'Montserrat', letterSpacing: '3px' }}
            as="h3"
          >
            {experience.company.toUpperCase()}
          </Header>
          <Divider />

          <Header
            style={{
              margin: '10px 0px',
              fontFamily: 'Montserrat',
              letterSpacing: '2.5px'
            }}
            as="h5"
          >
            {experience.title}
          </Header>
          <List.Description>{experience.description}</List.Description>
          <List style={{ fontSize: '12px' }}>
            <Divider />

            <List.Item style={{ margin: '10px auto', fontWeight: 'bold' }}>
              <List.Content floated="right">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </List.Content>
              <List.Content>From:</List.Content>
            </List.Item>

            <List.Item style={{ fontWeight: 'bold' }}>
              <List.Content floated="right">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </List.Content>
              <List.Content>To:</List.Content>
            </List.Item>
            <Divider />
          </List>
        </List.Content>
      </List.Item>
    </React.Fragment>
  );
};

export default Experience;
