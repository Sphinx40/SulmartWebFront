import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = ({ state }) => {
    const { loading } = state;

    return (
        <Fragment>
            {
                loading ?
                    <Dimmer active>
                        <Loader>Загрузка...</Loader>
                    </Dimmer> : null
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      state
    }
  }
  

export default connect(mapStateToProps, {})(Loading);