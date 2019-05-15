import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class ListContacts extends Component {
  
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    }

    state = {
        query: '',
    }

    updateQuery = (query) =>{
        this.setState({query: query.trim() })
    }
    clearQuery = () =>{
        this.setState({query: '' })
    }

    render() {
        const { contacts, onDeleteContact } = this.props
        const { query }= this.state

        let showingContacts
        if (query){
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter( c => match.test(c.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map(c => (
                        <li key={c.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${c.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{c.name}</p>
                                <p>{c.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(c)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
            
        )
    }
}