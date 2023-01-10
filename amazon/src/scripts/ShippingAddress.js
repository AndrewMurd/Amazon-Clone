import React, { useState } from 'react';
import '../styles/ShippingAddress.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function ShippingAddress() {
    const [address, setAddress] = useState('');
    const [selected, setSelected] = useState(false);
    const [{ popup, user }, dispatch] = useStateValue();

    // set address in database and datalayer
    const submitAddress = () => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .set({
                    address: address,
                }, { merge: true })
        }
        dispatch({
            type: 'SET_ADDRESS',
            address: address,
        })
        dispatch({
            type: 'OPEN_POPUP',
            popup: false,
        })
    }

    return (
        <div className={popup ? 'shippingAddress_popup' : 'shippingAddress_popup-hidden'}>
            <div className='shippingAddress_header'>
                <strong>Choose your location</strong>
            </div>
            <div className='shippingAddress_suggestions'>
                {/* PlacesAutocomplete component from https://github.com/hibiken/react-places-autocomplete#load-google-library */}
                <PlacesAutocomplete
                    value={address}
                    onChange={e => {
                        setAddress(e);
                        setSelected(false);
                    }}
                    onSelect={async (e) => {
                        setAddress(e);
                        setSelected(true);
                    }}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Enter Street Address...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    if (suggestion.types.includes('street_address')) {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                })}
                                            >
                                                <small className='shippingAddress_suggestion'>{suggestion.description}</small>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
            <button className={selected ? 'shippingAddress_submit' : 'shippingAddress_submit-hidden'} onClick={submitAddress}>Submit Address</button>
        </div>
    );
}

export default ShippingAddress