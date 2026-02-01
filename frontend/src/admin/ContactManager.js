import React, { useState, useEffect } from 'react';
import { settingsAPI } from '../api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('new');
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await settingsAPI.getContacts({ status: filter });
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      alert('Please enter a response');
      return;
    }

    try {
      await settingsAPI.updateContact(id, {
        status: 'responded',
        response: replyText,
      });
      fetchContacts();
      setReplyingId(null);
      setReplyText('');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['new', 'read', 'responded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-white p-6 text-center text-gray-500 rounded-lg">
            No messages found.
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  contact.status === 'new' ? 'bg-red-100 text-red-800'
                  : contact.status === 'read' ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
                }`}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">{contact.subject}</p>
                <p className="text-gray-700">{contact.message}</p>
              </div>

              {contact.response && (
                <div className="bg-gray-50 p-4 rounded mb-4 border-l-4 border-green-600">
                  <p className="text-sm text-gray-600 mb-2">Your response:</p>
                  <p className="text-gray-800">{contact.response}</p>
                </div>
              )}

              {replyingId !== contact._id && (
                <button
                  onClick={() => setReplyingId(contact._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
                >
                  {contact.response ? 'Edit Response' : 'Send Response'}
                </button>
              )}

              {replyingId === contact._id && (
                <div className="space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReply(contact._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
                    >
                      Send Response
                    </button>
                    <button
                      onClick={() => {
                        setReplyingId(null);
                        setReplyText('');
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactManager;
