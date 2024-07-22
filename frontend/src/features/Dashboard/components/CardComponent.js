import React from 'react';

function CardComponent({ title, amount, growth }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{amount}</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">{growth}</p>
                </div>
                <h6 className="text-muted font-weight-normal">{title}</h6>
            </div>
        </div>
    );
}

export default CardComponent;
