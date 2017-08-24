'use strict';

import React from 'react';
import { ListGroup, ListGroupItem, Badge} from 'react-bootstrap';

require('styles/card/CardList.css');

class CardListComponent extends React.Component {
  constructor() {
    super();
    this.orderURL = 'http://localhost:3000/api/orders';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orders: []};
    this.loadItems();
  }

  loadItems() {
    fetch(this.orderURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({orders: responseJson});
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="cardlist-component">
        <ListGroup>
          {
            this.state.orders.map(function(order) {
              let res = <ListGroupItem><a href={'../card-show/' + order.id}>SHOW</a> {order.description}<Badge>{order.createdDate}</Badge><Badge>Total: {order.total}</Badge></ListGroupItem>;
              if (order.delivered) {
                res = <ListGroupItem ><a href={'../card-show/' + order.id}>SHOW</a>{order.description} <Badge>Delivered</Badge> <Badge>{order.createdDate}</Badge><Badge>Total: {order.total}</Badge></ListGroupItem>;
              }
              return res;
            })
          }
        </ListGroup>
      </div>
    );
  }
}

CardListComponent.displayName = 'CardCardListComponent';

// Uncomment properties you need
// CardListComponent.propTypes = {};
// CardListComponent.defaultProps = {};

export default CardListComponent;
