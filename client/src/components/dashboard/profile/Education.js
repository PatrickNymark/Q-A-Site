import React from 'react';
import Moment from 'react-moment';
import { Header, List, Divider } from 'semantic-ui-react';

const date = Date.now();

const Education = props => {
  const { education } = props;
  return (
    <React.Fragment>
      <List.Item>
        <List.Content>
          <Header
            style={{ fontFamily: 'Montserrat', letterSpacing: '3px' }}
            as="h3"
          >
            {education.school.toUpperCase()}
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
            {education.degree}
          </Header>

          <List.Description style={{ marginTop: '10px' }}>
            {education.description}
          </List.Description>
          <List style={{ fontSize: '12px', fontWeight: 'bold' }}>
            <Divider />

            <List.Item style={{ margin: '10px auto' }}>
              <List.Content floated="right">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </List.Content>
              <List.Content>From:</List.Content>
            </List.Item>

            <List.Item>
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

export default Education;
