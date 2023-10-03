// import React from 'react'
import PropTypes from 'prop-types';

const Child = ({ data, setClick }) => {
    return (
        <div className="childComponent" onClick={() => setClick(data)}>
            {data}
        </div>
    );
}

Child.propTypes = {
    data: PropTypes.string.isRequired,
    setClick: PropTypes.func.isRequired
}

export default Child